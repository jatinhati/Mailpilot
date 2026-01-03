This is a full-stack **AI Email Assistant** application that integrates a Spring Boot backend with a React frontend and a Chrome extension to help users generate and reply to emails intelligently.

Here is a comprehensive `README.md` file tailored for your repository.

---

# ✈️ Mailpilot

**Mailpilot** is an intelligent email assistant designed to streamline your communication. It uses AI to generate professional emails, draft smart replies, and refine your writing directly within your browser.

This repository contains the complete ecosystem for Mailpilot, including a robust **Spring Boot** backend, a modern **React** frontend, and a **Chrome Extension** for seamless integration with email clients (e.g., Gmail).

## 🌟 Features

* **AI-Powered Drafting**: Generate full emails from short prompts or keywords.
* **Smart Replies**: Context-aware reply suggestions (e.g., "Agree and suggest a time", "Politely decline").
* **Tone Adjustment**: Instantly rewrite emails to be more Professional, Friendly, or Concise.
* **Secure Backend**: API key management and request processing handled securely via Java Spring Boot.
* **Browser Extension**: Works directly inside your email client for a frictionless experience.

## 🛠️ Tech Stack

### **Backend**

* **Language**: Java 17+
* **Framework**: Spring Boot 3.x
* **Build Tool**: Maven
* **AI Integration**: WebClient / OpenAI API (or compatible LLM provider)

### **Frontend**

* **Library**: React.js
* **Styling**: CSS / Material UI (MUI)
* **Build Tool**: npm / Vite (inferred)

### **Extension**

* **Platform**: Chrome WebExtension (Manifest V3)
* **Communication**: Fetch API to connect with the local Spring Boot server

---

## 📂 Project Structure

| Directory | Description |
| --- | --- |
| **`Mailpilot-Backend`** | The Spring Boot server handling AI API calls and business logic. |
| **`Mailpilot-Frontend`** | The React web dashboard for user settings and history. |
| **`Mailpilot-Extension`** | The unpacked browser extension source code. |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

* **Java 17** or higher
* **Node.js** (v18+) and **npm**
* **Maven** (optional, if not using the distinct Maven wrapper)
* A valid API Key for your AI provider (e.g., OpenAI, Gemini, HuggingFace)

### 1️⃣ Backend Setup

1. Navigate to the backend directory:
```bash
cd Mailpilot-Backend

```


2. Configure your API keys in `src/main/resources/application.properties`:
```properties
spring.application.name=mailpilot
server.port=8080

# Example: OpenAI or Gemini API Key
gemini.api.key=YOUR_API_KEY_HERE
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent

```


3. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run

```


*The server should now be running on `http://localhost:8080`.*

### 2️⃣ Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd Mailpilot-Frontend

```


2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev
# or
npm start

```


*The UI should be accessible at `http://localhost:5173` (or 3000).*

### 3️⃣ Extension Installation

1. Open Chrome (or Edge/Brave) and go to `chrome://extensions`.
2. Toggle **Developer Mode** in the top right corner.
3. Click **Load unpacked**.
4. Select the **`Mailpilot-Extension`** folder from this repository.
5. Pin the extension to your toolbar.

---

## 📖 Usage Guide

1. **Start the Backend**: Ensure the Spring Boot server is running.
2. **Open Gmail**: Go to your email client.
3. **Activate Mailpilot**: Click the "Reply with AI" or "Help me write" button injected by the extension (or click the extension icon).
4. **Generate**: Enter a prompt (e.g., "Ask for a meeting next Tuesday") and click **Generate**.
5. **Insert**: The AI-drafted text will be inserted into your email compose box.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the UI or add support for more LLMs:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes.
4. Push to the branch and open a **Pull Request**.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

---

**Built with ❤️ by [Jatin Hati**](https://www.google.com/search?q=https://github.com/jatinhati)
