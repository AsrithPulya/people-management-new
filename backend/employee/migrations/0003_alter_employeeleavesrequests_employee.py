# Generated by Django 5.1.2 on 2024-10-28 18:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_employeeleavesrequests_employee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeeleavesrequests',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employee_leaves', to='employee.employee'),
        ),
    ]
