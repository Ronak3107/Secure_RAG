import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShieldIcon from "@mui/icons-material/Shield";

import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

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
        width: 300,
        minHeight: "100vh",

        background:
        `
        linear-gradient(
          180deg,
          rgba(15,23,42,0.98),
          rgba(2,6,23,1)
        )
        `,

        color: "white",

        px: 3,
        py: 4,

        borderRight:
        "1px solid rgba(255,255,255,0.08)",

        backdropFilter: "blur(20px)",

        position: "sticky",
        top: 0,

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        boxShadow:
        "10px 0px 40px rgba(0,0,0,0.35)",
      }}
    >

      {/* TOP */}

      <Box>

        {/* LOGO */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 5,
          }}
        >

          <Avatar
            sx={{
              width: 60,
              height: 60,

              background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",

              fontWeight: "bold",
              fontSize: 22,

              boxShadow:
              "0 10px 30px rgba(59,130,246,0.35)",
            }}
          >
            SR
          </Avatar>

          <Box>

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              SecureRAG
            </Typography>

            <Typography
              sx={{
                color:
                "rgba(255,255,255,0.55)",

                mt: 0.5,
              }}
            >
              Enterprise AI Security
            </Typography>

          </Box>

        </Box>

        {/* USER CARD */}

        <Box
          sx={{
            p: 3,
            mb: 4,

            borderRadius: "24px",

            background:
            "rgba(255,255,255,0.05)",

            backdropFilter: "blur(12px)",

            border:
            "1px solid rgba(255,255,255,0.08)",
          }}
        >

          <Typography
            color="rgba(255,255,255,0.5)"
            fontSize="13px"
          >
            LOGGED IN AS
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            mt={1}
          >
            {user?.name}
          </Typography>

          <Typography
            sx={{
              color:
              "rgba(255,255,255,0.55)",

              fontSize: "14px",
              mt: 0.5,

              wordBreak: "break-word",
            }}
          >
            {user?.email}
          </Typography>

          <Chip
            label={user?.role}
            sx={{
              mt: 2,

              textTransform: "capitalize",

              fontWeight: "bold",

              bgcolor:
              user?.role === "admin"
              ? "rgba(34,197,94,0.15)"
              : user?.role === "analyst"
              ? "rgba(59,130,246,0.15)"
              : "rgba(239,68,68,0.15)",

              color:
              user?.role === "admin"
              ? "#22c55e"
              : user?.role === "analyst"
              ? "#3b82f6"
              : "#ef4444",
            }}
          />

        </Box>

        {/* NAVIGATION */}

        <List
          disablePadding
          sx={{
            display: "grid",
            gap: 1.5,
          }}
        >

          {

            navItems.map((item) => (

              <ListItemButton

                key={item.path}

                component={RouterLink}

                to={item.path}

                selected={
                  location.pathname === item.path
                }

                sx={{

                  borderRadius: "18px",

                  px: 2.5,
                  py: 1.7,

                  transition: "0.25s",

                  color: "white",

                  bgcolor:

                  location.pathname === item.path

                  ? "rgba(59,130,246,0.16)"

                  : "transparent",

                  border:

                  location.pathname === item.path

                  ? "1px solid rgba(59,130,246,0.25)"

                  : "1px solid transparent",

                  "&:hover": {

                    bgcolor:
                    "rgba(255,255,255,0.06)",

                    transform:
                    "translateX(5px)",
                  },

                  "&.Mui-selected": {

                    boxShadow:
                    "0 10px 25px rgba(59,130,246,0.15)",
                  },
                }}
              >

                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 42,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}

                  primaryTypographyProps={{

                    fontWeight:
                    location.pathname === item.path
                    ? "bold"
                    : 500,
                  }}
                />

              </ListItemButton>

            ))

          }

        </List>

      </Box>

      {/* BOTTOM */}

      <Box>

        <Divider
          sx={{
            borderColor:
            "rgba(255,255,255,0.08)",

            mb: 3,
          }}
        />

        <ListItemButton

          onClick={handleLogout}

          sx={{

            borderRadius: "18px",

            px: 2.5,
            py: 1.7,

            bgcolor:
            "rgba(239,68,68,0.10)",

            color: "#ef4444",

            transition: "0.25s",

            "&:hover": {

              bgcolor:
              "rgba(239,68,68,0.18)",

              transform:
              "translateX(5px)",
            },
          }}
        >

          <ListItemIcon
            sx={{
              color: "inherit",
              minWidth: 42,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"

            primaryTypographyProps={{
              fontWeight: "bold",
            }}
          />

        </ListItemButton>

      </Box>

    </Box>

  );

}

export default Sidebar;