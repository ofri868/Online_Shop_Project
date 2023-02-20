# Generated by Django 4.1.5 on 2023-02-18 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_brand_scale_remove_product_category_product_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='billing_address',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='billing_city',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='billing_zip_code',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='city',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='zip_code',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]
