import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import InsightsIcon from "@mui/icons-material/Insights";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ShieldMoonIcon from "@mui/icons-material/ShieldMoon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Home() {

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#030712",
        color: "white",
        overflow: "hidden",
        position: "relative",
      }}
    >

      {/* BACKGROUND BLUR */}

      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          bgcolor: "#2563eb",
          filter: "blur(180px)",
          opacity: 0.25,
          top: -120,
          left: -120,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          bgcolor: "#7c3aed",
          filter: "blur(180px)",
          opacity: 0.18,
          bottom: -100,
          right: -100,
        }}
      />

      {/* NAVBAR */}

      <Box
        sx={{
          maxWidth: 1350,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >

          <Avatar
            sx={{
              bgcolor: "#2563eb",
              width: 46,
              height: 46,
              fontWeight: "bold",
            }}
          >
            SR
          </Avatar>

          <Box>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              SecureRAG
            </Typography>

            <Typography
              variant="body2"
              color="gray"
            >
              Enterprise AI Security
            </Typography>

          </Box>

        </Box>

        <Stack direction="row" spacing={2}>

          <Button
            href="/login"
            sx={{
              color: "white",
              borderRadius: 3,
              px: 3,
            }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            href="/signup"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.2,
              bgcolor: "#2563eb",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow:
              "0 10px 30px rgba(37,99,235,0.35)",

              "&:hover": {
                bgcolor: "#1d4ed8",
              },
            }}
          >
            Get Started
          </Button>

        </Stack>

      </Box>

      {/* HERO SECTION */}

      <Box
        sx={{
          maxWidth: 1350,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 8, md: 14 },
          position: "relative",
          zIndex: 2,
        }}
      >

        <Grid
          container
          spacing={8}
          alignItems="center"
        >

          {/* LEFT */}

          <Grid item xs={12} md={6}>

            <Chip
              label="AI + Security + Compliance"
              sx={{
                bgcolor:
                "rgba(37,99,235,0.12)",

                color: "#60a5fa",
                border:
                "1px solid rgba(96,165,250,0.2)",

                mb: 4,
              }}
            />

            <Typography
              variant="h1"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: "3rem",
                  md: "5rem",
                },
                lineHeight: 1.05,
                mb: 4,
              }}
            >
              Secure AI
              <br />
              for Modern
              <br />
              Enterprises
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "1.15rem",
                lineHeight: 1.9,
                maxWidth: 600,
                mb: 5,
              }}
            >
              Enterprise-grade secure AI platform
              with RAG, MCP authorization,
              DLP masking, audit logging,
              compliance analytics,
              and role-based access control.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={3}
            >

              <Button
                variant="contained"
                href="/signup"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#2563eb",
                  borderRadius: 4,
                  px: 5,
                  py: 1.8,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",

                  boxShadow:
                  "0 12px 35px rgba(37,99,235,0.35)",

                  "&:hover": {
                    bgcolor: "#1d4ed8",
                  },
                }}
              >
                Start Free
              </Button>

              <Button
                href="/dashboard"
                sx={{
                  color: "white",
                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  bgcolor:
                  "rgba(255,255,255,0.03)",

                  borderRadius: 4,
                  px: 5,
                  py: 1.8,
                  textTransform: "none",
                  backdropFilter: "blur(12px)",
                }}
              >
                Open Dashboard
              </Button>

            </Stack>

          </Grid>

          {/* RIGHT */}

          <Grid item xs={12} md={6}>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 6,
                bgcolor:
                "rgba(255,255,255,0.05)",

                border:
                "1px solid rgba(255,255,255,0.08)",

                backdropFilter: "blur(18px)",
                position: "relative",
                overflow: "hidden",
              }}
            >

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                  "linear-gradient(to bottom right, rgba(37,99,235,0.12), transparent)",
                }}
              />

              <Stack spacing={3} position="relative">

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor:
                    "rgba(255,255,255,0.04)",

                    border:
                    "1px solid rgba(255,255,255,0.06)",
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >

                    <SecurityIcon
                      sx={{
                        color: "#22c55e",
                        fontSize: 34,
                      }}
                    />

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Secure AI Queries
                    </Typography>

                  </Box>

                  <Typography
                    color="#94a3b8"
                    lineHeight={1.8}
                  >
                    Ask questions securely with
                    real-time DLP masking,
                    access control,
                    and compliance enforcement.
                  </Typography>

                </Paper>

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor:
                    "rgba(255,255,255,0.04)",

                    border:
                    "1px solid rgba(255,255,255,0.06)",
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >

                    <InsightsIcon
                      sx={{
                        color: "#38bdf8",
                        fontSize: 34,
                      }}
                    />

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Security Analytics
                    </Typography>

                  </Box>

                  <Typography
                    color="#94a3b8"
                    lineHeight={1.8}
                  >
                    Monitor blocked requests,
                    audit logs,
                    latency,
                    and compliance metrics
                    through real-time dashboards.
                  </Typography>

                </Paper>

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor:
                    "rgba(255,255,255,0.04)",

                    border:
                    "1px solid rgba(255,255,255,0.06)",
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >

                    <ShieldMoonIcon
                      sx={{
                        color: "#a855f7",
                        fontSize: 34,
                      }}
                    />

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Role Based Access
                    </Typography>

                  </Box>

                  <Typography
                    color="#94a3b8"
                    lineHeight={1.8}
                  >
                    Admin, analyst,
                    and guest access levels
                    with MCP authorization
                    and enterprise-style security layers.
                  </Typography>

                </Paper>

              </Stack>

            </Paper>

          </Grid>

        </Grid>

        {/* FEATURE CARDS */}

        <Grid
          container
          spacing={4}
          mt={8}
        >

          {[

            {
              title: "AI Assistant",
              desc:
              "Modern conversational AI powered by Groq LLM with secure enterprise workflows.",
              icon:
              <ChatBubbleOutlineIcon
                sx={{
                  color: "#60a5fa",
                  fontSize: 34,
                }}
              />,
            },

            {
              title: "Compliance Monitoring",
              desc:
              "Track DLP protection, MCP authorization, audit events, and compliance health.",
              icon:
              <SecurityIcon
                sx={{
                  color: "#22c55e",
                  fontSize: 34,
                }}
              />,
            },

            {
              title: "Enterprise Analytics",
              desc:
              "Interactive dashboards for threat detection, blocked queries, and AI activity monitoring.",
              icon:
              <InsightsIcon
                sx={{
                  color: "#f59e0b",
                  fontSize: 34,
                }}
              />,
            },

            {
              title: "Secure RAG",
              desc:
              "AI answers only from uploaded enterprise documents using secure retrieval pipelines.",
              icon:
              <AutoAwesomeIcon
                sx={{
                  color: "#a855f7",
                  fontSize: 34,
                }}
              />,
            },

          ].map((item, index) => (

            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              key={index}
            >

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 5,
                  bgcolor:
                  "rgba(255,255,255,0.04)",

                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  backdropFilter: "blur(12px)",

                  transition: "0.3s",

                  height: "100%",

                  "&:hover": {
                    transform:
                    "translateY(-8px)",

                    border:
                    "1px solid rgba(96,165,250,0.25)",
                  },
                }}
              >

                <Box mb={3}>
                  {item.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                >
                  {item.title}
                </Typography>

                <Typography
                  color="#94a3b8"
                  lineHeight={1.8}
                >
                  {item.desc}
                </Typography>

              </Paper>

            </Grid>

          ))}

        </Grid>

      </Box>

    </Box>

  );

}

export default Home;