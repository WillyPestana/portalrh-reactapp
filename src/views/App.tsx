import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "../components/Authentication";
import { useTheme } from "../hooks/useTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useBusinessDevelopmentRoutes from "./businessDevelopment/router";
import useSettingsRoutes from "./settings/router";
import useHomeRoutes from "./home/router";
import useNotFoundOrUnauthorizedRoutes from "./notFoundOrUnauthorized/router";
import useAuthRoutes from "./auth/router";
import { PageTitleProvider } from "../components/PageTitleProvider";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

const ColorModeContext = React.createContext({});

function App() {
  const { colorMode, theme } = useTheme();

  const AuthRoutes = useAuthRoutes();
  const HomeRoutes = useHomeRoutes();
  const SettingsRoutes = useSettingsRoutes({ colorMode: colorMode });
  const BusinessDevelopmentRoutes = useBusinessDevelopmentRoutes();
  const NotFoundOrUnauthorizedRoutes = useNotFoundOrUnauthorizedRoutes();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <CssBaseline />
            <Router>
              <Authentication>
                <PageTitleProvider>
                  <Routes>
                    {AuthRoutes.map((item) => (
                      <Route
                        key={item.path}
                        path={item.path}
                        element={item.element}
                      />
                    ))}

                    {HomeRoutes.map((item) => (
                      <Route
                        key={item.path}
                        path={item.path}
                        element={item.element}
                      />
                    ))}
                    {SettingsRoutes.map((item) => (
                      <Route
                        key={item.path}
                        path={item.path}
                        element={item.element}
                      />
                    ))}

                    {BusinessDevelopmentRoutes.map((item) => (
                      <Route
                        key={item.path}
                        path={item.path}
                        element={item.element}
                      />
                    ))}

                    {NotFoundOrUnauthorizedRoutes.map((item) => (
                      <Route
                        key={item.path}
                        path={item.path}
                        element={item.element}
                      />
                    ))}
                  </Routes>
                </PageTitleProvider>
              </Authentication>
            </Router>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
