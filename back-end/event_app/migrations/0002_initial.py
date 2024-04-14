# Generated by Django 5.0.4 on 2024-04-14 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('event_app', '0001_initial'),
        ('profile_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='collaborators',
            field=models.ManyToManyField(related_name='user_events', to='profile_app.userprofile'),
        ),
        migrations.AddField(
            model_name='event',
            name='users_attending',
            field=models.ManyToManyField(related_name='event_attending', to='profile_app.userprofile'),
        ),
    ]
