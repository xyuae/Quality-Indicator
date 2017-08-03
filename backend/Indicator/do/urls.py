from django.conf.urls import url

from . import views

app_name = 'do'
urlpatterns = [
    # ex: /do/
    url(r'^$', views.index, name='index'),
    # ex: /do/top
    url(r'^top$', views.index, name='index'),
    # ex: /do/5
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /do/5/results
    url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /do/5/vote
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
    # ex: /do/get_data
    url(r'^get_data/$', views.get_data, name='get_data'),

    url(r'^post_data/$', views.post_data, name='post_data'),


]


