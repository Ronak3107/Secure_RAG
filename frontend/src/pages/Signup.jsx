import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Stack,
  Avatar,
  InputAdornment,
  MenuItem,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/Person";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldMoonIcon from "@mui/icons-material/ShieldMoon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import API from "../services/api";

function Signup() {

  const [name, setName] =
  useState("");

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  const handleSignup = async () => {

    try {

      setLoading(true);

      const res =
      await API.post(
        "/auth/signup",
        {
          name,
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

      alert(
        "Signup failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#030712",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
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
          opacity: 0.22,
          top: -100,
          left: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          bgcolor: "#7c3aed",
          filter: "blur(180px)",
          opacity: 0.16,
          bottom: -100,
          right: -100,
        }}
      />

      {/* SIGNUP CARD */}

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 5,
          borderRadius: 6,

          bgcolor:
          "rgba(255,255,255,0.05)",

          border:
          "1px solid rgba(255,255,255,0.08)",

          backdropFilter:
          "blur(18px)",

          position: "relative",
          zIndex: 2,

          boxShadow:
          "0 25px 60px rgba(0,0,0,0.35)",
        }}
      >

        {/* LOGO */}

        <Stack
          alignItems="center"
          spacing={2}
          mb={5}
        >

          <Avatar
            sx={{
              width: 74,
              height: 74,
              bgcolor: "#2563eb",

              boxShadow:
              "0 10px 30px rgba(37,99,235,0.35)",
            }}
          >

            <ShieldMoonIcon
              sx={{
                fontSize: 38,
              }}
            />

          </Avatar>

          <Box textAlign="center">

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Create Account
            </Typography>

            <Typography
              color="#94a3b8"
              mt={1}
            >
              Join SecureRAG enterprise AI platform
            </Typography>

          </Box>

        </Stack>

        {/* NAME */}

        <Typography
          mb={1.2}
          fontWeight="bold"
        >
          Full Name
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter your name"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {

              borderRadius: 4,

              bgcolor:
              "rgba(255,255,255,0.03)",

              color: "white",

              "& fieldset": {
                borderColor:
                "rgba(255,255,255,0.08)",
              },

              "&:hover fieldset": {
                borderColor:
                "rgba(96,165,250,0.4)",
              },

              "&.Mui-focused fieldset": {
                borderColor:
                "#2563eb",
              },

            },

            input: {
              color: "white",
              py: 1.6,
            },

          }}

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon
                  sx={{
                    color: "#94a3b8",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        {/* EMAIL */}

        <Typography
          mb={1.2}
          fontWeight="bold"
        >
          Email Address
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter your email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {

              borderRadius: 4,

              bgcolor:
              "rgba(255,255,255,0.03)",

              color: "white",

              "& fieldset": {
                borderColor:
                "rgba(255,255,255,0.08)",
              },

              "&:hover fieldset": {
                borderColor:
                "rgba(96,165,250,0.4)",
              },

              "&.Mui-focused fieldset": {
                borderColor:
                "#2563eb",
              },

            },

            input: {
              color: "white",
              py: 1.6,
            },

          }}

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon
                  sx={{
                    color: "#94a3b8",
                  }}
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
          placeholder="Create password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {

              borderRadius: 4,

              bgcolor:
              "rgba(255,255,255,0.03)",

              color: "white",

              "& fieldset": {
                borderColor:
                "rgba(255,255,255,0.08)",
              },

              "&:hover fieldset": {
                borderColor:
                "rgba(96,165,250,0.4)",
              },

              "&.Mui-focused fieldset": {
                borderColor:
                "#2563eb",
              },

            },

            input: {
              color: "white",
              py: 1.6,
            },

          }}

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon
                  sx={{
                    color: "#94a3b8",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />


        {/* SIGNUP BUTTON */}

        <Button
          fullWidth
          variant="contained"

          onClick={handleSignup}

          disabled={loading}

          endIcon={
            <ArrowForwardIcon />
          }

          sx={{
            py: 1.8,
            borderRadius: 4,

            bgcolor: "#2563eb",

            textTransform: "none",

            fontWeight: "bold",

            fontSize: "1rem",

            boxShadow:
            "0 12px 30px rgba(37,99,235,0.35)",

            "&:hover": {
              bgcolor: "#1d4ed8",
            },
          }}
        >

          {
            loading
            ? "Creating Account..."
            : "Sign Up"
          }

        </Button>

        {/* FOOTER */}

        <Typography
          mt={4}
          textAlign="center"
          color="#94a3b8"
        >

          Already have an account?

          {" "}

          <Link
            href="/login"
            underline="none"
            sx={{
              color: "#60a5fa",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>

        </Typography>

      </Paper>

    </Box>

  );

}

export default Signup;