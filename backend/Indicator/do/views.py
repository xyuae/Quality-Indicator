from django.shortcuts import render, get_object_or_404
from django.http import Http404, JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from .models import Project

def index(request):
    lastest_project_list = Project.objects.order_by('-pub_date')[:5]
    # not used here: output = ','.join([p.proj_name for p in lastest_project_list])
    template = loader.get_template('do/index.html')
    context = { 'latest_project_list': lastest_project_list}
    return render(request, 'do/index.html', context)
    # not used here: return HttpResponse(template.render(context, request))


def get_post_args(request, *args):
    try:
        args_info = json.loads(request.body)
    except Exception as e:
        args_info = {}

    return [request.POST.get(item, None) or args_info.get(item, None) for item in args]


@require_http_methods(["POST"])
def post_data(request):
    data1, data2 = get_post_args(request, 'data1', 'data2')
    response = {
        'status': 'success',
        'data1': data1,
        'data2':data2,
    }
    return JsonResponse(response, safe=False)


def detail(request, question_id):
    question = get_object_or_404(Project, pk=question_id)
    return render(request, 'do/detail.html', {'question':question})


def results(request, question_id):
    response = "You are looking at the results of quetion %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voitng on quesiton %s." % question_id)


@require_http_methods(["GET"])
def get_data(request):
    data = {
        'data1': 123,
        'data2': 'abc',
    }
    return JsonResponse(data, safe=False)


