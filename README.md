# 🚀 Lead Management Automation System

A modern full-stack CRM (Customer Relationship Management) application that enables sales teams to manage leads efficiently through a Kanban workflow while automating notifications and business processes using n8n.

---

## 📖 Overview

The **Lead Management Automation System** replaces traditional spreadsheet-based lead tracking with a centralized dashboard that allows teams to:

- Capture and manage leads
- Organize leads using a Kanban board
- Assign leads to team members
- Automate workflows using n8n
- Send email notifications automatically
- Monitor workflow execution from within the application

This project was developed during a **5-week Full Stack Development Internship**.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login
- JWT Authentication
- Password Encryption using bcrypt

### 📋 Lead Management
- Create Leads
- Edit & Delete Leads
- Search Leads
- Filter Leads
- Assign Leads to Team Members

### 📌 Kanban Board
- Drag & Drop Lead Cards
- Four Pipeline Stages:
  - New
  - Contacted
  - In Progress
  - Closed

### 🤖 Automation
- n8n Workflow Integration
- Trigger Workflows from Dashboard
- Activate/Deactivate Workflows
- View Execution Logs
- Workflow Status Monitoring

### 📧 Email Automation
- Automatic Gmail Notification on New Lead
- OAuth2 Authentication
- Nodemailer Integration

### 👥 Team Management
- Add Team Members
- Lead Assignment
- Workload Distribution

### 📊 Dashboard & Analytics
- Lead Statistics
- Pipeline Overview
- Activity Feed
- Performance Metrics

### ⚙️ Settings
- Notification Preferences
- Application Configuration

---

# 🛠 Tech Stack

## Frontend
- React 18
- Vite
- Axios
- JavaScript (JSX)

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT
- bcryptjs

## Automation
- n8n
- REST API
- Webhooks

## Email
- Nodemailer
- Gmail API (OAuth2)

## Validation
- express-validator

## Version Control
- Git
- GitHub

---

# 📂 Project Structure

```
Lead-Management-System/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   └── utils/
│
├── package.json
├── README.md
└── .env
```

---

# ⚡ Workflow

```text
User
   │
   ▼
React Frontend
   │
Axios REST API
   │
Express Backend
   │
 ┌──────────────┬──────────────┐
 ▼              ▼              ▼
MongoDB      Gmail API      n8n Webhook
                 │              │
                 ▼              ▼
      Email Notification   Automation Workflow
```

---

# 🔑 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
GMAIL_USER=your_email@gmail.com

N8N_API_KEY=your_n8n_api_key
N8N_BASE_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook/lead
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/lead-management-system.git

cd lead-management-system
```

---

## Install Backend

```bash
cd server

npm install
```

---

## Install Frontend

```bash
cd client

npm install
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
npm run dev
```

---

# 📷 Main Modules

- Dashboard
- Lead Management
- Kanban Board
- Automation
- Analytics
- Team Management
- Settings
- Authentication

---

# 📊 System Architecture

```
React + Vite
      │
      ▼
Express REST API
      │
      ▼
MongoDB
      │
      ├──────── Gmail API
      │
      └──────── n8n Webhooks
```

---

# 🔄 Automation Flow

1. User creates a Lead.
2. Lead is stored in MongoDB.
3. Gmail notification is sent automatically.
4. Lead data is posted to n8n.
5. n8n triggers configured workflows.
6. Workflow status is visible inside the Automation Dashboard.

---

# 🧪 Testing

The application was tested using:

- API Testing
- Manual UI Testing
- Authentication Testing
- Gmail Integration Testing
- n8n Workflow Testing
- Validation Testing

---

# 🚀 Future Improvements

- TypeScript Migration
- Socket.IO Real-time Updates
- Docker Support
- CI/CD Pipeline
- Role-Based Access Control
- Advanced Analytics
- Unit Testing (Jest)
- Integration Testing
- Tailwind CSS Migration

---

# 📚 Learning Outcomes

This project demonstrates practical experience in:

- Full Stack Development
- REST API Development
- JWT Authentication
- MongoDB Database Design
- Workflow Automation
- Third-Party API Integration
- React State Management
- CRM System Design

---

# 👨‍💻 Author

**Rupesh Mahakud**

Full Stack Developer

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

# 📄 License

This project is developed for educational and internship purposes.
Feel free to fork, learn, and improve it.

---

⭐ If you found this project helpful, don't forget to give it a star on GitHub!
