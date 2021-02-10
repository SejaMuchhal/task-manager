from django.urls import path, include
from core import views

urlpatterns = [
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('projects/', views.ProjectListCreateAPIView.as_view(), name='project-list'),
    path('projects/<uuid:id>/', views.ProjectDetailsAPIView.as_view(), name='project-details'),
    path('projects/<uuid:id>/tasks/', views.TaskListCreateAPIView.as_view(), name='task-list'),
    path('projects/<uuid:id_1>/tasks/<uuid:id>/', views.TaskDetailsAPIView.as_view(), name='task-details'),
    path('subtasks/<uuid:id>/', views.SubTaskDetailsAPIView.as_view(), name="subtask-detail"),
  ]