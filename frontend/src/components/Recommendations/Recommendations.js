import React, { useContext, useEffect, useState } from "react";
import axiosAPI, { recommendJobs } from "../../api";
import JobList from "../JobList/JobList";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../../App";

const Recommendations = () => {
  const [skills, setSkills] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [recommendation, setRecommendation] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);


  

  const handleRecommend = async () => {
    try {
      const response = await recommendJobs(skills);

      setRecommendedJobs(response.data.results);

      setRecommendation(true);

      // setRecommendedJobs(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    if (loggedInUser.skills) {
      setSkills(loggedInUser.skills);
      handleRecommend();
    }
  }, [loggedInUser]);


  return (
    <div>
      <div>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ padding: "5%" }}
          mt={4}
        >
          <h3 style={{ color: "#ffffff", padding: "2%" }}>
            Find job postings based on your skills
          </h3>
          <TextField
            label="Enter your skills"
            name="skills"
            variant="outlined"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            sx={{
              width: "50%",
              marginBottom: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
            required
          />
          <Button variant="contained" color="primary" onClick={handleRecommend}>
            Get Recommendations
          </Button>
        </Box>
      </div>
      {recommendation ? (
        <div>
          <h1 style={{ color: "#ffffff", padding: "2%" }}>
            Top 10 Jobs Recommendation Based On Your Skills
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {recommendedJobs.map((job, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: "75%",
                  bgcolor: "#F8F8F8",
                  marginBottom: 2,
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    <strong>{job.job_title}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Description: </strong>
                    {job.job_description}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    <strong>Skills Required: </strong>
                    {job.skills}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Company name: </strong>
                    {job.company}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location: </strong>
                    {job.location}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Country: </strong>
                    {job.country}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <JobList></JobList>
      )}
    </div>
  );
};

export default Recommendations;
