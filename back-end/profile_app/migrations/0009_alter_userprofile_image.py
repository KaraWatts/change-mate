# Generated by Django 5.0.4 on 2024-04-23 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_app', '0008_alter_userprofile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.TextField(max_length=10000000, null=True),
        ),
    ]
