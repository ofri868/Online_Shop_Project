# Generated by Django 4.1.5 on 2023-01-27 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_profile_billing_city_profile_city_profile_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, default='/profile.jpg', null=True, upload_to=''),
        ),
    ]