# Generated by Django 4.1.1 on 2022-09-30 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_remove_recommendation_user_recommendation_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Entries',
        ),
        migrations.RemoveField(
            model_name='item',
            name='bids',
        ),
        migrations.AlterField(
            model_name='profile',
            name='visits',
            field=models.ManyToManyField(blank=True, null=True, to='base.item'),
        ),
        migrations.AddField(
            model_name='item',
            name='categories',
            field=models.ManyToManyField(to='base.category'),
        ),
    ]
