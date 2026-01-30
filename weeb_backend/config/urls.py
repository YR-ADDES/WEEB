## IMPORTS DJANGO ##
from django.contrib import admin
from django.urls    import path, include

## ROUTES PRINCIPALES ##
urlpatterns = [
    ## ADMIN ##
    path("admin/", admin.site.urls),

    ## API ##
    path("api/", include("api.urls")),
]
