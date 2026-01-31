## IMPORTS ##
from django.urls    import path
from .views         import InscriptionView

## ROUTES UTILISATEURS ##
urlpatterns = [
    path('signup/', InscriptionView.as_view(), name='signup'),
]
