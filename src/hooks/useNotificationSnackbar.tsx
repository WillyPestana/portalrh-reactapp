import { Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

export const useNotificationSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSuccessSnackbar = (message?: string) => {
    return enqueueSnackbar(
      <Typography variant="h5">🙂 {message ?? "Sucesso"}</Typography>,
      {
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="inherit">
            Fechar
          </Button>
        ),
      }
    );
  };

  const onErrorSnackbar = (message?: string) => {
    return enqueueSnackbar(
      <Typography variant="h5">😢 {message ?? "Oops!"}</Typography>,
      {
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="inherit">
            Fechar
          </Button>
        ),
      }
    );
  };

  return { onSuccessSnackbar, onErrorSnackbar };
};
