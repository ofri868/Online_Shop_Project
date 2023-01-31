# Generated by Django 4.1.5 on 2023-01-25 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_alter_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='address',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='billing_address',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='billing_zip_code',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='first_name',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='last_name',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='zip_code',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='desc',
            field=models.CharField(blank=True, default='food', max_length=40),
            preserve_default=False,
        ),
    ]
