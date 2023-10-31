import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import useAuthentication from "../../hooks/useAuthentication";
import { usePageTitle } from "../../components/PageTitleProvider";

const NotFoundOrUnauthorizedPage = () => {
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Oops! 😢");
  }, [setPageTitle]);

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const isAuthenticated = useAuthentication();

  useEffect(() => {
    // Adiciona um pequeno atraso para dar tempo de renderizar o componente antes de torná-lo visível
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Limpa o timeout quando o componente é desmontado
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: isVisible ? 1 : 0, // Altera a opacidade para controlar o efeito de aparecimento
        transform: `scale(${isVisible ? 1 : 0.8})`, // Altera a escala para controlar o efeito de aparecimento
        transition: "opacity 0.5s, transform 0.5s", // Define a duração da transição
      }}
    >
      <Stack>
        <Typography variant="h1" color="error">
          Oops! 😢
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Desculpe, parece que você se perdeu.
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          A página que você está tentando acessar não foi encontrada ou não tem
          acesso liberado.
        </Typography>
        <Button
          onClick={() => {
            isAuthenticated ? navigate("/home") : navigate("/");
          }}
        >
          Voltar para a página inicial
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundOrUnauthorizedPage;
