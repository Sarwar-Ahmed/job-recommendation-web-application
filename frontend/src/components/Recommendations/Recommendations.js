import React, { useEffect, useState } from "react";
import { recommendJobs } from "../../api";
import JobList from "../JobList/JobList";
import axios from "axios";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

const Recommendations = () => {
  const [skills, setSkills] = useState("");
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
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
        <div>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ padding: '5%'}}  mt={4}>
                <TextField
                    label="Enter your skills"
                    variant="outlined"
                    value={skills}
                    required
                    onChange={(e) => setSkills(e.target.value)}
                    sx={{ width: '50%', marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRecommend}
                >
                    Get Recommendations
                </Button>
            </Box>
        </div>
      {noRecommendation ? (
        <JobList></JobList>
      ) : (
        <h1 style={{ color: "#ffffff", padding: "2%" }}>Rcommended Jobs</h1>
      )}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {recommendedJobs.map((job, index) => (
        <Card key={index} sx={{ maxWidth: '75%', bgcolor:"#F8F8F8", marginBottom: 2, borderRadius: 2, padding: 2 }}>
            <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
                <strong>{job.job_title}</strong>
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }} >
                <strong>Description: </strong>{job.job_description}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
                <strong>Skills Required: </strong>{job.skills}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <strong>Company name: </strong>{job.company}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <strong>Location: </strong>{job.location}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <strong>Country: </strong>{job.country}
            </Typography>
            
            </CardContent>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
