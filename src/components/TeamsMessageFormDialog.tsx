import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Avatar,
  CardHeader,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledBadge from "./StyledBadge";
import Grid from "@mui/material/Unstable_Grid2";
import { useNotificationSnackbar } from "../hooks/useNotificationSnackbar";
import { useProfileById } from "../hooks/useProfileById";
import useProfile from "../hooks/useProfile";
import { useTeamsService } from "../services/teams";
import { CustomCircularProgressFullScreen } from "./CustomCircularProgress";

export interface TeamsMessageFormDialogProps {
  title: string;
  isOpen: boolean;
  close: () => void;
  userId: string;
}

interface Erros {
  message: string | null;
}

export const TeamsMessageFormDialog = (props: TeamsMessageFormDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setloading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [erros, setErros] = useState<Erros>({
    message: null,
  });
  const { onSuccessSnackbar, onErrorSnackbar } = useNotificationSnackbar();
  const clearError = () => {
    setErros({
      message: null,
    });
  };
  const myProfile = useProfile();
  const profile = useProfileById(props.userId);

  useEffect(() => {
    setMessage(`Olá ${profile?.givenName}, preciso falar com você sobre o módulo "${props.title}" no Portal RH.
Podemos falar?
Aguardo seu retorno.`);
  }, [profile?.givenName, props.title]);

  const validFields = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!message.trim()) {
      setErros((prevState) => ({
        ...prevState,
        message: "❌ Campo obrigatório",
      }));
      return false;
    }
    return true;
  };

  const { chatTypeOneToOne } = useTeamsService();

  const handleSubmit = async () => {
    clearError();
    if (!validFields()) return;
    setloading(true);
    const response = await chatTypeOneToOne({
      to: myProfile?.id ?? "",
      from: profile?.id ?? "",
      message: `<a href="${window.location.origin}" style="text-decoration: none;" target="_top"><span style="font-size:28px;font-family:'roboto';text-shadow: 2px 2px 4px #000000;"><span style="color: #ff6600;">Portal</span> <span style="color: #003366;">Portal</span></span></a><hr /><span style="font-family:'roboto';">${message}</span>`,
    });

    if (response === 200) {
      onSuccessSnackbar();
    } else {
      onErrorSnackbar();
    }
    setloading(false);
    props.close();
  };

  const getColorFromAvailability = (availability: string): string => {
    switch (availability) {
      case "Available":
        return "#44b700";
      case "Busy":
      case "DoNotDisturb":
        return "#cc0000";
      case "BeRightBack":
      case "Away":
        return "#f1c232";
      case "Offline":
      default:
        return "#bcbcbc";
    }
  };

  const getStatusFromActivity = (activity: string): string => {
    switch (activity) {
      case "Available":
        return "Disponível";
      case "Busy":
        return "Ocupado";
      case "InACall":
        return "Ao Telefone";
      case "DoNotDisturb":
        return "Não incomodar";
      case "Presenting":
        return "Apresentando";
      case "BeRightBack":
        return "Volto logo";
      case "Away":
        return "Aparecer como ausente";
      case "Offline":
        return "Invisível";
      default:
        return activity;
    }
  };

  return (
    <React.Fragment>
      {loading && <CustomCircularProgressFullScreen />}
      <Dialog
        maxWidth="md"
        fullScreen={fullScreen}
        open={props.isOpen}
        onClose={props.close}
        aria-labelledby="responsive-dialog-teams"
      >
        <DialogTitle id="responsive-dialog-teams">{props.title}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Typography>
                Envie uma mensagem para os contatos da sua organização Portal
                através da nossa integração com o Microsoft Teams.
              </Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <CardHeader
                sx={{ p: 0 }}
                avatar={
                  <StyledBadge
                    theme={theme}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                    colorhex={getColorFromAvailability(
                      profile?.presence.availability ?? ""
                    )}
                  >
                    <Avatar
                      src={profile?.photo}
                      sx={{ width: 80, height: 80 }}
                      alt={profile?.displayName}
                    />
                  </StyledBadge>
                }
                title={
                  <Typography variant="h5">{profile?.displayName}</Typography>
                }
                subheader={
                  <React.Fragment>
                    <Typography
                      variant="caption"
                      component="span"
                      display="block"
                    >
                      {profile?.mail}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      display="block"
                    >
                      {getStatusFromActivity(profile?.presence.activity ?? "")}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Mensagem"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                error={!!erros.message}
                helperText={erros.message || ""}
                fullWidth
                required
                variant="filled"
                multiline
                minRows={10}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Enviar Mensagem</Button>
          <Button color="error" onClick={props.close}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
