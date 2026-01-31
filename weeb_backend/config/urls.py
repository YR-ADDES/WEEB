## IMPORTS DJANGO ##
from django.contrib     import admin
from django.urls        import path, include

## IMPORTS ROUTER ##
from rest_framework.routers import DefaultRouter
from articles.views         import ArticleViewSet
from contacts.views         import ContactViewSet

## IMPORTS JWT ##
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

## ROUTER API ##
router = DefaultRouter()
router.register('articles', ArticleViewSet)
router.register('contacts', ContactViewSet)

## URLS PRINCIPALES ##
urlpatterns = [
    ## ADMIN ##
    path('admin/', admin.site.urls),

    ## AUTH JWT ##
    path('api/login/',          TokenObtainPairView.as_view(),  name='login'),
    path('api/token/refresh/',  TokenRefreshView.as_view(),     name='token_refresh'),

    ## SIGNUP ##
    path('api/utilisateurs/', include('utilisateurs.urls')),

    ## API ROUTER ##
    path('api/', include(router.urls)),
]
