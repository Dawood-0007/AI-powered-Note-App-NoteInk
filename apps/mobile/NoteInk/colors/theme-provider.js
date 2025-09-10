import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";

export const Colors = {
  dark: {
    background: "#000000",
    text: "#FFFFFF",
    boxColor: "#1e1e1e",
    btnColorBackground: "#FFFFFF",
    btnColor: "#000000",
    cardBG: "#000000ff",
  },
  light: {
    background: "#F3F3F3",
    text: "#000000",
    boxColor: "#FFFFFF",
    btnColorBackground: "#000000",
    btnColor: "#FFFFFF",
    cardBG: "#F3F3F3",
  },
};


const ThemeContext = createContext({
  theme: "light",
  colors: Colors.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, followSystem = false  }) => {
const colorValue = useColorScheme();
  const [theme, setTheme] = useState(colorValue);

  useEffect(() => {
    if (!followSystem) return;
    const init = Appearance.getColorScheme() || colorValue;
    console.log(init)
    setTheme(init);
    const sub = Appearance.addChangeListener(({ colorScheme }) =>
      setTheme(colorScheme || "light")
    );
    console.log(sub)
    return () => sub.remove();
  }, [followSystem]);

  const value = useMemo(
    () => ({
      theme,
      colors: Colors[theme],
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
