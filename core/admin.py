from django.contrib import admin
from core.models import Project, Task, SubTask
from django.contrib.auth import get_user_model

admin.site.register(Project)
admin.site.register(Task)
admin.site.register(SubTask)
