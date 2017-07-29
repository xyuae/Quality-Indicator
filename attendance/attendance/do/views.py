from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(reqeust):
    return HttpResponse("Hello, world. You're at the do index.")
