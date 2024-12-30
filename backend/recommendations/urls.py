from django.urls import path
from . import views
from .views import JobListView, RegisterView, LoginView, JobRecommendationView


urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('job_recommend/', JobRecommendationView.as_view(), name='job-recommend'),
]