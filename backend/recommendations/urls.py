from django.urls import path
from . import views
from .views import JobListView, JobRecommendationView


urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('job_recommend/', JobRecommendationView.as_view(), name='job-recommend'),
]