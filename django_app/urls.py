from django.urls import re_path
from django_app import views

urlpatterns = [
    re_path(r"^images/$", views.images),
    # re_path(r"^images/(?P<pk>\d+)/$", views.index),  # todo detail of image model
    re_path(r"^images/upload/$", views.images_upload),  # todo upload of new image model
    re_path(r"^data/$", views.data),
    re_path(r"^notifications/$", views.notifications),
]
