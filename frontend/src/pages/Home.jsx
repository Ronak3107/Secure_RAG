import { useState } from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";

import {
  Shield,
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  Brain,
  Database,
  CheckCircle2,
  Globe,
  Bot,
} from "lucide-react";

import API from "../services/api";

function Home() {

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res =
      await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.location.href =
      "/dashboard";

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        overflow: "hidden",
        position: "relative",
        color: "white",
      }}
    >

      {/* BACKGROUND */}

      <Box
        sx={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          bgcolor: "#2563eb",
          filter: "blur(260px)",
          opacity: 0.16,
          top: -250,
          left: -180,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 550,
          height: 550,
          borderRadius: "50%",
          bgcolor: "#7c3aed",
          filter: "blur(240px)",
          opacity: 0.14,
          bottom: -220,
          right: -150,
        }}
      />

      {/* GRID LINES */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backgroundImage:
          `
          linear-gradient(
            rgba(255,255,255,0.03) 1px,
            transparent 1px
          ),

          linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 1px,
            transparent 1px
          )
          `,

          backgroundSize: "80px 80px",

          maskImage:
          "radial-gradient(circle at center, black, transparent 90%)",
        }}
      />

      {/* NAVBAR */}

      <Box
        sx={{
          position: "relative",
          zIndex: 2,

          px: {
            xs: 3,
            md: 8,
          },

          py: 3.5,

          display: "flex",

          justifyContent:
          "space-between",

          alignItems: "center",
        }}
      >

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >

          <Avatar
            sx={{
              width: 54,
              height: 54,

              borderRadius: "18px",

              background:
              `
              linear-gradient(
                135deg,
                #2563eb,
                #7c3aed
              )
              `,

              boxShadow:
              "0 15px 40px rgba(59,130,246,0.35)",
            }}
          >

            <Shield size={26} />

          </Avatar>

          <Box>

            <Typography
              fontWeight="800"
              fontSize="24px"
              letterSpacing="-1px"
            >
              SecureRAG
            </Typography>

            <Typography
              fontSize="13px"
              color="rgba(255,255,255,0.45)"
            >
              Enterprise AI Security Platform
            </Typography>

          </Box>

        </Stack>

        <Stack
          direction="row"
          spacing={2}
        >

          <Button
            href="/signup"

            variant="contained"

            sx={{

              height: 48,

              px: 3,

              borderRadius: "16px",

              textTransform: "none",

              fontWeight: "bold",

              background:
              `
              linear-gradient(
                135deg,
                #2563eb,
                #7c3aed
              )
              `,

              boxShadow:
              "0 12px 30px rgba(59,130,246,0.3)",

              "&:hover": {

                background:
                `
                linear-gradient(
                  135deg,
                  #1d4ed8,
                  #6d28d9
                )
                `,
              },
            }}
          >
            Get Started
          </Button>

        </Stack>

      </Box>

      {/* MAIN SECTION */}

      <Box
        sx={{
          position: "relative",
          zIndex: 2,

          px: {
            xs: 3,
            md: 8,
          },

          pt: {
            xs: 4,
            md: 5,
          },

          pb: 8,
        }}
      >

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {

              xs: "1fr",

              lg: "1.15fr 0.85fr",
            },

            gap: {
              xs: 6,
              md: 8,
            },

            alignItems: "center",
          }}
        >

          {/* LEFT SECTION */}

          <Box>

            {/* TAGS */}

            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              mb={4}
            >

              <Chip
                icon={
                  <Sparkles size={16} />
                }

                label="AI Security"

                sx={{
                  height: 40,

                  px: 1.5,

                  borderRadius: "999px",

                  bgcolor:
                  "rgba(59,130,246,0.12)",

                  border:
                  "1px solid rgba(96,165,250,0.18)",

                  color: "#93c5fd",

                  fontWeight: "bold",
                }}
              />

              

            </Stack>

            {/* HEADING */}

            <Typography
              sx={{
                fontSize: {
                  xs: "54px",
                  md: "92px",
                },

                fontWeight: 900,

                lineHeight: 0.95,

                letterSpacing: "-5px",

                mb: 4,
                mt: 2,

                background:
                `
                linear-gradient(
                  180deg,
                  #ffffff,
                  #94a3b8
                )
                `,

                WebkitBackgroundClip:
                "text",

                WebkitTextFillColor:
                "transparent",
              }}
            >

              Secure
              <br />

              Enterprise
              <br />

              AI Platform

            </Typography>

            {/* DESCRIPTION */}

            <Typography
              sx={{
                fontSize: "18px",

                color:
                "rgba(255,255,255,0.62)",

                lineHeight: 1.95,

                maxWidth: 760,

                mb: 5,
              }}
            >

              SecureRAG is a modern
              enterprise-grade AI platform
              built for secure conversations,
              intelligent compliance monitoring,
              MCP authorization,
              DLP protection,
              and real-time audit logging.

              <br /><br />

              Designed for organizations
              that need scalable,
              governed,
              and production-ready
              AI infrastructure with
              enterprise-level visibility
              and control.

            </Typography>

            {/* BUTTONS */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}

              spacing={3}
              mb={6}
            >

              <Button
                href="/signup"

                variant="contained"

                endIcon={
                  <ArrowRight size={18} />
                }

                sx={{

                  height: 60,

                  px: 4.5,

                  borderRadius: "20px",

                  textTransform: "none",

                  fontWeight: "bold",

                  fontSize: "16px",

                  background:
                  `
                  linear-gradient(
                    135deg,
                    #2563eb,
                    #7c3aed
                  )
                  `,

                  boxShadow:
                  "0 14px 40px rgba(59,130,246,0.35)",

                  "&:hover": {

                    background:
                    `
                    linear-gradient(
                      135deg,
                      #1d4ed8,
                      #6d28d9
                    )
                    `,
                  },
                }}
              >
                Signup Now
              </Button>

              

            </Stack>

            {/* STATS */}

            

          </Box>

          {/* LOGIN PANEL */}

          <Paper
            sx={{

              p: {
                xs: 4,
                md: 5,
              },

              borderRadius: "36px",

              background:
              "rgba(255,255,255,0.05)",

              backdropFilter:
              "blur(20px)",

              border:
              "1px solid rgba(255,255,255,0.08)",

              boxShadow:
              "0 20px 60px rgba(0,0,0,0.35)",

              position: "relative",

              overflow: "hidden",
            }}
          >

            {/* CARD GLOW */}

            <Box
              sx={{
                position: "absolute",
                width: 240,
                height: 240,

                borderRadius: "50%",

                bgcolor: "#2563eb",

                filter: "blur(120px)",

                opacity: 0.18,

                top: -80,
                right: -80,
              }}
            />

            {/* HEADER */}

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              mb={4}
            >

              <Avatar
                sx={{
                  width: 58,
                  height: 58,

                  background:
                  `
                  linear-gradient(
                    135deg,
                    #2563eb,
                    #7c3aed
                  )
                  `,

                  boxShadow:
                  "0 12px 30px rgba(59,130,246,0.35)",
                }}
              >

                <Bot size={26} />

              </Avatar>

              <Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  Login Now
                </Typography>

              

              </Box>

            </Stack>

            {/* EMAIL */}

            <Typography
              mb={1.2}
              mt={3}
              fontWeight="bold"
            >
              Email Address
            </Typography>

            <TextField
              fullWidth

              placeholder=
              "Enter your email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              sx={{

                mb: 3.5,

                "& .MuiOutlinedInput-root": {

                  height: 58,

                  borderRadius: "18px",

                  color: "white",

                  background:
                  "rgba(255,255,255,0.04)",

                  "& fieldset": {

                    borderColor:
                    "rgba(255,255,255,0.08)",
                  },

                  "&:hover fieldset": {

                    borderColor:
                    "rgba(255,255,255,0.16)",
                  },

                  "&.Mui-focused fieldset": {

                    borderColor:
                    "#2563eb",
                  },
                },
              }}

              InputProps={{
                startAdornment: (

                  <InputAdornment position="start">

                    <Mail
                      size={18}
                    />

                  </InputAdornment>
                ),
              }}
            />

            {/* PASSWORD */}

            <Typography
              mb={1.2}
              fontWeight="bold"
            >
              Password
            </Typography>

            <TextField
              fullWidth

              type="password"

              placeholder=
              "Enter your password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              sx={{

                "& .MuiOutlinedInput-root": {

                  height: 58,

                  borderRadius: "18px",

                  color: "white",

                  background:
                  "rgba(255,255,255,0.04)",

                  "& fieldset": {

                    borderColor:
                    "rgba(255,255,255,0.08)",
                  },

                  "&:hover fieldset": {

                    borderColor:
                    "rgba(255,255,255,0.16)",
                  },

                  "&.Mui-focused fieldset": {

                    borderColor:
                    "#2563eb",
                  },
                },
              }}

              InputProps={{
                startAdornment: (

                  <InputAdornment position="start">

                    <Lock
                      size={18}
                    />

                  </InputAdornment>
                ),
              }}
            />

            {/* BUTTON */}

            <Button
              fullWidth

              variant="contained"

              onClick={handleLogin}

              disabled={loading}

              endIcon={
                <ArrowRight size={18} />
              }

              sx={{

                mt: 4,

                height: 60,

                borderRadius: "20px",

                textTransform: "none",

                fontWeight: "bold",

                fontSize: "16px",

                background:
                `
                linear-gradient(
                  135deg,
                  #2563eb,
                  #7c3aed
                )
                `,

                boxShadow:
                "0 14px 40px rgba(59,130,246,0.35)",

                "&:hover": {

                  background:
                  `
                  linear-gradient(
                    135deg,
                    #1d4ed8,
                    #6d28d9
                  )
                  `,
                },
              }}
            >

              {
                loading
                ? "Signing In..."
                : "Login Securely"
              }

            </Button>

            <Divider
              sx={{
                my: 4,

                borderColor:
                "rgba(255,255,255,0.08)",
              }}
            />

            {/* FEATURES */}

            <Stack spacing={2.5}>

              {

                [

                  {
                    icon:
                    <Shield size={18} />,

                    text:
                    "Enterprise-grade AI security",
                  },

                  {
                    icon:
                    <CheckCircle2 size={18} />,

                    text:
                    "Real-time DLP protection",
                  },

                  {
                    icon:
                    <Globe size={18} />,

                    text:
                    "Modern MCP authorization",
                  },

                ].map((item, index) => (

                  <Stack
                    key={index}

                    direction="row"

                    spacing={2}

                    alignItems="center"
                  >

                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,

                        bgcolor:
                        "rgba(255,255,255,0.06)",

                        color: "#60a5fa",
                      }}
                    >

                      {item.icon}

                    </Avatar>

                    <Typography
                      color="rgba(255,255,255,0.68)"
                    >
                      {item.text}
                    </Typography>

                  </Stack>

                ))

              }

            </Stack>

          </Paper>

        </Box>

      </Box>

    </Box>

  );

}

export default Home;