## IMPORTS DJANGO ##
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

## IMPORTS ROUTER ##
from rest_framework.routers import DefaultRouter
from articles.views import ArticleViewSet
from contacts.views import ContactViewSet

## IMPORTS JWT ##
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

## ROUTER API ##
router = DefaultRouter()
router.register("articles", ArticleViewSet, basename="articles")
router.register("contacts", ContactViewSet, basename="contacts")

## ENDPOINT RACINE ##
def racine(request):
    ## REPONSE JSON ##
    return JsonResponse({"ok": True, "service": "weeb_backend", "status": "up"})

## ENDPOINT HEALTH ##
def health_check(request):
    ## REPONSE JSON ##
    return JsonResponse({"ok": True, "service": "weeb_backend", "status": "up"})

## URLS PRINCIPALES ##
urlpatterns = [
    ## RACINE ##
    path("", racine),

    ## HEALTH ##
    path("health/", health_check),

    ## ADMIN ##
    path("admin/", admin.site.urls),

    ## AUTH JWT ##
    path("api/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    ## API ROUTER ##
    path("api/", include(router.urls)),

    ## API UTILISATEURS ##
    path("api/utilisateurs/", include("utilisateurs.urls")),
]
