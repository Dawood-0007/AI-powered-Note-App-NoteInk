"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { Colors } from "../../colors/color-theme";
import styles from "../../styles/noteAdd.module.css"
import AIChatBar from "../../components/AIComponent";
import { TbPencilPlus } from "react-icons/tb";

const AddNotePage = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [device, setDevice] = useState("desktop");
  const colors = theme === "light" ? Colors.light : Colors.dark;

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
    const checkDevice = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
}
      checkDevice();
      window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
}, []);

  const storeData = (note) => {
    try {
      const previousValue = localStorage.getItem("my-notes");
      let notes = [];
      if (previousValue !== null) {
        notes = JSON.parse(previousValue);
      }
      notes.push(note);
      localStorage.setItem("my-notes", JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save data:", e);
    }
  };

  const handlePress = () => {
    let nextId = 1;
    try {
      const previousValue = localStorage.getItem("my-notes");
      if (previousValue !== null) {
        const notes = JSON.parse(previousValue);
        const lastNote = notes[notes.length - 1];
        nextId = lastNote.id + 1;
      }
    } catch (e) {
      console.error("Failed to fetch notes:", e);
    }

    const note = {
      id: nextId,
      title,
      content,
      date,
    };

    storeData(note);
    setTitle("");
    setContent("");

    router.push("/");
  };

  const handlePressAI = () => {
        setChatVisible(true);
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", width: device === "desktop" ? chatVisible ? "calc(100% - 320px)": "100%" : "100%", position: "absolute", right: device === "desktop" ? chatVisible ? 0 : 0 : 0 }}>
      <Header shown={true} page="add" id={null} />
      <div style={{ padding: 16 }}>
        <input
          type="text"
          placeholder="Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={[styles.input, styles.titleInput].join(" ")}
          style={{ color: colors.text }}
        />
        <p style={{ color: colors.text }}>Date: {date}</p>
        <textarea
          placeholder="Note Here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className={[styles.input, styles.textArea].join(" ")}
          style={{ color: colors.text }}
        />
        <p className="firstButtonText">Confirm</p>
        <button
          onClick={handlePress}
          className="mainAddButton"
          style={{ backgroundColor: theme === "light" ? Colors.light.btnColorBackground : Colors.dark.btnColorBackground, color: theme === "light" ? Colors.light.btnColor : Colors.dark.btnColor, cursor: "pointer", bottom: device !== "desktop" ? chatVisible ? "40%" : "20px" : "20px" }}
        >
          ✓
        </button>

        <p className="secondButtonText">Ask AI</p>
        <button className="mainAddButtonSec" style={{backgroundColor: colors.btnColorBackground, cursor: "pointer", bottom: device !== "desktop" ? chatVisible ? "40%" : "20px" : "20px"}} onClick={handlePressAI}>

          <p style={ { color: colors.btnColor, display: "flex", alignItems: "center", justifyContent: "center" } }>
            <TbPencilPlus size={24} color={colors.btnColor} />
          </p>
        </button>

      </div>
      <AIChatBar
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        noteText={content.trim() === "" ? "null" : content}
      />
    </div>
  );
};

export default AddNotePage;
