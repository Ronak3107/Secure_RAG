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
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldMoonIcon from "@mui/icons-material/ShieldMoon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import API from "../services/api";

function Login() {

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

      alert(
        "Login Failed. Please check your credentials."
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

      {/* LOGIN CARD */}

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 460,
          p: 5,
          borderRadius: 6,
          bgcolor:
          "rgba(255,255,255,0.05)",

          border:
          "1px solid rgba(255,255,255,0.08)",

          backdropFilter: "blur(18px)",

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
          mb={4}
        >

          <Avatar
            sx={{
              width: 72,
              height: 72,
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

          <Box textAlign="center" mb={5}>

            <Typography
              variant="h4"
              fontWeight="bold"
              mb={5}
            >
              Login to SecureRAG
            </Typography>

            {/* <Typography
              color="#94a3b8"
              mt={1}
              lineHeight={1.7}
            >
              Login to your account.
            </Typography> */}

          </Box>

        </Stack>

        {/* EMAIL */}

        <Typography
          mb={1.5}
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
          mt={3}
          mb={1.5}
          fontWeight="bold"
        >
          Password
        </Typography>

        <TextField
          fullWidth
          type="password"
          placeholder="Enter your password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          sx={{

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

        {/* LOGIN BUTTON */}

        <Button
          fullWidth
          variant="contained"

          onClick={handleLogin}

          disabled={loading}

          endIcon={
            <ArrowForwardIcon />
          }

          sx={{
            mt: 4,
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
            ? "Signing In..."
            : "Login"
          }

        </Button>

        {/* FOOTER */}

        <Typography
          mt={4}
          textAlign="center"
          color="#94a3b8"
        >

          
          Don&apos;t have an account?

          {" "}

          <Link
            href="/signup"
            underline="none"
            sx={{
              color: "#60a5fa",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>

        </Typography>

      </Paper>

    </Box>

  );

}

export default Login;