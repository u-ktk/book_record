# Generated by Django 4.1.7 on 2023-05-24 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookrecord', '0004_alter_folder_books'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='folder',
            name='books',
        ),
        migrations.RemoveField(
            model_name='book',
            name='folder',
        ),
        migrations.AddField(
            model_name='book',
            name='folder',
            field=models.ManyToManyField(related_name='books', to='bookrecord.folder', verbose_name='フォルダ'),
        ),
    ]