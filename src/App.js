import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from "rehype-sanitize";
import "./theme.css";
import athenaLogo from './assets/greek_Logo.png';
import addIcon from './assets/add-30.png';
import messageIcon from './assets/message.svg';
import homeIcon from './assets/g_home.png';
import bookmarkIcon from './assets/greek_column_bookmark.png';
import userAvatar from './assets/Athena_user_img.png';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    if (activeChatId === null) {
      const newId = Date.now();
      setActiveChatId(newId);
      setChats(prev => [{ id: newId, title: input.slice(0, 30), messages: updatedMessages }, ...prev]);
    } else {
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: updatedMessages } : c));
    }

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:11434";
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5-coder",
          messages: updatedMessages,
          stream: false,
        }),
      });

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.message.content };
      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: finalMessages } : c));
    } catch (error) {
      setMessages([...updatedMessages, { role: "assistant", content: "Error connecting to Ollama. Make sure it's running." }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
    setActiveChatId(null);
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setActiveChatId(chat.id);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSideBar">
          <div className="upperSideBarTop">
            <img src={athenaLogo} alt="" className="logo" />
            <span className="brand">Athena</span>
          </div>
          <button className="middleButton" onClick={newChat}>
            <img src={addIcon} alt="" className="addButton" />New Chat
          </button>
          <div className="upperSideBarBottom">
            {chats.map(chat => (
              <button key={chat.id} className="queryButton" onClick={() => loadChat(chat)}>
                <img src={messageIcon} alt="Chat" />{chat.title}
              </button>
            ))}
          </div>
        </div>
        <div className="lowerSideBar">
          <div className="listItems"><img src={homeIcon} alt="Home" />Home</div>
          <div className="listItems"><img src={bookmarkIcon} alt="Saved" />Saved</div>
        </div>
      </div>

      <div className="main">
        <div className="chatContainer">
          {messages.length === 0 && (
            <div className="welcome">
              <img src={athenaLogo} alt="Welcome" className="welcomeLogo" />
              <h1>How can I help you today?</h1>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.role === "assistant" && (
                <img src={userAvatar} alt="Athena" className="avatarIcon" />
          )}
            <div className="messageContent">
              {msg.role === "assistant" ? (
                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                  {msg.content}
                </ReactMarkdown>
            ) : (
              msg.content
          )}
        </div>
      </div>
          ))}
          {loading && (
            <div className="message assistant">
              <img src={userAvatar} alt="Athena" className="avatarIcon" />
              <div className="messageContent typing">Athena is thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="inputContainer">
          <textarea
            className="chatInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Athena anything..."
            rows={1}
          />
          <button className="sendButton" onClick={sendMessage} disabled={loading}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;