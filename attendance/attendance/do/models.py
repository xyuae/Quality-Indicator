from django.db import models
from django.utils import timezone
import datetime


# Create your models here.
class Project(models.Model):
    proj_name = models.CharField(max_length=100, null=False, blank=False)
    pub_date = models.DateTimeField('date created')
    update_date = models.DateTimeField('date last updated')  # first optional argument to designate a human-readable name
    def __str__(self):
        return self.proj_name
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

