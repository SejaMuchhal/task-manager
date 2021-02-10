from rest_framework import serializers

from core.models import Project, Task, SubTask

class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    sub_tasks = SubTaskSerializer(many=True, source='get_sub_tasks', required=False, read_only=True)
    class Meta:
        model = Task
        fields = '__all__'
        

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, source='get_tasks', required=False, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
        
