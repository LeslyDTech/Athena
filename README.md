# Athena 🏛️
 
A Greek-themed local AI chat interface built with React, powered by Ollama. Run your own AI completely offline — no subscriptions, no data sharing, just you and your models.
 
---
 
## Prerequisites
 
Before running Athena, make sure you have the following installed:
 
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Ollama](https://ollama.com/download) (for running local AI models)
- A pulled Ollama model (e.g. `qwen2.5-coder`, `llama3`, etc.)
---
 
## Setup
 
### 1. Clone or download the project
 
```bash
git clone https://github.com/LeslyDTech/athena.git
cd athena
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Install Ollama
 
Download and install Ollama from [https://ollama.com/download](https://ollama.com/download).
 
Then pull a model:
 
```bash
ollama pull qwen2.5-coder
```
 
Or any other model you prefer:
 
```bash
ollama pull llama3
ollama pull mistral
```
 
### 4. Start Ollama
 
Ollama runs as a background service. On Windows it starts automatically after install. You can verify it's running with:
 
```bash
ollama list
```
 
If it's not running:
 
```bash
ollama serve
```
 
### 5. Configure your model
 
In `src/App.js`, find this line and change the model name to match what you have installed:
 
```javascript
model: "qwen2.5-coder",
```
 
### 6. Start Athena
 
```bash
npm start
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---
 
## Features
 
- 💬 **Chat** — Talk to your local AI model in real time
- 📜 **Chat History** — Previous chats are saved in the sidebar for the session
- ➕ **New Chat** — Start a fresh conversation at any time
- 📝 **Markdown Rendering** — AI responses render with proper formatting, code blocks, and headers
- 🏛️ **Greek Theme** — Deep navy background with gold accents, Cinzel and Philosopher fonts
- 🔒 **Fully Local** — No data ever leaves your machine
---
 
## Project Structure
 
```
athena/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── greek_Logo.png
│   │   ├── Athena_user_img.png
│   │   ├── add-30.png
│   │   ├── message.svg
│   │   ├── g_home.png
│   │   └── greek_column_bookmark.png
│   ├── App.js
│   ├── theme.css
│   └── index.js
└── package.json
```
 
---
 
## How to Use
 
1. **Start a conversation** — Type your message in the input box at the bottom and press Enter or click the send button
2. **New chat** — Click the **+ New Chat** button in the sidebar to start fresh
3. **Resume a chat** — Click any previous chat title in the sidebar to load it
4. **Keyboard shortcut** — Press `Enter` to send, `Shift+Enter` for a new line
---
 
## Switching Models
 
To use a different AI model, first pull it with Ollama:
 
```bash
ollama pull llama3
```
 
Then update `src/App.js`:
 
```javascript
model: "llama3",
```
 
---
 
## Built With
 
- [React](https://react.dev/)
- [Ollama](https://ollama.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [Google Fonts — Cinzel & Philosopher](https://fonts.google.com/)
---
 
## Inspired By
 
- [ChatGPT](https://chatgpt.com/) — UI layout reference
- [Odysseus by PewDiePie](https://pewdiepie-archdaemon.github.io/odysseus/) — Self-hosted AI workspace inspiration
- [NetworkChuck](https://www.youtube.com/@NetworkChuck) — Local AI hosting tutorial
---
 
*Built by LeslyDTech* 🏛️
 
