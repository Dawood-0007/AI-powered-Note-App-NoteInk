"use client"
import Header from "@/components/Header";
import { useState } from "react";
import styles from "../styles/home.module.css";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Colors } from "..//colors/color-theme";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);

  const { theme } = useTheme();

  useEffect(() => {
    try {
      const previousValue = localStorage.getItem("my-notes");
      if (previousValue !== null) {
        let allNotes = JSON.parse(previousValue);
        allNotes.sort((a, b) => b.id - a.id);
        setData(allNotes);
      } 
    } catch (e) {
      console.error("Failed to fetch the data from localStorage", e);
    }
  }, []);

  return (
    <div style={{ backgroundColor: theme === "light" ? Colors.light.background : Colors.dark.background, minHeight: "100vh" }}>
      <Header shown={false} page={"home"} id={null}/>
      <main className={styles.boxContainer}>
        { data.length !== 0 ? (
          data.map((item, index) => (
            <Link href={`/note/${item.id}`} key={index}>
            <div className={styles.box} style={{ backgroundColor: theme === "light" ? Colors.light.boxColor : Colors.dark.boxColor, color: theme === "light" ? Colors.light.text : Colors.dark.text }}>
              <h2>{item.title.trim() === "" ? "No Title" : item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}</h2>
              <p>{item.content.trim() === "" ? "No Content" : item.content.length > 40 ? item.content.substring(0, 40) + "..." : item.content}</p>
            </div></Link>
          ))
        ) : <p className={styles.mainNotesPara}>No Note Yet</p>
      }
      </main>
      <Link href={"/add"}>
      <p className="firstButtonText" style={{ right: "37px"}}>Add</p>
      <button className="mainAddButton" style={{ backgroundColor: theme === "light" ? Colors.light.btnColorBackground : Colors.dark.btnColorBackground, color: theme === "light" ? Colors.light.btnColor : Colors.dark.btnColor, cursor: "pointer"}}>+</button></Link>
    </div>
  );
}
