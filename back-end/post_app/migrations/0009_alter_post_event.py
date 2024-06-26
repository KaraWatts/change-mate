# Generated by Django 5.0.4 on 2024-05-02 16:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_app', '0012_event_to_do_list'),
        ('post_app', '0008_alter_post_context'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='event_app.event'),
        ),
    ]
