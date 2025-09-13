"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Colors } from '../../../colors/color-theme'
import { useParams } from 'next/navigation'
import Header from '../../../components/Header'
import styles from "../../../styles/note.module.css"
import { useRouter } from 'next/navigation'
import { PiPencil } from "react-icons/pi";

const page = () => {
    const { theme } = useTheme();
    const colors = theme === "light" ? Colors.light : Colors.dark;
    const router = useRouter();

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchNote = () => {
            try {
                const previousValue = localStorage.getItem("my-notes");
                if (previousValue !== null) {
                    const notes = JSON.parse(previousValue);
                    const note = notes.find(n => n.id === parseInt(id));
                    if (note) {
                        setTitle(note.title);
                        setContent(note.content);
                        setDate(note.date);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch the data from localStorage", e);
            }
        }
        fetchNote();
    }, []);

  return (
    <div className={styles.noteContainer} style={{ backgroundColor: colors.background }}>
      <Header shown={true} page="note" id={id} />

      <div className={styles.noteFields}>
        <h2 className={styles.noteTitle} style={{ borderColor: colors.text, color: colors.text }}>
          {title}
        </h2>
        <p style={{ paddingLeft: "10px", color: colors.text }}>Date : {date}</p>
        <p className={styles.noteContent} style={{ color: colors.text }}>
          {content}
        </p>
      </div>

      <p className='firstButtonText' style={{ right: "40px", color: colors.text}}>Edit</p>

      <button
        className="mainAddButton"
        style={{ backgroundColor: colors.btnColorBackground, color: colors.btnColor }}
        onClick={() => router.push(`/edit/${id}`)}
      >
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <PiPencil size={30} />
        </p>
      </button>
    </div>
  )
}

export default page