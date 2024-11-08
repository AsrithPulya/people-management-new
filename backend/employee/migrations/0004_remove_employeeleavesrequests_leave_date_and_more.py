# Generated by Django 5.1.2 on 2024-10-29 05:06

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_alter_employeeleavesrequests_employee'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employeeleavesrequests',
            name='leave_date',
        ),
        migrations.AddField(
            model_name='employeeleavesrequests',
            name='end_date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='employeeleavesrequests',
            name='start_date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='employee',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='employee', to=settings.AUTH_USER_MODEL),
        ),
    ]
