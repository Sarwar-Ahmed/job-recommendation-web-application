from django.urls import path
from . import views
from .views import JobListView, RegisterView, LoginView, UserProfileView, JobRecommendationView


urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('job_recommend/', JobRecommendationView.as_view(), name='job-recommend'),
]