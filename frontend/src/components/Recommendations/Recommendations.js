import React, { useEffect, useState } from 'react';
import { recommendJobs } from '../../api';
import JobList from './JobList';
import axios from 'axios';

const Recommendations = () => {
    const [skills, setSkills] = useState('');
    const [noRecommendation, setNoRecommendation] = useState(true);
    const [recommendedJobs, setRecommendedJobs] = useState([]);

    const handleRecommend = async () => {
        try {
            const response = await recommendJobs(skills);
            console.log(response.data.results);

            setRecommendedJobs(response.data.results);

            setNoRecommendation(false);

            // setRecommendedJobs(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)} 
                placeholder="Enter your skills" 
            />
            <button onClick={handleRecommend}>Get Recommendations</button>
            {noRecommendation ? <JobList></JobList> : <h2>Rcommended Jobs</h2> }
            <div>
                {recommendedJobs.map((job, index) => (
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

export default Recommendations;