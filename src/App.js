import React, { useState } from "react";

// كشف اللغة تلقائي (بسيط جدًا)
const detectLanguage = (text) => {
  const arabic = /[\u0600-\u06FF]/;
  return arabic.test(text) ? "ar" : "en";
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");

  const handleSend = () => {
    if (!input.trim()) return;

    // تحديد اللغة أول مرة
    if (messages.length === 0) {
      setLang(detectLanguage(input));
    }

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // رد بسيط حسب اللغة
    let botReply = "";
    if (lang === "ar") {
      botReply = "تذكر أن تأخذ نفسًا عميقًا 🌿، كل شيء سيكون بخير.";
    } else {
      botReply = "Remember to take a deep breath 🌿, everything will be okay.";
    }

    const botMessage = { text: botReply, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Calm Companion</h1>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#4a90e2" : "#e0e0e0",
              color: msg.sender === "user" ? "white" : "black",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === "ar" ? "اكتب رسالتك..." : "Type your message..."}
        />
        <button style={styles.button} onClick={handleSend}>
          {lang === "ar" ? "إرسال" : "Send"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "20px",
  },
  header: {
    margin: "10px 0",
    color: "#333",
  },
  chatBox: {
    flex: 1,
    width: "100%",
    maxWidth: "600px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    backgroundColor: "white",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "70%",
  },
  inputBox: {
    marginTop: "10px",
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#4a90e2",
    color: "white",
    cursor: "pointer",
  },
};

export default App;