# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-11 21:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prof', '0004_auto_20170311_1924'),
    ]

    operations = [
        migrations.AddField(
            model_name='Indicator',
            name='city',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
