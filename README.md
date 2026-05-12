# SecureRAG 🔐🤖

SecureRAG is an AI-powered secure document retrieval and enterprise security platform built using the MERN stack. The project combines AI chat capabilities with cybersecurity concepts such as Role-Based Access Control (RBAC), Data Loss Prevention (DLP), audit logging, and secure document querying.

---

# 🚀 Features

## 🔑 Authentication & Authorization

* JWT-based authentication
* Login & Signup system
* Protected routes
* Role-based access control (Admin & Guest)

## 🤖 AI Chat System

* AI-powered secure chatbot
* Groq API integration
* Enterprise-style AI assistant
* Secure prompt handling

## 🛡️ Security Features

* MCP (Model Context Protocol) access control
* Sensitive query blocking
* Data Loss Prevention (DLP)
* Phone number masking
* Audit logging system

## 📄 RAG (Retrieval-Augmented Generation)

* Upload documents
* Store document context
* Ask AI questions from uploaded files
* Context-aware AI responses

## 📊 Dashboard Analytics

* Queries processed
* Threats blocked
* Compliance score
* Security analytics

## 📁 Chat Features

* Chat history
* Persistent conversations
* Real-time AI responses

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Material UI
* Axios
* React Router DOM
* Recharts

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

## AI

* Groq API
* Llama Models

---

# 📂 Project Structure

```bash
btech-project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Ronak3107/secure-rag-ai.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

---

# ▶️ Run Project

## Start Backend

```bash
cd backend
node server.js
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🧪 Testing

## Guest Testing

* Sensitive queries should be blocked
* Restricted access to secure data
* DLP masking enabled

## Admin Testing

* Full AI access
* Access audit logs
* Upload and analyze documents
* Dashboard analytics access

---

# 📸 Screenshots

Add screenshots here:

* Login Page
* Dashboard
* AI Chat
* Audit Logs
* File Upload
* Analytics

---

# 🔮 Future Scope

* Vector Database Integration
* LangChain Integration
* Multi-document Retrieval
* Real-time Threat Detection
* AI Compliance Monitoring
* Enterprise Deployment

---

# 👨‍💻 Author

Ronak Sharma

---

# 📜 License

This project is developed for educational and academic purposes.
