import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";

import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Login Failed. Please check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
        py: 5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome back
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Sign in to access your secure AI dashboard and chat.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ bgcolor: "#0b1223", borderRadius: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ bgcolor: "#0b1223", borderRadius: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.5 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography mt={3} variant="body2" color="text.secondary" align="center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" color="primary.main" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;