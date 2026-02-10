## IMPORTS ##
from django.urls import path
from .views import ArticleListeCreateView, ArticleDetailView

## ROUTES ARTICLES ##
urlpatterns = [
    ## LISTE + CREATION ##
    path("", ArticleListeCreateView.as_view(), name="articles_liste_create"),
    ## DETAIL + UPDATE + DELETE ##
    path("<int:pk>/", ArticleDetailView.as_view(), name="article_detail"),
]
