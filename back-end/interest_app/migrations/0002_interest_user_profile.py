# Generated by Django 5.0.4 on 2024-04-11 03:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interest_app', '0001_initial'),
        ('profile_app', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='interest',
            name='user_profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_interests', to='profile_app.userprofile'),
        ),
    ]
