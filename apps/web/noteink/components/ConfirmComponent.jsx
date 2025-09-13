"use client";
import styles from "../styles/Confirm.module.css";
import { useTheme } from "next-themes";
import { Colors } from "../colors/color-theme";

export default function ConfirmBox({ message, onConfirm, onCancel }) {
    const { theme } = useTheme();
    const colors = theme === "light" ? Colors.light : Colors.dark;

  return (
    <div className={styles.overlay} style={{ backgroundColor: colors.background}}>
      <div className={styles.box} style={{ backgroundColor: colors.background, border: theme === "light" ? "1px black solid" : "1px white solid", boxShadow: theme === "light" ? "0 4px 15px black" : "0 4px 15px white" 
      }}>
        <h2 style={{ color: colors.text}}>{message}</h2>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={onConfirm} style={{ color: colors.text}}>
            Yes
          </button>
          <button className={styles.no} onClick={onCancel} style={{ color: colors.text}}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
