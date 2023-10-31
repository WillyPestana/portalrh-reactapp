/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePageTitle } from "../../../../components/PageTitleProvider";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useBusinessDevelopmentService } from "../../../../services/businessDevelopment/profilelevel";
import { IBDProfileLevel } from "../../../../services/businessDevelopment/profilelevel/interfaces/IBDProfileLevel";
import { useNotificationSnackbar } from "../../../../hooks/useNotificationSnackbar";
import useProfile from "../../../../hooks/useProfile";

interface Erros {
  nome: string | null;
}

const BusinessDevelopmentProfileLevelFormPage = () => {
  const { id } = useParams();
  const { setPageTitle } = usePageTitle();
  const profile = useProfile();

  const profileLevelCollection: IBDProfileLevel = useMemo(() => {
    return {
      id: "",
      name: "",
      isActive: true,
      user: {
        userId: "",
        displayName: "",
        givenName: "",
        mail: "",
        mobilePhone: "",
        surname: "",
        userPrincipalName: "",
        photo: "",
      },
    };
  }, []);

  React.useEffect(() => {
    setCollection((prevState) => ({
      ...prevState,
      user: {
        userId: profile?.id ?? "",
        displayName: profile?.displayName ?? "",
        givenName: profile?.givenName ?? "",
        mail: profile?.mail ?? "",
        mobilePhone: profile?.mobilePhone ?? "",
        surname: profile?.surname ?? "",
        userPrincipalName: profile?.displayName ?? "",
        photo: profile?.photo ?? "",
      },
    }));
  }, [profile]);

  React.useEffect(() => {
    setPageTitle(`${id ? "Atualizar" : "Adicionar"} Nível de Profile`);
  }, [id, setPageTitle]);

  const navigate = useNavigate();
  const { getProfileLevelById, setProfileLevel, updateProfileLevel } =
    useBusinessDevelopmentService();

  const { onSuccessSnackbar, onErrorSnackbar } = useNotificationSnackbar();

  //Form
  const [collection, setCollection] = useState<IBDProfileLevel>(
    profileLevelCollection
  );
  const [erros, setErros] = useState<Erros>({
    nome: null,
  });

  const clearError = () => {
    setErros({
      nome: null,
    });
  };

  useMemo(() => {
    if (id) {
      getProfileLevelById(id).then((response) => {
        setCollection(response);
        setCollection((prevState) => ({
          ...prevState,
          user: {
            userId: profile?.id ?? "",
            displayName: profile?.displayName ?? "",
            givenName: profile?.givenName ?? "",
            mail: profile?.mail ?? "",
            mobilePhone: profile?.mobilePhone ?? "",
            surname: profile?.surname ?? "",
            userPrincipalName: profile?.displayName ?? "",
            photo: profile?.photo ?? "",
          },
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,profile]);

  const validFields = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!collection.name.trim()) {
      setErros((prevState) => ({
        ...prevState,
        nome: "❌ Campo obrigatório",
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    if (!validFields()) return;
    if (id) {
      const response = await updateProfileLevel(collection);
      if (response === 200) {
        onSuccessSnackbar();
        navigate("/businessdevelopment/profilelevel");
      } else {
        onErrorSnackbar();
      }
    } else {
      const response = await setProfileLevel(collection);
      if (response === 200) {
        onSuccessSnackbar();
        navigate("/businessdevelopment/profilelevel");
      } else {
        onErrorSnackbar();
      }
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Nome"
            value={collection.name}
            onChange={(event) =>
              setCollection((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
            error={!!erros.nome}
            helperText={erros.nome || ""}
            fullWidth
            required
            variant="filled"
          />
        </Grid>

        <Grid container xs={12} sm={12} md={12} lg={12}>
          <Grid xs={6} sm={6} md={6} lg={6} textAlign="left">
            <FormControlLabel
              control={
                <Switch
                  checked={collection.isActive}
                  onChange={(event) =>
                    setCollection((prevState) => ({
                      ...prevState,
                      isActive: event.target.checked,
                    }))
                  }
                />
              }
              label={collection.isActive ? "Ativo" : "Inativo"}
            />
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} textAlign="right">
            <Button
              onClick={() => navigate("/businessdevelopment/profilelevel")}
              color="error"
            >
              Voltar
            </Button>
            <Button type="submit">Salvar</Button>
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={12}></Grid>
      </Grid>
    </Box>
  );
};

export default BusinessDevelopmentProfileLevelFormPage;
