## IMPORTS DJANGO ##
from django.contrib         import admin
from django.urls            import path, include
from rest_framework.routers import DefaultRouter
from articles.views         import ArticleViewSet
from contacts.views         import ContactViewSet

## ROUTER API ##
router = DefaultRouter()
router.register('articles', ArticleViewSet)
router.register('contacts', ContactViewSet)

## URLS PRINCIPALES ##
urlpatterns = [
    path('admin/',  admin.site.urls),
    path('api/',    include(router.urls)),
]
