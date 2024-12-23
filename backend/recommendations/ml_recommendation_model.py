from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import JobListing
# import numpy as np
import pandas as pd
import pickle


# **Load and Clean Data**

# load the dataset from the database and convert it to a pandas DataFrame
job_data = pd.DataFrame(list(JobListing.objects.all().values()))  # Convert the QuerySet to a DataFrame

# Inspect the first few rows (Uncomment to check data)
# job_data.head()

# **Combine Text Columns (Job Description and skills)**

# Fill NaN values with an empty string for Job Description and skills columns
job_data['job_description'] = job_data['job_description'].fillna('')
job_data['skills'] = job_data['skills'].fillna('')

# Combine the job description and skills columns to form a "combined_features" column
job_data['combined_features'] = job_data['job_description'] + " " + job_data['skills']

# **Vectorize the text Data**

# Initialize the TF-IDF Vectorizer with English stop words removed
vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the "combined_features" column into a TF-IDF matrix
job_matrix = vectorizer.fit_transform(job_data['combined_features'])

# Save the TF-IDF vectorizer and the job feature matrix for later use
with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
with open("job_matrix.pkl", "wb") as f:
    pickle.dump(job_matrix, f)

# **Define a Function to Recommend Jobs Based on User Skills**

def recommend_jobs(user_skills, top_n=100):
    
    # Load vectorizer and job matrix
    with open("vectorizer.pkl", "rb") as f:
        vectorizer = pickle.load(f)
    with open("job_matrix.pkl", "rb") as f:
        job_matrix = pickle.load(f)

    # Vectorize user skills input
    user_vector = vectorizer.transform([user_skills])

    # Calculate cosine similarity
    similarities = cosine_similarity(user_vector, job_matrix)

    # Get indices of top N jobs
    job_indices = similarities.argsort()[0][-top_n:][::-1]
    
    # Retrieve recommended jobs
    recommended_jobs = job_data.iloc[job_indices]
    
    job_instances = []
    for _, row in recommended_jobs.iterrows():
        job_instance = JobListing(
            job_id=row['job_id'],
            job_title=row['job_title'],
            company=row['company'],
            location=row['location'],
            country=row['country'],
            job_description=row['job_description'],
            skills=row['skills']
        )
        job_instances.append(job_instance)
    return job_instances


# def recommend_jobs(user_skills):
#     jobs = JobListing.objects.all()
#     job_skills = [job.skills for job in jobs]

#     vectorizer = TfidfVectorizer()
#     vectors = vectorizer.fit_transform(job_skills + [user_skills])

#     similarity_scores = cosine_similarity(vectors[-1], vectors[:-1])
#     scores_and_jobs = sorted(zip(similarity_scores[0], jobs), reverse=True)
    
#     recommended_jobs = [job for score, job in scores_and_jobs[:5]]
#     return recommended_jobs

# def recommend_jobs(user_skills):
#     jobs = JobListing.objects.all()
#     job_skills = [", ".join(job.skills) for job in jobs]
#     all_skills = job_skills + [user_skills]

#     vectorizer = TfidfVectorizer(stop_words='english')
#     vectors = vectorizer.fit_transform(all_skills)

#     similarity_scores = cosine_similarity(vectors[-1], vectors[:-1])

#     # Use numpy.argsort() to get sorted indices of the similarity scores
#     sorted_indices = np.argsort(similarity_scores[0])[::-1]  # Sort in descending order
#     recommended_jobs = [jobs[i] for i in sorted_indices[:5]]

#     return recommended_jobs