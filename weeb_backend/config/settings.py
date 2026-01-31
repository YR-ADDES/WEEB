## IMPORTS NATIFS ##
from pathlib import Path
import os
from dotenv import load_dotenv

## IMPORT SIMPLE JWT ##
from datetime import timedelta

## CHARGEMENT VARIABLES ENV ##
load_dotenv()

## CHEMIN DE BASE ##
BASE_DIR = Path(__file__).resolve().parent.parent

## CLE SECRETE ##
SECRET_KEY = 'django-insecure-weeb-backend'

## MODE DEBUG ##
DEBUG = True

## HOTES AUTORISES ##
ALLOWED_HOSTS = []

## APPLICATIONS INSTALLEES ##
INSTALLED_APPS = [
    ## DJANGO ##
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

     ## TIERS ##
    'rest_framework',
    'rest_framework_simplejwt',

    ## APPLICATIONS LOCALES ##
    'api',

    ## APPS PROJET ##
    'utilisateurs',
    'articles',
    'contacts',
]

## MIDDLEWARE ##
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

## ROUTES PRINCIPALES ##
ROOT_URLCONF = 'config.urls'

## TEMPLATES ##
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

## WSGI ##
WSGI_APPLICATION = 'config.wsgi.application'

## BASE DE DONNEES POSTGRESQL ##
DATABASES = {
    'default': {
        'ENGINE':       'django.db.backends.postgresql',
        'NAME':         os.getenv('DB_NAME'),
        'USER':         os.getenv('DB_USER'),
        'PASSWORD':     os.getenv('DB_PASSWORD'),
        'HOST':         os.getenv('DB_HOST'),
        'PORT':         os.getenv('DB_PORT'),
    }
}

## VALIDATION MOT DE PASSE ##
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]

## MODELE UTILISATEUR PERSONNALISE ##
AUTH_USER_MODEL = 'utilisateurs.Utilisateur'

## LANGUE & TIMEZONE ##
LANGUAGE_CODE   = 'fr-fr'
TIME_ZONE       = 'Europe/Paris'
USE_I18N        = True
USE_TZ          = True

## FICHIERS STATIQUES ##
STATIC_URL      = 'static/'

## CLE PRIMAIRE PAR DEFAUT ##
DEFAULT_AUTO_FIELD  = 'django.db.models.BigAutoField'

## CONFIGURATION REST FRAMEWORK ##
REST_FRAMEWORK = {
    ## AUTHENTIFICATION JWT ##
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    ## PERMISSION PAR DEFAUT (PUBLIC) ##
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
}

## CONFIGURATION JWT ##
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
