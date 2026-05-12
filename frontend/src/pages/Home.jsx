import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import InsightsIcon from "@mui/icons-material/Insights";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 6,
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            SecureRAG
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button variant="outlined" color="secondary" size="small" href="/login">
              Login
            </Button>
            <Button variant="contained" href="/signup" size="small">
              Sign up
            </Button>
          </Box>
        </Box>

        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 520 }}>
              <Typography variant="h2" fontWeight="bold" mb={3}>
                Secure AI with modern compliance and chat.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                Build secure conversational AI experiences with a clean interface, smart compliance checks,
                and enterprise-grade audit visibility.
              </Typography>

              <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                <Button variant="contained" size="large" href="/signup">
                  Get Started
                </Button>
                <Button variant="outlined" size="large" href="/dashboard">
                  View Dashboard
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(14px)",
              }}
            >
              <Typography variant="h6" mb={2}>
                Modern secure AI workspace
              </Typography>
              <Box sx={{ display: "grid", gap: 3 }}>
                <Chip
                  icon={<SecurityIcon />}
                  label="Compliance-first security"
                  variant="filled"
                  color="primary"
                  sx={{ justifyContent: "flex-start" }}
                />
                <Chip
                  icon={<ChatBubbleOutlineIcon />}
                  label="Conversational assistant"
                  variant="filled"
                  color="secondary"
                  sx={{ justifyContent: "flex-start" }}
                />
                <Chip
                  icon={<InsightsIcon />}
                  label="Live analytics & audit logs"
                  variant="filled"
                  color="success"
                  sx={{ justifyContent: "flex-start" }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <AutoAwesomeIcon color="secondary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Intelligent AI
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Ask secure AI questions, process sensitive data safely, and track results in a modern layout.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <SecurityIcon color="success" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Compliance-first
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Manage access, audit logs, and DLP filtering with an intuitive interface.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <ChatBubbleOutlineIcon color="info" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Chat interface
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Conversations are saved securely and displayed in a sleek, modern layout.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;