import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";

import {
  Shield,
  Lock,
 Activity,
  Database,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  GlobeLock,
  Radar,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

function Compliance() {

  const [stats, setStats] =
  useState(null);

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchCompliance();

  }, []);

  const fetchCompliance = async () => {

    try {

      const token =
      localStorage.getItem("token");

      const res =
      await axios.get(
        "http://localhost:5000/api/compliance",
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

  const complianceData = [

    {
      title: "GDPR",
      score: stats?.gdprScore || 0,
      icon: <Shield size={22} />,
    },

    {
      title: "HIPAA",
      score: stats?.hipaaScore || 0,
      icon: <Lock size={22} />,
    },

    {
      title: "ISO 27001",
      score: stats?.isoScore || 0,
      icon: <Database size={22} />,
    },

    {
      title: "SOC 2",
      score: stats?.socScore || 0,
      icon: <Activity size={22} />,
    },

  ];

  return (

    <Box
      sx={{
        display: "flex",

        minHeight: "100vh",

        background:
        `
        radial-gradient(
          circle at top left,
          rgba(59,130,246,0.15),
          transparent 25%
        ),

        radial-gradient(
          circle at bottom right,
          rgba(168,85,247,0.12),
          transparent 25%
        ),

        #020617
        `,
      }}
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <Box
        sx={{
          flex: 1,

          p: {
            xs: 2,
            md: 4,
          },

          color: "white",
        }}
      >

        <Box
          sx={{
            maxWidth: 1350,
            mx: "auto",
          }}
        >

          {/* HERO */}

          <Paper
            sx={{
              p: {
                xs: 3,
                md: 5,
              },

              borderRadius: "32px",

              background:
              "rgba(255,255,255,0.05)",

              border:
              "1px solid rgba(255,255,255,0.08)",

              backdropFilter:
              "blur(18px)",

              overflow: "hidden",

              position: "relative",

              mb: 4,

              boxShadow:
              "0 15px 40px rgba(0,0,0,0.3)",
            }}
          >

            {/* GLOW */}

            <Box
              sx={{
                position: "absolute",

                width: 300,
                height: 300,

                borderRadius: "50%",

                bgcolor:
                "rgba(59,130,246,0.12)",

                filter: "blur(100px)",

                top: -100,
                right: -80,
              }}
            />

            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}

              justifyContent="space-between"

              alignItems={{
                xs: "flex-start",
                md: "center",
              }}

              spacing={3}

              sx={{
                position: "relative",
                zIndex: 2,
              }}
            >

              <Box>

                <Chip
                  icon={
                    <Sparkles size={16} />
                  }

                  label="AI Compliance Intelligence"

                  sx={{
                    mb: 3,

                    bgcolor:
                    "rgba(59,130,246,0.12)",

                    color: "#60a5fa",

                    fontWeight: "bold",
                  }}
                />

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  Compliance Dashboard
                </Typography>

                <Typography
                  color="rgba(255,255,255,0.7)"
                  sx={{
                    mt: 2,
                    maxWidth: 700,
                    lineHeight: 1.5,
                  }}
                >

                  Monitor AI compliance across GDPR, HIPAA, ISO 27001, and SOC 2 frameworks. Get real-time insights, audit logs, and security analytics to ensure your enterprise AI is secure and compliant.

                </Typography>

              </Box>

              <Avatar
                sx={{
                  width: 90,
                  height: 90,

                  bgcolor:
                  "rgba(59,130,246,0.12)",

                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  backdropFilter:
                  "blur(14px)",
                }}
              >

                <ShieldCheck
                  size={42}
                  color="#60a5fa"
                />

              </Avatar>

            </Stack>

          </Paper>

          {

            user?.role === "admin"

            ? (

              <>

                {/* COMPLIANCE GRID */}

                <Grid
                  container
                  spacing={3}
                >

                  {

                    complianceData.map((item) => (

                      <Grid
                        item
                        xs={12}
                        md={6}
                        key={item.title}
                      >

                        <Paper
                          sx={{
                            p: 3,

                            borderRadius: "28px",

                            background:
                            "rgba(255,255,255,0.04)",

                            border:
                            "1px solid rgba(255,255,255,0.08)",

                            backdropFilter:
                            "blur(16px)",

                            transition:
                            "0.35s ease",

                            overflow: "hidden",

                            position: "relative",

                            "&:hover": {

                              transform:
                              "translateY(-6px)",

                              border:
                              "1px solid rgba(96,165,250,0.25)",

                              boxShadow:
                              "0 20px 40px rgba(0,0,0,0.28)",
                            },
                          }}
                        >

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                          >

                            <Box>

                              <Typography
                                variant="h6"
                                fontWeight="bold"
                              >
                                {item.title}
                              </Typography>

                              <Typography
                                color="rgba(255,255,255,0.55)"
                                fontSize="14px"
                              >
                                Compliance Framework
                              </Typography>

                            </Box>

                            <Avatar
                              sx={{
                                bgcolor:
                                "rgba(59,130,246,0.12)",

                                color: "#60a5fa",

                                width: 54,
                                height: 54,
                              }}
                            >
                              {item.icon}
                            </Avatar>

                          </Stack>

                          <Typography
                            variant="h2"
                            fontWeight="bold"
                            mb={2}
                          >
                            {item.score}%
                          </Typography>

                          <LinearProgress
                            variant="determinate"
                            value={item.score}

                            sx={{
                              height: 10,

                              borderRadius: 20,

                              bgcolor:
                              "rgba(255,255,255,0.06)",

                              "& .MuiLinearProgress-bar": {

                                borderRadius: 20,

                                bgcolor:

                                item.score >= 90

                                ? "#22c55e"

                                : "#f59e0b",
                              },
                            }}
                          />

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={3}
                          >

                            <Chip
                              label={
                                item.score >= 90
                                ? "Compliant"
                                : "Risk"
                              }

                              sx={{
                                mt: 1.5,
                                bgcolor:

                                item.score >= 90

                                ? "rgba(34,197,94,0.12)"

                                : "rgba(245,158,11,0.12)",

                                color:

                                item.score >= 90

                                ? "#22c55e"

                                : "#f59e0b",

                                fontWeight: "bold",
                              }}
                            />

                            

                          </Stack>

                        </Paper>

                      </Grid>

                    ))

                  }

                </Grid>

                {/* STATS */}

                <Grid
                  container
                  spacing={3}
                  mt={4}
                >

                  {

                    [

                      {
                        title: "Total Queries",
                        value:
                        stats?.totalLogs || 0,

                        icon:
                        <Radar size={22} />,

                        color: "#60a5fa",
                      },

                      {
                        title: "Blocked Requests",
                        value:
                        stats?.blockedLogs || 0,

                        icon:
                        <Shield size={22} />,

                        color: "#ef4444",
                      },

                      {
                        title: "Avg Latency",
                        value:
                        `${stats?.avgLatency || 0} ms`,

                        icon:
                        <GlobeLock size={22} />,

                        color: "#22c55e",
                      },

                    ].map((item) => (

                      <Grid
                        item
                        xs={12}
                        md={4}
                        key={item.title}
                      >

                        <Paper
                          sx={{
                            p: 3,

                            borderRadius: "28px",

                            background:
                            "rgba(255,255,255,0.04)",

                            border:
                            "1px solid rgba(255,255,255,0.08)",

                            backdropFilter:
                            "blur(16px)",

                            transition:
                            "0.3s ease",

                            "&:hover": {

                              transform:
                              "translateY(-5px)",
                            },
                          }}
                        >

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >

                            <Box>

                              <Typography
                                color="rgba(255,255,255,0.55)"
                              >
                                {item.title}
                              </Typography>

                              <Typography
                                variant="h3"
                                fontWeight="bold"
                                mt={1}
                              >
                                {item.value}
                              </Typography>

                            </Box>

                            <Avatar
                              sx={{
                                bgcolor:
                                `${item.color}20`,

                                color:
                                item.color,

                                width: 56,
                                height: 56,
                              }}
                            >
                              {item.icon}
                            </Avatar>

                          </Stack>

                        </Paper>

                      </Grid>

                    ))

                  }

                </Grid>

                {/* SECURITY SUMMARY */}

                <Paper
                  sx={{
                    mt: 4,

                    p: 4,

                    borderRadius: "30px",

                    background:
                    "rgba(255,255,255,0.04)",

                    border:
                    "1px solid rgba(255,255,255,0.08)",

                    backdropFilter:
                    "blur(16px)",
                  }}
                >

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                  >
                    Security Audit Summary
                  </Typography>

                  <Divider
                    sx={{
                      borderColor:
                      "rgba(255,255,255,0.08)",

                      mb: 4,
                    }}
                  />

                  <Grid
                    container
                    spacing={3}
                  >

                    {

                      [

                        "Threat Detection Active",

                        "DLP Protection Enabled",

                        "MCP Authorization Active",

                        "Secure Document Access",

                        "Role Based Access Control",

                        "Encrypted Audit Logging",

                      ].map((item) => (

                        <Grid
                          item
                          xs={12}
                          md={6}
                          key={item}
                        >

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >

                            <CheckCircle2
                              size={20}
                              color="#22c55e"
                            />

                            <Typography
                              color="rgba(255,255,255,0.82)"
                            >
                              {item}
                            </Typography>

                          </Stack>

                        </Grid>

                      ))

                    }

                  </Grid>

                </Paper>

              </>

            )

            : (

              <Paper
                sx={{
                  p: 5,

                  borderRadius: "28px",

                  textAlign: "center",

                  background:
                  "rgba(255,255,255,0.04)",

                  border:
                  "1px solid rgba(255,255,255,0.08)",
                }}
              >

                <AlertTriangle
                  size={52}
                  color="#f59e0b"
                />

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mt={3}
                >
                  Restricted Access
                </Typography>

                <Typography
                  mt={2}
                  color="rgba(255,255,255,0.65)"
                >

                  Compliance analytics,
                  governance insights,
                  enterprise monitoring,
                  and security controls
                  are available only
                  for admin users.

                </Typography>

              </Paper>

            )

          }

        </Box>

      </Box>

    </Box>

  );

}

export default Compliance;