import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import logo from "../../assets/imgs/logo.svg";
import bg from "../../assets/imgs/bg.jpg";
import {
  CssBaseline,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { CustomCircularProgressFullScreen } from "../../components/CustomCircularProgress";
import { usePageTitle } from "../../components/PageTitleProvider";
import React from "react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/WillyPestana">
        Portal RH
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function AuthPage() {
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Autenticação");
  }, [setPageTitle]);
  const navigate = useNavigate();
  const { accounts, instance } = useMsal();

  const handleLogin = () => {
    const loginRequest = {
      scopes: process.env.REACT_APP_AZURE_AD_SCOPES!.split(",") || [],
      prompt: "select_account",
      redirectUri: window.location.origin,
    };

    instance.loginRedirect(loginRequest).catch((error) => {
      console.error("Erro durante o redirecionamento:", error);
    });
  };

  useEffect(() => {
    if (accounts.length > 0) {
      navigate("/home");
    } else {
      localStorage.removeItem("profile");
    }
  }, [accounts, instance, navigate]);

  if (accounts.length > 0) return <CustomCircularProgressFullScreen />;

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} srcSet={logo} alt="Portal" height="150px" />
            <Typography variant="overline" display="block" gutterBottom>
              BEM-VINDO AO{" "}
              <Typography
                variant="overline"
                display="inline-block"
                color={"#ff6600"}
                gutterBottom
              >
                PORTAL
              </Typography>{" "}
              <Typography
                variant="overline"
                display="inline-block"
                color={"#003366"}
                gutterBottom
              >
                PORTAL
              </Typography>
            </Typography>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AuthPage;
