from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'Indicator-code/$', views.attendance_code),
]
