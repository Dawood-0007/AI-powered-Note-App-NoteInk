'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/header.module.css";
import { TbBulbFilled } from "react-icons/tb";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import { Colors } from "../colors/color-theme";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmBox from "./ConfirmComponent";

const Header = ({ shown, page, id }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmBack, setShowConfirmBack] = useState(false);

  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme])
  

  const handleBackPress = () => {
    if (page === 'add' || page === 'note') {
      router.push('/');
    } else if (page === 'edit') {
      router.push(`/note/${id}`);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  }

  const handleCancelBack = () => {
    setShowConfirmBack(false)
  }

  const handleDelete  = () => {
    let updatedValue = '';
    try {
      const previousValue = localStorage.getItem("my-notes");

      const allNotes = previousValue ? JSON.parse(previousValue) : [];

      const filteredNotes = allNotes.filter(n => n.id !== parseInt(id));
    
      updatedValue = JSON.stringify(filteredNotes);

      localStorage.setItem("my-notes", updatedValue);
    } catch (e) {
      console.error("Failed to save data:", e);
    }

    router.push("/");
  };

  const handleConfirmBox = () => {
    setShowConfirmDelete(true)
  }

  const handleBackConfirm = () => {
    if (page === "note") {
      handleBackPress();
    } else {
      setShowConfirmBack(true)
    }
  }

  return (
    <div className={styles.noteHeader} style={{ color: theme === "light" ? Colors.light.background : Colors.dark.background }}>
      {shown && (
        <button className={styles.backButton} onClick={handleBackConfirm} style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}>
          ←
        </button>
      )}
      <h1 className={styles.noteHeaderText} style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}>
        <TbBulbFilled size={24} /> Notes
      </h1>
      <div className={styles.buttonContainer}>
        { page === "note" && <button
        className={styles.themeButton}
          style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}
          onClick={handleConfirmBox}
        >
          <RiDeleteBin5Line size={28}/>
        </button>}
        
      <button
        className={styles.themeButton}
        style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <IoMoonOutline size={28} /> : <IoSunnyOutline size={28} />}
      </button>
      </div>
      {showConfirmDelete && (
        <ConfirmBox
          message="Are you sure you want to delete?"
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {showConfirmBack && page !== "note" && (
        <ConfirmBox
          message="Are you sure, Your unsaved note will be lost"
          onConfirm={handleBackPress}
          onCancel={handleCancelBack}
        />
      )}
    </div>
  );
};

export default Header;
