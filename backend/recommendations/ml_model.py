# **Import Required Libraries
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# **Load and Clean Data

# load the datset
job_data = pd.read_csv("E:/Msc project/job-recommendation-web-application/job_descriptions.csv")

# Inspect the first few rows
# job_data.head()

# **Combine Text Columns (Job Description and skills)

# Fill NaN values with an empty string
job_data['Job Description'] = job_data['Job Description'].fillna('')
job_data['skills'] = job_data['skills'].fillna('')

# Combine the job description and skills columns
job_data['combined_features'] = job_data['Job Description'] + " " + job_data['skills']

# **Vectorize the text Data

vectorizer = TfidfVectorizer(stop_words='english')
job_matrix = vectorizer.fit_transform(job_data['combined_features'])

# Save the TF-IDF vectorizer and job matrix for later use
with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
with open("job_matrix.pkl", "wb") as f:
    pickle.dump(job_matrix, f)

# **Define a Function to Recommend Jobs Based on User Skills

def recommend_jobs(user_skills, top_n=10):
    
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
    return recommended_jobs[['Job Id', 'Job Title', 'Company', 'location', 'Country', 'Job Description', 'skills']]