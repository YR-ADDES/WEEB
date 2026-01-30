## IMPORTS DJANGO ##
from django.urls import path

## IMPORTS VUES ##
from .views import test_api

## ROUTES API ##
urlpatterns = [
    ## ENDPOINT TEST ##
    path("test/", test_api),
]
