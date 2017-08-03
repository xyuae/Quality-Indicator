from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'Indicator-code/$', views.index, name='index'),
    url(r'students/$', views.students),
]
