import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../api";
import { Card, CardContent, Pagination, Stack, Typography } from "@mui/material";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     fetchJobs().then(({ data }) => setJobs(data.results));
//   }, []);

    useEffect(() => {
        fetchData(page - 1);
    }, [page]);

    const fetchData = async (pageNum) => {
        try {
        const response = await fetchJobs(pageNum);
        setJobs(response.data.results);  // Results of the current page
        setTotalPages(Math.ceil(response.data.count / 10));  // Total pages based on count from API
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


  

  return (
    <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "#ffffff", padding: "2%" }}>Available Jobs</h1>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {jobs.map((job, index) => (
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: '10px' }}>
        <Stack spacing={2} sx={{ width: "100%", marginBottom: 2, borderRadius: 2, padding: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          bgColor="white"
          size="large"
        />
        </Stack>
      </div>
    </div>
  );
};

export default JobList;
