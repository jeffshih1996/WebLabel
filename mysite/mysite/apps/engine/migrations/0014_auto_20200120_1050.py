# Generated by Django 3.0.2 on 2020-01-20 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0013_label_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='attributespec',
            name='order',
            field=models.PositiveIntegerField(default=99),
        ),
        migrations.AlterField(
            model_name='label',
            name='order',
            field=models.PositiveIntegerField(default=99),
        ),
        migrations.AlterUniqueTogether(
            name='label',
            unique_together={('project', 'name')},
        ),
    ]
