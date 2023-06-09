# Generated by Django 4.1.7 on 2023-03-13 14:02

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, db_index=True, default='', help_text='<small class="text-muted">Заголовок [5, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(5), django.core.validators.MaxLengthValidator(300)], verbose_name='Заголовок')),
                ('description', models.TextField(blank=True, default='', help_text='<small class="text-muted">Описание [0, 1000]</small><hr><br>', max_length=1000, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(1000)], verbose_name='Описание')),
                ('is_view', models.BooleanField(blank=True, default=False, help_text='<small class="text-muted">Статус видимости</small><hr><br>', verbose_name='Статус видимости')),
                ('avatar', models.FileField(blank=True, default=None, help_text='<small class="text-muted">Аватарка</small><hr><br>', max_length=200, null=True, upload_to='django_app/images/', validators=[django.core.validators.FileExtensionValidator(['jpg', 'jpeg', 'bmp', 'png'])], verbose_name='Аватарка')),
                ('created', models.DateTimeField(blank=True, db_index=True, default=django.utils.timezone.now, help_text='<small class="text-muted">DateTimeField</small><hr><br>', null=True, verbose_name='Дата и время создания')),
                ('author', models.ForeignKey(blank=True, default=None, help_text='<small class="text-muted">Автор</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='image_model', to=settings.AUTH_USER_MODEL, verbose_name='Автор')),
            ],
            options={
                'verbose_name': 'Изображение',
                'verbose_name_plural': 'Изображения',
                'ordering': ('-created', 'title'),
            },
        ),
    ]
