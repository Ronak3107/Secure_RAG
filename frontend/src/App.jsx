import { Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Logs from "./pages/Logs";
import Compliance from "./pages/Compliance";

import ProtectedRoute from "./routes/ProtectedRoute";

const theme = createTheme({

  palette: {

    mode: "dark",

    primary: {
      main: "#3b82f6",
    },

    secondary: {
      main: "#8b5cf6",
    },

    background: {
      default: "#030712",
      paper: "rgba(255,255,255,0.04)",
    },

    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },

  },

  typography: {

    fontFamily: [
      "Inter",
      "Poppins",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },

  },

  shape: {
    borderRadius: 18,
  },

  components: {

    MuiCssBaseline: {

      styleOverrides: {

        body: {
          background:
            "linear-gradient(to bottom right, #030712, #0f172a)",
          minHeight: "100vh",
          overflowX: "hidden",
        },

        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },

        "*::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.12)",
          borderRadius: "20px",
        },

      },

    },

    MuiPaper: {

      styleOverrides: {

        root: {

          backgroundImage: "none",

          backdropFilter: "blur(18px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.25)",

        },

      },

    },

    MuiButton: {

      styleOverrides: {

        root: {

          borderRadius: 14,
          paddingInline: 22,
          paddingBlock: 12,

        },

        contained: {

          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",

          boxShadow:
            "0 12px 30px rgba(37,99,235,0.35)",

          "&:hover": {

            background:
              "linear-gradient(135deg,#1d4ed8,#6d28d9)",

          },

        },

      },

    },

    MuiTextField: {

      styleOverrides: {

        root: {

          "& .MuiOutlinedInput-root": {

            borderRadius: 16,
            background:
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

              borderColor: "#3b82f6",

            },

          },

          "& .MuiInputLabel-root": {
            color: "#94a3b8",
          },

        },

      },

    },

    MuiChip: {

      styleOverrides: {

        root: {

          borderRadius: 12,
          fontWeight: 600,

        },

      },

    },

  },

});

function App() {

  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <Compliance />
            </ProtectedRoute>
          }
        />

      </Routes>

    </ThemeProvider>

  );

}

export default App;