from requests_oauthlib import OAuth1
from rest_framework.decorators import api_view
from user_app.views import TokenReq 
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import TodoList, TodoListSerializer, GetTodoListSerializer
from event_app.models import Event, UserProfile
from drf_yasg.utils import swagger_auto_schema



# Create your views here.
class TodoListView(TokenReq):
    
    @swagger_auto_schema(
        operation_summary="Get all tasks for Event",
        operation_description="Get all tasks created for an Event.",
        responses={200: GetTodoListSerializer}
        )
    def get(self, request, event_id):
        user = UserProfile.objects.get(user=request.user)
        todo_list = TodoList.objects.filter(event=event_id)
        serializer = GetTodoListSerializer(todo_list, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    @swagger_auto_schema(
        operation_summary="Create a new task",
        operation_description="Create a new task. The assigned_host field is set to the user's Profile object. The task field is set to the task field in the request data. The completed field is set to False. The TodoListSerializer is used to serialize the data. If the serializer is valid, the data is saved and returned with a status of 201. If the serializer is not valid, the errors are returned with a status of 400.",
        request_body=TodoListSerializer,
        responses={201: TodoListSerializer}
    ) 
    def post(self, request, event_id):
        user_id = request.user.id
        user = UserProfile.objects.get(user=user_id)
        event = get_object_or_404(Event, pk=event_id)
        if user not in event.hosts.all():
            return Response("You are not a host of this event", status=HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['event'] = event_id
        data['assigned_host'] = user_id
        data['task'] = data.get('task')
        data['completed'] = False
        print(data)
        serializer = TodoListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(
            operation_summary="Delete all tasks on Event",
            operation_description="Delete all tasks created in an Event. Only the host of the event can delte all tasks.",
            responses={204: "All tasks have been deleted"}
        )
    def delete(self, request, event_id ):
        user = UserProfile.objects.get(user=request.user)
        event = get_object_or_404(Event, pk=event_id , hosts=user)
        todo_list = TodoList.objects.filter(event=event)
        todo_list.delete()
        return Response(f"All tasks have been deleted from {event.title}", status=HTTP_204_NO_CONTENT)
    







class UserTodoListView(TokenReq):
    
    @swagger_auto_schema(
        operation_summary="Get all tasks assigned to Host",
        operation_description="Get all tasks assigned to Host by get the user's Profile object and filter the TodoList objects by the assigned_host field.",
        responses={200: TodoListSerializer}
        )
    def get(self, request, event_id):
        user = UserProfile.objects.get(user=request.user)
        todo_list = TodoList.objects.filter(assigned_host=user)
        serializer = TodoListSerializer(todo_list, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    
    


class ATodoListTask(TokenReq):
    
    @swagger_auto_schema(
        operation_summary="Get a task assigned to Host",
        operation_description="Get a task assigned to Host. The user's Profile object is used to filter the TodoList objects by the assigned_host field. The task is returned.",
        responses={200: TodoListSerializer}
    )
    
    def get(self, request, task_id):
        user = UserProfile.objects.get(user=request.user)
        # event = get_object_or_404(Event, pk=event_id , hosts=user)
        task = get_object_or_404(TodoList, pk=task_id)
        serializer = TodoListSerializer(task)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    @swagger_auto_schema(
        operation_summary="Update a task assigned to Host",
        operation_description="Update a task assigned to Host. The user's Profile object is used to filter the TodoList objects by the assigned_host field. The task is updated with the request data. The TodoListSerializer is used to serialize the data. If the serializer is valid, the data is saved and returned with a status of 200. If the serializer is not valid, the errors are returned with a status of 400.",
        request_body=TodoListSerializer,
        responses={200: TodoListSerializer}
    )
    
    def put(self, request, task_id):
        task = get_object_or_404(TodoList, pk=task_id)
        data = request.data.copy()
        if 'assigned_host' in data:
            new_host_id = data['assigned_host']
            if task.assigned_host.id != new_host_id:
                new_assigned_host = get_object_or_404(UserProfile, id=new_host_id)
                task.assigned_host = new_assigned_host
                data.pop('assigned_host')
        serializer = TodoListSerializer(task, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
               
        
    @swagger_auto_schema(
        operation_summary="Delete a task assigned to Host",
        operation_description="Delete a task assigned to Host. The user's Profile object is used to filter the TodoList objects by the assigned_host field. The task is deleted.",
        responses={204: "Task has been deleted"}
    )
        
    def delete(self, request, task_id):
        user = UserProfile.objects.get(user=request.user)
        task = get_object_or_404(TodoList, id = task_id)
        task.delete()
        return Response("Task has been deleted", status=HTTP_204_NO_CONTENT)
        
        
@swagger_auto_schema(
    method = 'POST',
    operation_summary="Mark a task as completed",
    operation_description="Mark a task as completed. The user's Profile object is used to filter the TodoList objects by the assigned_host field. The task is marked as completed.",
    responses={200: "Task has been marked completed"}
)

@api_view(['POST'])
def task_complete(request, event_id, task_id):
    user = UserProfile.objects.get(user=request.user)
    event = get_object_or_404(Event, pk=event_id , hosts=user)
    task = get_object_or_404(TodoList, pk=task_id)
    if task.assigned_host == user:
        task.completed = True
        task.save()
    else:
        return Response("You are not the assigned host of this task", status=HTTP_400_BAD_REQUEST)
    
    return Response("Task has been marked completed", status=HTTP_200_OK)
        