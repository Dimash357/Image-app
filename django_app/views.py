import random
import time

from django.contrib.auth.models import User
import requests
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_app import models as django_models, serializers as django_serializers


def index(request: HttpRequest) -> HttpResponse:
    return render(request, "index.html", context={})


@api_view(http_method_names=["GET"])
def images(request: WSGIRequest) -> Response:
    time.sleep(1.5)

    images_objs = django_models.ImageModel.objects.filter(is_view=True)
    images_json = django_serializers.ImageModelSerializer(instance=images_objs, many=True).data
    return Response(data={"response": images_json}, status=status.HTTP_200_OK)


from django.views.decorators.csrf import csrf_exempt


def routes(request):
    return Response(data={
        "api/images": {"methods": "sfaf"}
    })

@csrf_exempt
@permission_classes([AllowAny])
@api_view(http_method_names=["POST"])
def images_upload(request: WSGIRequest) -> Response:
    print("images_upload")

    try:
        time.sleep(1.5)

        user = None
        if not request.user.is_anonymous:
            user = request.user

        django_models.ImageModel.objects.create(
            author=user,
            title=request.POST.get("title", None),
            description=request.POST.get("description", ""),
            avatar=request.FILES.get("avatar", None),
            is_view=True,  # False
        )

        return Response(data={"response": "Запись успешно добавлена!"}, status=status.HTTP_201_CREATED)
    except Exception as error:
        print("error: ", error)
        return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# def images(request: HttpRequest) -> JsonResponse:
#     data = {"name": "Python"}
#     return JsonResponse(data=data, status=200, safe=False)

@api_view(http_method_names=["GET"])
def data(request):
    time.sleep(1.5)
    datas = [{"name": f"Python {i}"} for i in range(1, 100)]
    return Response(data={"response": datas}, status=status.HTTP_200_OK)


@api_view(http_method_names=["GET"])
def notifications(request):
    # time.sleep(random.randint(1, 3))
    # time.sleep(random.randint(1, 3))
    users_obj = User.objects.all()
    # pk = int(request.GET["pk"])
    # isOdd = True if request.GET["isOdd"] == "true" else False
    # print(isOdd, type(isOdd))
    # url = f"https://jsonplaceholder.typicode.com/posts/"
    # response = requests.get(url=url).json()
    #
    # if isOdd:
    #     odd_data = filter(lambda i: i["id"] % 2 == 0, response)
    # else:
    #     odd_data = filter(lambda i: i["id"] % 2 != 0, response)

    # users_json = django_serializers.UserSerializer(instance=users_obj, many=True).data
    return Response(data={"response": {"count": users_obj.count()}}, status=status.HTTP_200_OK)
