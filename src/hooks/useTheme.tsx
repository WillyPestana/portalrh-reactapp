import { useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const useTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersMode = localStorage.getItem("prefersMode");

  const [mode, setMode] = useState<"light" | "dark">(
    prefersMode === "dark"
      ? "dark"
      : prefersMode === "light"
      ? "light"
      : prefersDarkMode
      ? "dark"
      : "light"
  );

  if (prefersMode === null) {
    setMode(prefersDarkMode ? "dark" : "light");
    localStorage.setItem("prefersMode", "system");
  }

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      colorModeDark: () => {
        setMode(() => "dark");
        localStorage.setItem("prefersMode", "dark");
      },
      colorModeLight: () => {
        setMode(() => "light");
        localStorage.setItem("prefersMode", "light");
      },
      colorModeSystem: () => {
        setMode(prefersDarkMode ? "dark" : "light");
        localStorage.setItem("prefersMode", "system");
      },
    }),
    [prefersDarkMode]
  );

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "rgb(246,247,249)",
            },
          }
        : {
            background: {
              default: "rgb(30,30,30)",
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return {
    colorMode,
    theme,
    mode,
  };
};
