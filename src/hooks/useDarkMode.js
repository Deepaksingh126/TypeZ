import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(true); // Default to true (dark mode)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme) {
      // If there's a stored preference, use it
      const shouldBeDark = storedTheme === "dark";
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // If no stored preference, default to dark mode
      document.documentElement.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.toggle("dark");
    setIsDark(isCurrentlyDark);
    localStorage.setItem("theme", isCurrentlyDark ? "dark" : "light");
  };

  return { isDark, toggleTheme };
}