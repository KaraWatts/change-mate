# Generated by Django 5.0.4 on 2024-05-01 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post_app', '0005_alter_like_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Like',
        ),
    ]