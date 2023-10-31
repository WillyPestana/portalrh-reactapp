import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
export interface GeneralPageProps {
  colorMode: any;
}
const GeneralPage = (props: GeneralPageProps) => {
  const [mode, setMode] = React.useState(localStorage.getItem("prefersMode"));

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
      switch (newMode) {
        case "light":
          props.colorMode.colorModeLight();
          break;
        case "dark":
          props.colorMode.colorModeDark();
          break;
        default:
          props.colorMode.colorModeSystem();
          break;
      }
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Modo
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={mode}
        exclusive
        onChange={handleChange}
        aria-label="Mode"
      >
        <ToggleButton value="light">
          <LightMode sx={{ mr: 1 }} />
          Claro
        </ToggleButton>
        <ToggleButton value="system">
          <SettingsBrightness sx={{ mr: 1 }} />
          Sistema
        </ToggleButton>
        <ToggleButton value="dark">
          <DarkMode sx={{ mr: 1 }} />
          Escuro
        </ToggleButton>
      </ToggleButtonGroup>
    </React.Fragment>
  );
};

export default GeneralPage;
