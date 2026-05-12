import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
} from "@mui/material";
import API from "../services/api";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/logs", {
        headers: {
          Authorization: token,
        },
      });
      setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
        px: { xs: 2, md: 4 },
        py: 5,
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={1}>
              Audit Logs
            </Typography>
            <Typography color="text.secondary">
              Review secure AI events and compliance actions.
            </Typography>
          </Box>
          <Chip label={`${logs.length} events`} color="primary" />
        </Box>

        <Grid container spacing={3}>
          {logs.length ? (
            logs.map((log, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    {log.message}
                  </Typography>
                  <Typography color="text.secondary" mb={1}>
                    {new Date(log.createdAt).toLocaleString()}
                  </Typography>
                  <Typography mb={0.5}>
                    <strong>Role:</strong> {log.role}
                  </Typography>
                  <Typography mb={0.5}>
                    <strong>Status:</strong> {log.status}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography color="text.secondary">
                  No audit logs available yet. Your secure queries and compliance events will appear here.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Logs;