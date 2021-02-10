from django.shortcuts import render
from django.views.generic.base import TemplateView, View

class Register(TemplateView):
    template_name = 'frontend/register.html'

class Login(TemplateView):
    template_name = 'frontend/login.html'

class IndexView(TemplateView):
    template_name = 'frontend/index.html'

class ProjectDetailView(View):
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        context = {'id': id}
        return render(request, "frontend/project-detail.html", context=context)

class TaskDetailView(View):
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        id_1 = self.kwargs['id_1']
        context = {'id': id, 'id_1':id_1}
        return render(request, "frontend/task-detail.html", context=context)
