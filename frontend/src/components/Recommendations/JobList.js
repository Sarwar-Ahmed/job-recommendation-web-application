import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../../api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs().then(({ data }) => setJobs(data.results));
    }, []);

    return (
        <div>
            <h2>Available Jobs</h2>
            
            <div>
                {jobs.map((job, index) => (
                    <div key={index}>
                        <h3>Job Title: {job.job_title}</h3>
                        <p>Job Description: {job.job_description}</p>
                        <p><strong>Skills Required:</strong> {job.skills}</p>
                        <p>Company Name: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Country: {job.country}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;