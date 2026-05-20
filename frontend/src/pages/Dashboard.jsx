import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Shield,
  Lock,
  Activity,
  User,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../layouts/Sidebar";
import API from "../services/api";

function Dashboard() {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({

    totalLogs: 0,
    blockedLogs: 0,
    allowedLogs: 0,

  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token =
      localStorage.getItem("token");

      const res =
      await API.get(

        "/dashboard/stats",

        {
          headers: {
            Authorization: token,
          },
        }

      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const chartData = [

    {
      name: "Allowed",
      value: stats.allowedLogs,
      fill: "#22c55e",
    },

    {
      name: "Blocked",
      value: stats.blockedLogs,
      fill: "#ef4444",
    },

  ];

  return (

    <Box
      sx={{
        display: "flex",
        bgcolor: "#020617",
        minHeight: "100vh",
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flex: 1,
          p: {
            xs: 3,
            md: 5,
          },
          color: "white",
          background:
          `
          radial-gradient(
            circle at top left,
            rgba(59,130,246,0.15),
            transparent 30%
          ),

          radial-gradient(
            circle at bottom right,
            rgba(168,85,247,0.12),
            transparent 30%
          ),

          #020617
          `,
        }}
      >

        {/* HEADER */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
            flexWrap: "wrap",
            gap: 3,
          }}
        >

          <Box>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              Secure AI Platform
            </Typography>

            <Typography
              color="rgba(255,255,255,0.6)"
              mt={1}
            >
              Enterprise RAG + MCP Security Dashboard
            </Typography>

          </Box>

          <Button
            variant="contained"
            href="/chat"
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
              background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",

              boxShadow:
              "0 10px 30px rgba(59,130,246,0.35)",

              "&:hover": {

                background:
                "linear-gradient(135deg,#1d4ed8,#6d28d9)",

              },
            }}
          >
            Open AI Chat
          </Button>

        </Box>

        {/* PROFILE CARD */}

        <Paper
          sx={{
            p: 0,
            overflow: "hidden",
            borderRadius: "28px",
            mb: 5,
            background:
            "rgba(255,255,255,0.05)",

            backdropFilter: "blur(16px)",

            border:
            "1px solid rgba(255,255,255,0.08)",

            boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >

          <Box
            sx={{
              p: 4,
              background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            }}
          >

            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: "rgba(255,255,255,0.2)",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>

              <Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {user?.name}
                </Typography>

                <Typography
                  sx={{
                    opacity: 0.85,
                    mt: 0.5,
                  }}
                >
                  {user?.email}
                </Typography>

              </Box>

            </Stack>

          </Box>

          <Grid
            container
            spacing={0}
          >

            <Grid item xs={12} md={4}>

              <Box
                sx={{
                  p: 4,
                  borderRight:
                  "1px solid rgba(255,255,255,0.06)",
                }}
              >

                <Typography
                  color="rgba(255,255,255,0.5)"
                  fontSize="14px"
                >
                  ACCESS ROLE
                </Typography>

                <Chip
                  label={user?.role}
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    bgcolor:
                    user?.role === "admin"
                    ? "rgba(34,197,94,0.15)"
                    : user?.role === "analyst"
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(239,68,68,0.15)",

                    color:
                    user?.role === "admin"
                    ? "#22c55e"
                    : user?.role === "analyst"
                    ? "#3b82f6"
                    : "#ef4444",
                  }}
                />

              </Box>

            </Grid>

            <Grid item xs={12} md={4}>

              <Box
                sx={{
                  p: 4,
                  borderRight:
                  "1px solid rgba(255,255,255,0.06)",
                }}
              >

                <Typography
                  color="rgba(255,255,255,0.5)"
                  fontSize="14px"
                >
                  ACCOUNT STATUS
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Active Session
                </Typography>

              </Box>

            </Grid>

            <Grid item xs={12} md={4}>

              <Box
                sx={{
                  p: 4,
                }}
              >

                <Typography
                  color="rgba(255,255,255,0.5)"
                  fontSize="14px"
                >
                  SECURITY LAYER
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  MCP + DLP Enabled
                </Typography>

              </Box>

            </Grid>

          </Grid>

        </Paper>

        {

          user?.role === "admin"

          ? (

            <>

              {/* STATS */}

              <Grid
                container
                spacing={4}
                mb={5}
              >

                {

                  [

                    {
                      title: "Queries Processed",
                      value: stats.totalLogs,
                      icon: <Activity size={28} />,
                    },

                    {
                      title: "Blocked Threats",
                      value: stats.blockedLogs,
                      icon: <Lock size={28} />,
                    },

                    {
                      title: "Allowed Requests",
                      value: stats.allowedLogs,
                      icon: <Shield size={28} />,
                    },

                  ].map((item, index) => (

                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={index}
                    >

                      <Paper
                        sx={{
                          p: 4,
                          borderRadius: "24px",
                          background:
                          "rgba(255,255,255,0.05)",

                          backdropFilter:
                          "blur(14px)",

                          border:
                          "1px solid rgba(255,255,255,0.08)",

                          transition: "0.3s",

                          "&:hover": {

                            transform:
                            "translateY(-5px)",

                            boxShadow:
                            "0 15px 40px rgba(0,0,0,0.4)",

                          },
                        }}
                      >

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent:
                            "space-between",

                            alignItems: "center",
                          }}
                        >

                          <Typography
                            color="rgba(255,255,255,0.65)"
                          >
                            {item.title}
                          </Typography>

                          {item.icon}

                        </Box>

                        <Typography
                          variant="h2"
                          fontWeight="bold"
                          mt={4}
                        >
                          {item.value}
                        </Typography>

                      </Paper>

                    </Grid>

                  ))

                }

              </Grid>

              {/* ANALYTICS */}

              <Paper
                sx={{
                  p: 5,
                  borderRadius: "28px",
                  background:
                  "rgba(255,255,255,0.05)",

                  backdropFilter: "blur(16px)",

                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={4}
                >
                  Security Analytics
                </Typography>

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <BarChart
                    data={chartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.08)"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                    />

                    <YAxis
                      stroke="#94a3b8"
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                        "#0f172a",

                        border:
                        "1px solid rgba(255,255,255,0.1)",

                        borderRadius: "12px",
                      }}
                    />

                    <Bar
                      dataKey="value"
                      radius={[12, 12, 0, 0]}
                    >

                      {

                        chartData.map(
                          (entry, index) => (

                          <Cell
                            key={index}
                            fill={entry.fill}
                          />

                        ))

                      }

                    </Bar>

                  </BarChart>

                </ResponsiveContainer>

              </Paper>

            </>

          )

          : (

            <Paper
              sx={{
                p: 5,
                borderRadius: "28px",
                background:
                "rgba(255,255,255,0.05)",

                backdropFilter: "blur(16px)",

                border:
                "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Restricted Analytics
              </Typography>

              <Typography
                mt={2}
                color="rgba(255,255,255,0.6)"
                lineHeight={1.8}
              >

                Enterprise analytics,
                compliance monitoring,
                security intelligence,
                and audit insights
                are available only
                for admin accounts.

              </Typography>

            </Paper>

          )

        }

      </Box>

    </Box>

  );

}

export default Dashboard;