from django.contrib import admin

# Register your models here.
from .models import Project, People

admin.site.register(Project)
admin.site.register(People)
