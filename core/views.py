from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.serializers import  ProjectSerializer, TaskSerializer, SubTaskSerializer
from core.models import Project, Task, SubTask
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


class ProjectListCreateAPIView(ListCreateAPIView):
    """
    API view to retrieve list of projects or create new
    """
    lookup_field = 'id'
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class ProjectDetailsAPIView(RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update or delete project
    """
    lookup_field = 'id'
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class TaskListCreateAPIView(ListCreateAPIView):
    """
    API view to retrieve list of tasks or create new
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(project=self.kwargs['id'])

class TaskDetailsAPIView(RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update or delete task
    """
    lookup_field = 'id'
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class SubTaskListCreateAPIView(ListCreateAPIView):
    """
    API view to retrieve list of sub tasks or create new
    """
    serializer_class = SubTaskSerializer
    queryset = SubTask.objects.all()

class SubTaskDetailsAPIView(RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update or delete sub task
    """
    lookup_field = 'id'
    serializer_class = SubTaskSerializer
    queryset = SubTask.objects.all()

