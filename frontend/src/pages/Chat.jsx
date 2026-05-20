import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  Send,
  Shield,
  Bot,
  User,
  Sparkles,
  Trash2,
  Zap,
  Lock,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import API from "../services/api";

function Chat() {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const [input, setInput] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  const [messages, setMessages] =
  useState([
    {
      sender: "ai",
      text:
      `Hey ${user?.name} 👋

Welcome to SecureRAG AI.

Your enterprise-grade secure AI workspace is now active.`,
    },
  ]);

  const messagesEndRef =
  useRef(null);

  const scrollToBottom = () => {

    messagesEndRef.current
    ?.scrollIntoView({
      behavior: "smooth",
    });

  };

  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const token =
      localStorage.getItem("token");

      const res =
      await API.get(

        "/chat/history",

        {
          headers: {
            Authorization: token,
          },
        }

      );

      const formattedChats =
      res.data.map((chat) => ({

        sender: chat.sender,
        text: chat.text,

      }));

      if (formattedChats.length > 0) {

        setMessages(formattedChats);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleSend = async () => {

    if (!input.trim()) return;

    const userMessage = {

      sender: "user",
      text: input,

    };

    setMessages((prev) => [

      ...prev,
      userMessage,

    ]);

    setLoading(true);

    try {

      const token =
      localStorage.getItem("token");

      const res =
      await API.post(

        "/ai/chat",

        {
          message: input,
        },

        {
          headers: {
            Authorization: token,
          },
        }

      );

      const aiMessage = {

        sender: "ai",

        text:
        res.data.reply,

      };

      setMessages((prev) => [

        ...prev,
        aiMessage,

      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [

        ...prev,

        {
          sender: "ai",

          text:
          "Secure AI request failed. Please try again.",
        },

      ]);

    }

    setLoading(false);

    setInput("");

  };

  return (

    <Box
      sx={{

        display: "flex",

        height: "100vh",

        overflow: "hidden",

        background:
        `
        radial-gradient(
          circle at top left,
          rgba(37,99,235,0.22),
          transparent 30%
        ),

        radial-gradient(
          circle at bottom right,
          rgba(124,58,237,0.18),
          transparent 30%
        ),

        #020617
        `,
      }}
    >

      {/* SIDEBAR */}

      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: "4px",
          },

          "&::-webkit-scrollbar-thumb": {
            background:
            "rgba(255,255,255,0.12)",
            borderRadius: "20px",
          },
        }}
      >
        <Sidebar />
      </Box>

      {/* MAIN AREA */}

      <Box
        sx={{

          flex: 1,

          p: {
            xs: 1.5,
            md: 2,
          },

          display: "flex",

          flexDirection: "column",

          height: "100vh",

          overflow: "hidden",
        }}
      >

        {/* TOP HERO */}

        <Paper
          sx={{

            position: "relative",

            overflow: "hidden",

            p: 3,

            borderRadius: "30px",

            mb: 1.5,

            flexShrink: 0,

            background:
            `
            linear-gradient(
              135deg,
              rgba(37,99,235,0.22),
              rgba(124,58,237,0.16)
            )
            `,

            backdropFilter:
            "blur(20px)",

            border:
            "1px solid rgba(255,255,255,0.08)",

            boxShadow:
            "0 10px 40px rgba(0,0,0,0.35)",
          }}
        >

          {/* GLOW */}

          <Box
            sx={{
              position: "absolute",
              width: 250,
              height: 250,

              borderRadius: "50%",

              background:
              "rgba(59,130,246,0.18)",

              filter: "blur(90px)",

              top: -120,
              right: -80,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >

            <Box zIndex={2}>

              <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
              >
                Secure AI Workspace
              </Typography>


              <Stack
                direction="row"
                spacing={1.5}
                mt={4}
                flexWrap="wrap"
              >

                <Chip
                  icon={
                    <Shield size={15} />
                  }
                  label="Protected"
                  sx={{
                    bgcolor:
                    "rgba(34,197,94,0.12)",
                    color: "#22c55e",
                    fontWeight: "bold",
                  }}
                />

                <Chip
                  icon={
                    <Lock size={15} />
                  }
                  label="Encrypted"
                  sx={{
                    bgcolor:
                    "rgba(59,130,246,0.12)",
                    color: "#60a5fa",
                    fontWeight: "bold",
                  }}
                />

                <Chip
                  icon={
                    <Zap size={15} />
                  }
                  label="Real-time AI"
                  sx={{
                    bgcolor:
                    "rgba(168,85,247,0.12)",
                    color: "#c084fc",
                    fontWeight: "bold",
                  }}
                />

              </Stack>

            </Box>

          </Stack>

        </Paper>

        {/* CHAT WINDOW */}

        <Paper
          sx={{

            flex: 1,

            minHeight: 0,

            display: "flex",

            flexDirection: "column",

            overflow: "hidden",

            borderRadius: "32px",

            background:
            "rgba(255,255,255,0.05)",

            backdropFilter:
            "blur(20px)",

            border:
            "1px solid rgba(255,255,255,0.08)",

            boxShadow:
            "0 10px 40px rgba(0,0,0,0.35)",
          }}
        >

          {/* CHAT HEADER */}

          <Box
            sx={{

              px: 3,
              py: 2.2,

              display: "flex",

              justifyContent:
              "space-between",

              alignItems: "center",

              borderBottom:
              "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  background:
                  `
                  linear-gradient(
                    135deg,
                    #2563eb,
                    #7c3aed
                  )
                  `,
                }}
              >
                <Sparkles size={18} />
              </Avatar>

              <Box>

                <Typography
                  fontWeight="bold"
                >
                  Secure Assistant
                </Typography>

                <Typography
                  fontSize="13px"
                  color="rgba(255,255,255,0.55)"
                >
                  AI session active
                </Typography>

              </Box>

            </Stack>

            <Tooltip title="Clear Chat">

              <IconButton

                onClick={() =>
                  setMessages([])
                }

                sx={{

                  bgcolor:
                  "rgba(255,255,255,0.04)",

                  color: "white",

                  "&:hover": {

                    bgcolor:
                    "rgba(255,255,255,0.08)",
                  },
                }}
              >

                <Trash2 size={18} />

              </IconButton>

            </Tooltip>

          </Box>

          {/* MESSAGES */}

          <Box
            sx={{

              flex: 1,

              minHeight: 0,

              overflowY: "auto",

              px: {
                xs: 2,
                md: 5,
              },

              py: 4,

              display: "flex",

              flexDirection: "column",

              gap: 3,

              scrollBehavior: "smooth",

              "&::-webkit-scrollbar": {
                width: "7px",
              },

              "&::-webkit-scrollbar-thumb": {
                background:
                "rgba(255,255,255,0.12)",

                borderRadius: "20px",
              },
            }}
          >

            {

              messages.map((msg, index) => (

                <Box

                  key={index}

                  sx={{

                    display: "flex",

                    justifyContent:

                    msg.sender === "user"

                    ? "flex-end"

                    : "flex-start",
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={2}

                    sx={{
                      maxWidth: {
                        xs: "100%",
                        md: "78%",
                      },
                    }}
                  >

                    {

                      msg.sender === "ai"

                      &&

                      <Avatar
                        sx={{

                          width: 42,
                          height: 42,

                          bgcolor:
                          "rgba(255,255,255,0.08)",
                        }}
                      >
                        <Bot size={18} />
                      </Avatar>

                    }

                    <Paper
                      sx={{

                        p: 2.5,

                        borderRadius:

                        msg.sender === "user"

                        ? "26px 26px 8px 26px"

                        : "26px 26px 26px 8px",

                        background:

                        msg.sender === "user"

                        ? `
                        linear-gradient(
                          135deg,
                          #2563eb,
                          #7c3aed
                        )
                        `

                        : "rgba(255,255,255,0.05)",

                        color: "white",

                        border:

                        msg.sender === "ai"

                        ? "1px solid rgba(255,255,255,0.06)"

                        : "none",

                        boxShadow:

                        msg.sender === "user"

                        ? "0 14px 35px rgba(37,99,235,0.35)"

                        : "0 10px 30px rgba(0,0,0,0.25)",
                      }}
                    >

                      <Typography
                        sx={{
                          whiteSpace:
                          "pre-line",

                          lineHeight: 1.9,

                          fontSize: "15px",
                        }}
                      >
                        {msg.text}
                      </Typography>

                    </Paper>

                    {

                      msg.sender === "user"

                      &&

                      <Avatar
                        sx={{

                          width: 42,
                          height: 42,

                          background:
                          `
                          linear-gradient(
                            135deg,
                            #2563eb,
                            #7c3aed
                          )
                          `,
                        }}
                      >
                        <User size={18} />
                      </Avatar>

                    }

                  </Stack>

                </Box>

              ))

            }

            {

              loading && (

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 3,
                  }}
                >

                  <CircularProgress />

                </Box>

              )

            }

            <div ref={messagesEndRef} />

          </Box>

          {/* INPUT */}

          <Box
            sx={{

              p: 2.5,

              borderTop:
              "1px solid rgba(255,255,255,0.08)",

              display: "flex",

              alignItems: "flex-end",

              gap: 2,

              background:
              "rgba(255,255,255,0.02)",
            }}
          >

            <TextField

              fullWidth

              multiline

              maxRows={5}

              placeholder=
              "Message Secure AI..."

              value={input}

              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }

              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                  &&
                  !e.shiftKey
                ) {

                  e.preventDefault();

                  handleSend();

                }

              }}

              sx={{

                "& .MuiOutlinedInput-root": {

                  borderRadius: "22px",

                  color: "white",

                  px: 1,

                  background:
                  "rgba(255,255,255,0.04)",

                  backdropFilter:
                  "blur(10px)",

                  "& fieldset": {

                    borderColor:
                    "rgba(255,255,255,0.08)",
                  },

                  "&:hover fieldset": {

                    borderColor:
                    "rgba(255,255,255,0.18)",
                  },

                  "&.Mui-focused fieldset": {

                    borderColor:
                    "#3b82f6",
                  },
                },
              }}
            />

            <Button

              variant="contained"

              onClick={handleSend}

              disabled={loading}

              sx={{

                minWidth: 64,

                width: 64,

                height: 64,

                borderRadius: "20px",

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

                transition: "0.25s",

                "&:hover": {

                  transform:
                  "translateY(-2px)",

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

              <Send size={22} />

            </Button>

          </Box>

        </Paper>

      </Box>

    </Box>

  );

}

export default Chat;