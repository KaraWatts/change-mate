# Generated by Django 5.0.4 on 2024-04-28 23:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('volunteer_roles_app', '0002_remove_volunteerrole_assigned_volunteer_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='volunteerrole',
            old_name='assigned_volunteer',
            new_name='assigned_volunteers',
        ),
    ]
