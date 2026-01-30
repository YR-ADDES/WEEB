## IMPORTS DRF ##
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

## ENDPOINT DE TEST API ##
@api_view(["GET"])
def test_api(request):
    ## REPONSE SIMPLE POUR VERIFIER API ##
    return Response({"message": "API WEEB OPERATIONNELLE"}, status=status.HTTP_200_OK)
