"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/AIcomponent.module.css";
import { useTheme } from "next-themes";
import { Colors } from "../colors/color-theme";
import { TbBulbFilled } from "react-icons/tb";

export default function AIChatBar({ visible, onClose, noteText }) {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const { theme } = useTheme();
  const colors = theme === "light" ? Colors.light : Colors.dark;
  
  const [messages, setMessages] = useState([
    { role: "assistant", content: "How can I assist you?" },
  ]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setGenerating(true);

    try {
      setInput("");

      const res = await fetch("/api/AIPrompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, noteText, messages: newMessages }),
      });

      const data = await res.json();

      const aiMessage = data?.response || "No response from AI";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiMessage },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error from AI" },
      ]);
    }
    setGenerating(false);
  };

  const handleClose = () => {
    setMessages([{ role: "assistant", content: "How can I assist you?" }]);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className={styles.chatContainer} style={{ backgroundColor: colors.background, color: colors.text, borderRight: theme === "light" ? "1px solid #ccc" : "1px solid #555", width: device ==="desktop" ? "320px" : "100%", height: device === "desktop" ? "100%" : "40%" }}>
      <hr className={styles.chatDivider} style={{ display: device === "desktop" ? "none" : "block"}}/>
      <div className={styles.chatHeader} style={{ marginBottom: device === "desktop" ? "20px" : "0px"}}>
        <p className={styles.chatHeaderText}>Notes</p>
        <button className={styles.chatClose} style={{ color: colors.text}} onClick={handleClose}>
          ⓧ
        </button>
      </div>

      <hr className={styles.chatDivider} />

      <div className={styles.chatMessages}>
        {messages.map((item, index) => (
          <p
            key={index}
            className={`${styles.chatBubble} ${
              item.role === "user"
                ? styles.chatBubbleUser
                : styles.chatBubbleAssistant
            }`}
          >
            {item.content}
          </p>
        ))}
        {generating && <p className={styles.chatGenerating}>generating ...</p>}
      </div>

      <div className={styles.chatInputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          className={styles.chatInput}
        />
        <button
          disabled={generating}
          onClick={sendMessage}
          className={styles.chatSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
