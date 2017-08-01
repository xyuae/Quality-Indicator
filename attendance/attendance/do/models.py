from django.db import models
from django.utils import timezone
import datetime


# from mongoengine import *
# from ..settings import DBNAME

# connect(DBNAME)

# Create your models here.
# class Project(Document):
class Project(models.Model):
    proj_name = models.CharField(max_length=100, null=False, blank=False)
    pub_date = models.DateTimeField('date created')
    update_date = models.DateTimeField(
        'date last updated')  # first optional argument to designate a human-readable name

    def __str__(self):
        return self.proj_name

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class People(models.Model):
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=True)
    project = models.ForeignKey(Project, on_delete=models.DO_NOTHING,)


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)


