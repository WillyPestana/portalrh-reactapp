/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePageTitle } from "../../../../components/PageTitleProvider";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useBusinessDevelopmentProfileLevelOptions } from "../../hooks/useBusinessDevelopmentProfileLevelOptions";

interface Erros {
  nome: string | null;
  profile: string | null;
  hardSkill: string | null;
  descriptionOfActivities: string | null;
}

const BusinessDevelopmentOfficeFormPage = () => {
  const { id } = useParams();
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle(`${id ? "Atualizar" : "Adicionar"} Cargo`);
  }, [id, setPageTitle]);

  const navigate = useNavigate();

  //Form
  const [nome, setNome] = useState("");
  const [hardSkill, setHardSkill] = useState("");
  const [descriptionOfActivities, setDescriptionOfActivities] = useState("");
  const [state, setState] = useState<boolean>(true);
  const [erros, setErros] = useState<Erros>({
    nome: null,
    profile: null,
    hardSkill: null,
    descriptionOfActivities: null,
  });
  const profiles = useBusinessDevelopmentProfileLevelOptions();
  const [profile, setProfile] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setProfile(event.target.value as string);
  };

  const clearError = () => {
    setErros({
      nome: null,
      profile: null,
      hardSkill: null,
      descriptionOfActivities: null,
    });
  };

  const initForm = useCallback(() => {
    // Reinicia o formulário
    setNome("");
    setProfile("");
    setHardSkill("");
    setDescriptionOfActivities("");
    clearError();
  }, []);

  useMemo(() => {
    if (id) {
      setNome("");
      setProfile("");
      setHardSkill("");
      setDescriptionOfActivities("");
    } else {
      initForm();
    }
  }, [id, initForm]);

  const validFields = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome.trim()) {
      setErros((prevState) => ({
        ...prevState,
        nome: "❌ Campo obrigatório",
      }));
      return false;
    }

    if (!profile.trim()) {
      setErros((prevState) => ({
        ...prevState,
        profile: "❌ Campo obrigatório",
      }));
      return false;
    }

    if (!hardSkill.trim()) {
      setErros((prevState) => ({
        ...prevState,
        hardSkill: "❌ Campo obrigatório",
      }));
      return false;
    }

    if (!descriptionOfActivities.trim()) {
      setErros((prevState) => ({
        ...prevState,
        descriptionOfActivities: "❌ Campo obrigatório",
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    if (!validFields()) return;

    // Se todos os campos obrigatórios foram preenchidos, faça algo com os dados
    console.log("Dados do formulário:", {
      nome,
      profile,
      hardSkill,
      descriptionOfActivities,
      state,
    });

    // Reinicia o formulário
    initForm();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={7} lg={7}>
          <TextField
            label="Nome do Cargo"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            error={!!erros.nome}
            helperText={erros.nome || ""}
            fullWidth
            required
            variant="filled"
          />
        </Grid>
        <Grid xs={12} sm={12} md={5} lg={5}>
          <FormControl variant="filled" fullWidth error={!!erros.profile}>
            <InputLabel id="demo-simple-select-label">
              Nível do Perfil *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={profile}
              label="Nível do Perfil"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Limpar</em>
              </MenuItem>
              {profiles.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{erros.profile || ""}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Competências Técnicas"
            value={hardSkill}
            onChange={(event) => setHardSkill(event.target.value)}
            error={!!erros.hardSkill}
            helperText={erros.hardSkill || ""}
            fullWidth
            required
            variant="filled"
            multiline
            minRows={5}
          />
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Descrição das Atividades"
            value={descriptionOfActivities}
            onChange={(event) => setDescriptionOfActivities(event.target.value)}
            error={!!erros.descriptionOfActivities}
            helperText={erros.descriptionOfActivities || ""}
            fullWidth
            required
            variant="filled"
            multiline
            minRows={5}
          />
        </Grid>

        <Grid container xs={12} sm={12} md={12} lg={12}>
          <Grid xs={6} sm={6} md={6} lg={6} textAlign="left">
            <FormControlLabel
              control={
                <Switch
                  checked={state}
                  onChange={(event) => setState(event.target.checked)}
                />
              }
              label={state ? "Ativo" : "Inativo"}
            />
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} textAlign="right">
            <Button
              onClick={() => navigate("/businessdevelopment/office")}
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

export default BusinessDevelopmentOfficeFormPage;
