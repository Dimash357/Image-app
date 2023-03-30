from django.contrib import admin
from django_app import models as django_models


admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Администрирование'  # default: "Django site admin"


class ImageModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ImageModel' на панели администратора
    """

    list_display = (
        'author',
        'title',
        'description',
        'is_view',
        'avatar',
        'created',
    )
    list_display_links = (
        'author',
        'title',
    )
    list_editable = (
        'description',
        'is_view',
    )
    list_filter = (
        'author',
        'title',
        'description',
        'is_view',
        'avatar',
        'created',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'author',
            'title',
            'description',
        )}),
        ('Сущность', {'fields': (
            'avatar',
        )}),
        ('Дополнительное', {'fields': (
            'is_view',
            'created',
        )}),
    )
    search_fields = [
        'author',
        'title',
        'description',
        'is_view',
        'avatar',
        'created',
    ]


admin.site.register(django_models.ImageModel, ImageModelAdmin)
