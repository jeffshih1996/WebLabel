# Generated by Django 2.2.7 on 2019-11-20 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0002_auto_20191119_0832'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='name',
            field=models.CharField(max_length=256, unique=True),
        ),
    ]
