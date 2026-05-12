import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalLogs: 0,
    blockedLogs: 0,
    allowedLogs: 0,
  });

  const chartData = [
    { name: "Allowed", value: stats.allowedLogs, fill: "#22c55e" },
    { name: "Blocked", value: stats.blockedLogs, fill: "#ef4444" },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/dashboard/stats", {
        headers: {
          Authorization: token,
        },
      });
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#020617",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          p: { xs: 3, md: 4 },
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
            mb: 5,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Security Dashboard
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Welcome back, {user?.name || "Ronak"}
            </Typography>
          </Box>
          <Button variant="contained" href="/chat">
            Open AI Chat
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Queries Processed
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.totalLogs}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Threats Blocked
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.blockedLogs}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Compliance Score
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.allowedLogs}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: 320,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Recent Security Activity
              </Typography>
              <Typography mb={2}>✅ User authenticated successfully</Typography>
              <Typography mb={2}>🚫 Sensitive query blocked</Typography>
              <Typography mb={2}>🔒 DLP filter applied</Typography>
              <Typography mb={2}>🤖 AI request processed securely</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: 320,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                User Profile
              </Typography>
              <Typography mb={1}>
                <strong>Name:</strong> {user?.name}
              </Typography>
              <Typography mb={1}>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography mb={1}>
                <strong>Role:</strong> {user?.role}
              </Typography>
              <Typography mb={1}>
                <strong>Status:</strong> Active
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={12}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: 400,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Security Analytics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b1223",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: 400,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Compliance Summary
              </Typography>
              <Typography mb={2}>✅ JWT Authentication Enabled</Typography>
              <Typography mb={2}>✅ DLP Protection Active</Typography>
              <Typography mb={2}>✅ MCP Authorization Active</Typography>
              <Typography mb={2}>✅ Audit Logging Enabled</Typography>
              <Typography mb={2}>✅ AI Security Layer Running</Typography>
              <Typography mt={5} color="success.main">
                System Status: <strong>SECURE</strong>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;