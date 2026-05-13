import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "AI Chat",
      path: "/chat",
      icon: <ChatBubbleIcon />,
    },
    {
      label: "Audit Logs",
      path: "/logs",
      icon: <HistoryEduIcon />,
    },
    {
      label: "Compliance",
      path: "/compliance",
      icon: <ShieldIcon />,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: "100%", md: 280 },
        minHeight: "100vh",
        bgcolor: "#050b18",
        color: "white",
        px: 3,
        py: 4,
        borderRight: "1px solid rgba(255,255,255,0.08)",
        position: { md: "sticky" },
        top: 0,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Avatar sx={{ bgcolor: "#22c55e", width: 48, height: 48 }}>
          SR
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            SecureRAG
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI security console
          </Typography>
        </Box>
      </Box>

      <List disablePadding sx={{ display: "grid", gap: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              bgcolor:
                location.pathname === item.path
                  ? "rgba(34,197,94,0.16)"
                  : "transparent",
              color: "white",
              px: 2,
              py: 1.5,
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

      <ListItemButton
        onClick={handleLogout}
        sx={{
          borderRadius: 2,
          color: "white",
          px: 2,
          py: 1.5,
          bgcolor: "rgba(239,68,68,0.08)",
          justifyContent: "flex-start",
        }}
      >
        <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  );
}

export default Sidebar;