from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
import uuid
from django.contrib.auth import get_user_model


class BaseModel(models.Model):

    """
     This model defines base models that implements common fields like:
     pkid
     id
     name
     description
    """
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField() 

    class Meta:
        abstract = True
        
class Project(BaseModel):
    
    duration = models.DurationField() 
    avatar = models.ImageField(upload_to = 'images/')

    class Meta:
        ordering = ['-pkid']

    def __str__(self):
        return self.name 

    def get_tasks(self):
        return self.tasks

class Task(BaseModel):
    start_date = models.DateField()
    end_date = models.DateField()
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='tasks',
        to_field='id',

    ) 
    # assignee = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tasks_assigned', verbose_name=_('assigned to'),
    #                                on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

    def get_sub_tasks(self):
        return self.sub_tasks 

class SubTask(BaseModel):
    start_date = models.DateField()
    end_date = models.DateField()
    task = models.ForeignKey(
        'Task',
        on_delete=models.CASCADE,
        related_name='sub_tasks',
        to_field='id',
    )
    
    def __str__(self):
        return self.name

    