# Generated by Django 4.1.5 on 2023-02-07 13:09

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0016_review'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Cart',
            new_name='Order',
        ),
        migrations.AddField(
            model_name='review',
            name='rating',
            field=models.IntegerField(null=True),
        ),
    ]
