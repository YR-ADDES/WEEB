## IMPORTS NATIFS ##
from pathlib import Path
import os
from django.contrib.auth import get_user_model

## IMPORT DOTENV (LOCAL) ##
from dotenv import load_dotenv

## IMPORT SIMPLE JWT ##
from datetime import timedelta

## IMPORT DATABASE URL (RENDER) ##
import dj_database_url

## IMPORT HEADERS CORS ##
from corsheaders.defaults import default_headers


## CHARGEMENT VARIABLES ENV (LOCAL UNIQUEMENT) ##
load_dotenv()


## CHEMIN DE BASE ##
BASE_DIR = Path(__file__).resolve().parent.parent


## CLE SECRETE (RENDER/LOCAL) ##
SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-weeb-backend")


## MODE DEBUG (RENDER = 0) ##
DEBUG = os.environ.get("DEBUG", "1") == "1"


## HOTES AUTORISES (RENDER/LOCAL) ##
ALLOWED_HOSTS = os.environ.get(
    "ALLOWED_HOSTS",
    "localhost,127.0.0.1"
).split(",")


## APPLICATIONS INSTALLEES ##
INSTALLED_APPS = [
    ## DJANGO ##
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    ## TIERS ##
    "rest_framework",
    "rest_framework_simplejwt",

    ## CORS ##
    "corsheaders",

    ## APPLICATIONS LOCALES ##
    "api",

    ## APPS PROJET ##
    "utilisateurs",
    "articles",
    "contacts",
]


## MIDDLEWARE ##
MIDDLEWARE = [
    ## SECURITE ##
    "django.middleware.security.SecurityMiddleware",

    ## WHITENOISE (STATIC EN PROD) ##
    "whitenoise.middleware.WhiteNoiseMiddleware",

    ## CORS (DOIT ETRE AVANT CommonMiddleware) ##
    "corsheaders.middleware.CorsMiddleware",

    ## DJANGO ##
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


## CORS AUTORISÉS (LOCAL + NETLIFY) ##
CORS_ALLOWED_ORIGINS = os.environ.get(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:5173"
).split(",")

## CORS CREDENTIALS ##
CORS_ALLOW_CREDENTIALS = True

## CSRF TRUSTED ORIGINS (NETLIFY) ##
CSRF_TRUSTED_ORIGINS = os.environ.get(
    "CSRF_TRUSTED_ORIGINS",
    "http://localhost:5173"
).split(",")


## ROUTES PRINCIPALES ##
ROOT_URLCONF = "config.urls"


## TEMPLATES ##
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


## WSGI ##
WSGI_APPLICATION = "config.wsgi.application"


## BASE DE DONNEES POSTGRESQL (RENDER VIA DATABASE_URL / LOCAL VIA .env) ##
DATABASE_URL = os.environ.get("DATABASE_URL")

## SI DATABASE_URL EXISTE => PROD ##
if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True
        )
    }

## SINON => LOCAL POSTGRES ##
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME":     os.environ.get("DB_NAME",       "WEEB_DB"),
            "USER":     os.environ.get("DB_USER",       "postgres"),
            "PASSWORD": os.environ.get("DB_PASSWORD",   ""),
            "HOST":     os.environ.get("DB_HOST",       "127.0.0.1"),
            "PORT":     os.environ.get("DB_PORT",       "5432"),
        }
    }


## VALIDATION MOT DE PASSE ##
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
]


## MODELE UTILISATEUR PERSONNALISE ##
AUTH_USER_MODEL = "utilisateurs.Utilisateur"


## LANGUE & TIMEZONE ##
LANGUAGE_CODE = "fr-fr"
TIME_ZONE = "Europe/Paris"
USE_I18N = True
USE_TZ = True

## FICHIERS STATIQUES ##
STATIC_URL = "static/"

## STATIC ROOT (COLLECTSTATIC) ##
STATIC_ROOT = BASE_DIR / "staticfiles"

## WHITENOISE STORAGE ##
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


## CLE PRIMAIRE PAR DEFAUT ##
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


## CONFIGURATION REST FRAMEWORK ## 
REST_FRAMEWORK = {
    ## AUTHENTIFICATION JWT ##
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    ## PERMISSION PAR DEFAUT ##
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
}


## CONFIGURATION JWT ##
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}


## HEADERS CORS AUTORISÉS ##
CORS_ALLOW_HEADERS = list(default_headers)

## METHODES CORS AUTORISÉES ##
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

if os.environ.get("DJANGO_SUPERUSER_EMAIL"):
    User = get_user_model()
    if not User.objects.filter(email=os.environ["DJANGO_SUPERUSER_EMAIL"]).exists():
        User.objects.create_superuser(
            username=os.environ["DJANGO_SUPERUSER_USERNAME"],
            email=os.environ["DJANGO_SUPERUSER_EMAIL"],
            password=os.environ["DJANGO_SUPERUSER_PASSWORD"],
        )