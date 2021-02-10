from django.urls import path 
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name="home"),
    path('login/', views.Login.as_view(), name='login-user'),
    path('register/', views.Register.as_view(), name='register-user'),
    path('projects/<uuid:id>/', views.ProjectDetailView.as_view(), name="project-detail"),
    path('projects/<uuid:id_1>/tasks/<uuid:id>/', views.TaskDetailView.as_view(), name="task-detail"),
]