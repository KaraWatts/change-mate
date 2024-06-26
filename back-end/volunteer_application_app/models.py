from django.db import models
from profile_app.models import UserProfile
from volunteer_roles_app.models import VolunteerRole

class VolunteerApplication(models.Model):
    volunteer_role = models.ForeignKey(VolunteerRole, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="volunteer_events") # user display name and id - automatically set during post request
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    preferred_contact_method = models.CharField(max_length=50, null=True, blank=True)
    availability = models.CharField(max_length=500)
    return_volunteer = models.BooleanField(default=False)
    volunteer_interest = models.TextField()
    volunteer_experience = models.TextField()
    application_status = models.CharField(max_length=50, default="Pending") # Pending, Approved, Denied, Retracted - automatically set during post request
    application_date = models.DateTimeField(auto_now_add=True) # date application was submitted - auto generated in post request
    decision_date = models.DateTimeField(null=True, blank=True) # date decision was made - auto generated in put request
    decision_made_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, blank=True) # user display name and id - automatically set during put request
    decision_text = models.TextField(null=True, blank=True) # text explaining decision
