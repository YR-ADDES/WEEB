## IMPORTS ##
from rest_framework.views       import APIView
from rest_framework.response    import Response
from rest_framework             import status
from .serializers               import InscriptionSerializer

## VUE INSCRIPTION ##
class InscriptionView(APIView):

    def post(self, request):
        serializer = InscriptionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Compte créé. En attente de validation admin."},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
