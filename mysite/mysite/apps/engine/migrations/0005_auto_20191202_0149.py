# Generated by Django 2.2.7 on 2019-12-02 01:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0004_framestatus'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='packbatch',
            name='batch',
        ),
        migrations.RemoveField(
            model_name='packbatch',
            name='pack',
        ),
        migrations.AddField(
            model_name='batch',
            name='pack',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='engine.Pack'),
        ),
        migrations.AddField(
            model_name='task',
            name='batch',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='engine.Batch'),
        ),
        migrations.DeleteModel(
            name='BatchTask',
        ),
        migrations.DeleteModel(
            name='PackBatch',
        ),
    ]
