'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../styles/header.module.css";
import { TbBulbFilled } from "react-icons/tb";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import { Colors } from "../colors/color-theme";

const Header = ({ shown, page, id }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

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

  return (
    <div className={styles.noteHeader} style={{ color: theme === "light" ? Colors.light.background : Colors.dark.background }}>
      {shown && (
        <button className={styles.backButton} onClick={handleBackPress} style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}>
          ←
        </button>
      )}
      <h1 className={styles.noteHeaderText} style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}>
        <TbBulbFilled size={24} /> Notes
      </h1>
      <button
        className={styles.themeButton}
        style={{ color: theme === "light" ? Colors.light.text : Colors.dark.text }}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <IoMoonOutline size={28} /> : <IoSunnyOutline size={28} />}
      </button>
    </div>
  );
};

export default Header;
