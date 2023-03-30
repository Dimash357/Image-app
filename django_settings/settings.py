"""

# починить отправку данных (Post / )
# настроить django на сервере под 80 порт nginx + gunicorn - PRODUCTION READY
# купить доменное имя .site и подключить сертификат к серверу
# автодокументация -

#
# Перенести admin на навбар
# 0) Писать по pep8(типизация...)
# 1) Спрятать настройки ключи, пароли и тд. в файл .env
# 3) Добавить авторизацию(добавить models tasks)
# 4) Написать свой context processor(Вывод footer и navbar и количество зарегистрированных пользователей
# 6) написать собственный фильтр
# 7) Написать свой simple tag
21) Система рейтинга и комментариев(лайк/дизлайк или баллы)
15) Создать внешнию карточку(include_card.html)
17) Проверить пароль на регулярку(сложность), подтвердите пароль
20) Защита доступа к защищенным старницам другим пользователям

5) Написать собственный middleware
8) Написать свой чат(web sockets)
9) Написать views через класс BaseView(HttpResponse, Json, Html)
10) Написать todo через clear sql
11) Написать cache для данных
12) Добавить docker
13) Celery - задачи в фоне
14) Переписать pagination через class(Создать файл utils.py)
16) Подключить tailwind
18) Добавить скрыть\показать пароль(native js)
19) Обработчик ошибок
21) Логирование
22) Профиль пользователя(аватарка, bio, расширенная модель)
23) Система жалоб и претензий(уведомления(web-sockets/native))
25) TemplateDoesNotExist - во время пересборки
"""
import os
from pathlib import Path
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    SECRET_KEY=(str, None),
    ALLOWED_HOSTS=(str, ""),
    DEBUG=(bool, False),
    CORS_ALLOW_ALL_ORIGINS=(bool, False),
    CORS_URLS_REGEX=(str, ""),
    SQL_ENGINE=(str, "django.db.backends.sqlite3"),
    SQL_DATABASE=(str, "db.sqlite3"),
    SQL_USER=(str, "django_user"),
    SQL_PASSWORD=(str, "12345"),
    SQL_HOST=(str, "127.0.0.1"),
    SQL_PORT=(str, "5432"),
    REDIS_LOCATION=(str, "rediss://12345@127.0.0.1:3697/0"),
)

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = [env('ALLOWED_HOSTS')]

CORS_ORIGIN_ALLOW_ALL = True

# Application definition

INSTALLED_APPS = [
    'grappelli',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'django_app',
    'corsheaders',
]

MIDDLEWARE = [
    'django_app.middleware.CustomCorsMiddleware',
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'django_settings.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'frontend/build'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_settings.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DATA_UPLOAD_MAX_NUMBER_FIELDS = 100000


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

# LANGUAGE_CODE = 'en-US'
LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Etc/GMT-6'
# TIME_ZONE = 'Asia/Almaty'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
# STATIC_ROOT = Path(BASE_DIR, 'static')
STATICFILES_DIRS = [
    Path(BASE_DIR, 'static'),
    Path(BASE_DIR, 'frontend/build/static'),
]

MEDIA_URL = 'media/'
MEDIA_ROOT = Path(BASE_DIR, 'static/media')

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# jwt
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=2),
#     'ROTATE_REFRESH_TOKENS': True,
#     'BLACKLIST_AFTER_ROTATION': True,
#     'UPDATE_LAST_LOGIN': True,
#
#     'ALGORITHM': 'HS256',
#     'SIGNING_KEY': SECRET_KEY,
#     'VERIFYING_KEY': None,
#     'AUDIENCE': None,
#     'ISSUER': None,
#     'JWK_URL': None,
#     'LEEWAY': 0,
#
#     'AUTH_HEADER_TYPES': ('Bearer',),
#     'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
#     'USER_ID_FIELD': 'id',
#     'USER_ID_CLAIM': 'user_id',
#     'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
#
#     'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
#     'TOKEN_TYPE_CLAIM': 'token_type',
#     'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
#
#     'JTI_CLAIM': 'jti',
#
#     'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
#     'SLIDING_TOKEN_LIFETIME': timedelta(days=1),
#     'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=2),
# }
# jwt

