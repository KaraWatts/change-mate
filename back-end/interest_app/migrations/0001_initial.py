# Generated by Django 5.0.4 on 2024-04-11 03:39

import interest_app.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=150, validators=[interest_app.validators.validate_title_case])),
            ],
        ),
    ]
