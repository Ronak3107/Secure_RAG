import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import API from "../services/api";

function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello Ronak 👋 Secure AI Assistant Ready.",
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/chat/history", {
        headers: {
          Authorization: token,
        },
      });

      const formattedChats = res.data.map((chat) => ({
        sender: chat.sender,
        text: chat.text,
      }));

      setMessages(formattedChats);
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

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
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
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "AI request failed. Please try again.",
        },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto", display: "grid", gap: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Secure AI Chat
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Ask questions, receive secure responses, and keep every conversation audit-ready.
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 0,
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "grid",
            minHeight: 600,
          }}
        >
          <Box
            sx={{
              p: 3,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              Chat session
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setMessages([])}
              sx={{ color: "#94a3b8", borderColor: "rgba(255,255,255,0.12)" }}
            >
              Clear
            </Button>
          </Box>

          <Box
            sx={{
              p: 3,
              display: "grid",
              gap: 2,
              flex: 1,
              minHeight: 420,
              maxHeight: 520,
              overflowY: "auto",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 2.5,
                    maxWidth: "70%",
                    borderRadius: 3,
                    bgcolor: msg.sender === "user" ? "#2563eb" : "#111827",
                    color: "white",
                    boxShadow: msg.sender === "user" ? "0 12px 30px rgba(37,99,235,0.24)" : "0 12px 30px rgba(0,0,0,0.16)",
                  }}
                >
                  <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
                    {msg.text}
                  </Typography>
                </Paper>
              </Box>
            ))}

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <CircularProgress color="primary" />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 3,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="Ask securely..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                bgcolor: "#0b1223",
                borderRadius: 3,
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSend}
              sx={{ minWidth: 140, py: 1.75 }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Chat;