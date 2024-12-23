from django.db import models

# Create your models here.

class JobListing(models.Model):
    job_id = models.IntegerField()
    job_title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    job_description = models.TextField()
    skills = models.TextField()

class UserProfile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferred_skills = models.TextField()