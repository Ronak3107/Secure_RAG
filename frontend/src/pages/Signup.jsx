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

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Signup failed. Please try again.");
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
          maxWidth: 460,
          p: 5,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Create your account
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Start using secure AI, DLP, and compliance monitoring in one place.
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ bgcolor: "#0b1223", borderRadius: 2 }}
        />

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
          onClick={handleSignup}
        >
          Sign up
        </Button>

        <Typography mt={3} variant="body2" color="text.secondary" align="center">
          Already have an account?{' '}
          <Link href="/login" color="primary.main" underline="hover">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signup;