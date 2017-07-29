from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'do/$', views.index, name='index'),
]
