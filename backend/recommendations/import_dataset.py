import pandas as pd
from recommendations.models import JobListing

def load_jobs():
    job_data = pd.read_csv('E:/Msc project/job-recommendation-web-application/job_descriptions.csv')
    for _, row in job_data.iterrows():
        JobListing.objects.create(
            job_id = row['Job Id'],
            job_title = row['Job Title'],
            company = row['Company'],
            location = row['location'],
            country = row['Country'],
            job_description = row['Job Description'],
            skills = row['skills'],
        )