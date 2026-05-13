import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Alert,
  Stack,
} from "@mui/material";

import Sidebar from "../layouts/Sidebar";

import { useEffect, useState }
from "react";

import axios from "axios";

function Compliance() {
  const [stats, setStats] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const complianceData = [
        {
            title: "GDPR",
            status: "Compliant",
            score:
            `${stats?.gdprScore || 0}%`,
        },
        {
            title: "HIPAA",
            status: "Compliant",
            score:
            `${stats?.hipaaScore || 0}%`,
        },
        {
            title: "ISO 27001",
            status: "Compliant",
            score:
            `${stats?.isoScore || 0}%`,
        },
        {
            title: "SOC 2",
            status: "Compliant",
            score:
            `${stats?.socScore || 0}%`,
        },
    ];

  useEffect(() => {
    fetchCompliance();
  }, []);

  const fetchCompliance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/compliance");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setUploadError("");
    setUploadStatus("");
    setUploadFile(event.target.files[0] || null);
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setUploadError("Please choose a file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setUploadError("You must be logged in to upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUploadStatus(`Uploaded ${uploadFile.name} successfully.`);
      setUploadError("");
      setUploadFile(null);
      fetchCompliance();
    } catch (error) {
      setUploadError(error.response?.data?.error || error.message);
      setUploadStatus("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#0f172a",
        minHeight: "100vh",
      }}
    >

      <Sidebar />

      <Box
        sx={{
          ml: "250px",
          p: 4,
          width: "100%",
          color: "white",
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Compliance Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
          maxWidth={720}
        >
          Upload a policy or sample document to load it into the application
          context as document content and improve AI compliance handling.
        </Typography>

        <Paper
          sx={{
            p: 3,
            mb: 4,
            bgcolor: "#1e293b",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              Upload sample.txt
            </Typography>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              style={{ color: "white" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Document"}
            </Button>
            {uploadStatus && (
              <Alert severity="success">{uploadStatus}</Alert>
            )}
            {uploadError && (
              <Alert severity="error">{uploadError}</Alert>
            )}
          </Stack>
        </Paper>

        <Grid container spacing={3}>

          {complianceData.map((item) => (

            <Grid
              item
              xs={12}
              md={6}
              key={item.title}
            >

              <Paper
                sx={{
                  p: 3,
                  bgcolor: "#1e293b",
                  color: "white",
                  borderRadius: 3,
                }}
              >

                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  {item.title}
                </Typography>

                <Chip
                  label={item.status}
                  color="success"
                  sx={{ mt: 2 }}
                />

                <Typography
                  variant="h3"
                  mt={3}
                >
                  {item.score}
                </Typography>

              </Paper>

            </Grid>

          ))}

        </Grid>

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#1e293b",
                color: "white",
              }}
            >
              <Typography variant="h6">
                Total Logs
              </Typography>
              <Typography variant="h3">
                {stats?.totalLogs}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#1e293b",
                color: "white",
              }}
            >
              <Typography variant="h6">
                Blocked Requests
              </Typography>
              <Typography variant="h3">
                {stats?.blockedLogs}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#1e293b",
                color: "white",
              }}
            >
              <Typography variant="h6">
                Avg Latency
              </Typography>
              <Typography variant="h3">
                {stats?.avgLatency} ms
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          sx={{
            mt: 4,
            p: 4,
            bgcolor: "#1e293b",
            color: "white",
            borderRadius: 3,
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
          >
            Security Audit Summary
          </Typography>

          <Typography>
            Last Audit: 10 May 2026
          </Typography>

          <Typography mt={1}>
            Threat Detection Status:
            Active
          </Typography>

          <Typography mt={1}>
            DLP Protection:
            Enabled
          </Typography>

          <Typography mt={1}>
            MCP Authorization:
            Active
          </Typography>

        </Paper>

      </Box>

    </Box>
  );
}

export default Compliance;