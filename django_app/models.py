from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator, FileExtensionValidator
from django.db import models
from django.utils import timezone


# Create your models here.

class ImageModel(models.Model):
    """
    Эта модель хранит основную сущность платформы
    """

    author = models.ForeignKey(
        unique=False,  # OneToOneField == (profile)
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Автор',
        help_text='<small class="text-muted">Автор</small><hr><br>',

        to=User,
        on_delete=models.SET_NULL,  # CASCADE - удалять, SET_NULL - занулять
        # related_name="image_model"
    )
    title = models.CharField(
        db_index=True,  # в базе создаётся дополнительная скрытая таблица с кэшированным значением
        validators=[MinLengthValidator(5), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default='',
        verbose_name='Заголовок',
        help_text='<small class="text-muted">Заголовок [5, 300]</small><hr><br>',

        max_length=300,
    )
    description = models.TextField(
        validators=[MinLengthValidator(0), MaxLengthValidator(1000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name='Описание',
        help_text='<small class="text-muted">Описание [0, 1000]</small><hr><br>',

        max_length=1000,
    )
    avatar = models.FileField(
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'bmp', 'png'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Аватарка',
        help_text='<small class="text-muted">Аватарка</small><hr><br>',

        upload_to='django_app/images/',
        max_length=200,
    )
    is_view = models.BooleanField(
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=False,
        verbose_name='Статус видимости',
        help_text='<small class="text-muted">Статус видимости</small><hr><br>',
    )
    created = models.DateTimeField(
        db_index=True,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время создания',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,  # todo ! editable=False !
        auto_now_add=False,  # todo  ! editable=False !
    )

    class Meta:
        app_label = 'django_app'
        ordering = ('-created', 'title')
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return f"{self.title}[{self.id}] | {'Видимый' if self.is_view else 'Не видимый'} | {self.author.username} | " \
               f"{self.created}"
