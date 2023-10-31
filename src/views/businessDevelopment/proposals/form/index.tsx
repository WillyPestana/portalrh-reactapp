/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePageTitle } from "../../../../components/PageTitleProvider";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import NoCamera from "../../../../assets/imgs/no-camera.png";
import { Add, People, PersonAddAlt, Remove } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import AutoCompleteCustom from "../../../../components/AutoCompleteCustom";

interface Erros {
  valueFile: string | null;
  proposalTitle: string | null;
  nameClient: string | null;
  proposalValue: string | null;
  proposalDate: string | null;
  proposalVersion: string | null;
  autoComplete: string | null;
  optionsSelected: string | null;
}

const BusinessDevelopmentProposalsFormPage = () => {
  const { id } = useParams();
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle(`${id ? "Atualizar" : "Adicionar"} Proposta`);
  }, [id, setPageTitle]);

  const navigate = useNavigate();

  //Form
  const [proposalTitle, setProposalTitle] = useState("");
  const [nameClient, setNameClient] = useState("");
  const [proposalValue, setProposalValue] = useState("");
  const [proposalDate, setProposalDate] = React.useState<Dayjs | null>(
    dayjs(Date.now())
  );
  const [proposalVersion, setProposalVersion] = useState("");
  const [state, setState] = useState<boolean>(true);
  const [erros, setErros] = useState<Erros>({
    valueFile: null,
    proposalTitle: null,
    nameClient: null,
    proposalValue: null,
    proposalDate: null,
    proposalVersion: null,
    optionsSelected: null,
    autoComplete: null,
  });

  //File Input
  const [valueFile, setValueFile] = React.useState<File | null>(null);
  const [logoClient, setlogoClient] = React.useState<string>(NoCamera);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setlogoClient(base64); // Log the base64 representation
      };
    }
    setlogoClient(NoCamera);
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        fileToBase64(selectedFile);
        setValueFile(selectedFile);
        setErros((prevState) => ({
          ...prevState,
          valueFile: null,
        }));
      } else {
        fileToBase64(null);
        setValueFile(null);
        setErros((prevState) => ({
          ...prevState,
          valueFile: "❌ Arquivo selecionado não é uma imagem",
        }));
      }
    } else {
      if (selectedFile === null) {
        fileToBase64(selectedFile);
        setValueFile(selectedFile);
        setErros((prevState) => ({
          ...prevState,
          valueFile: null,
        }));
      }
    }
  };

  //Auto Complete
  const [selected, setSelected] = useState<any | null>(null);
  const [options, setOptions] = React.useState<readonly any[]>([
    {
      id: 1,
      label: "Analista de Service Desk - Junior",
      name: "Analista de Service Desk",
      perfil: "Junior",
      amount: 0,
    },
    {
      id: 2,
      label: "Analista de Service Desk - Pleno",
      name: "Analista de Service Desk",
      perfil: "Pleno",
      amount: 0,
    },
    {
      id: 3,
      label: "Analista de Service Desk - Sênior",
      name: "Analista de Service Desk",
      perfil: "Sênior",
      amount: 0,
    },
  ]);

  //List
  const [optionsSelected, setOptionsSelected] = React.useState<any[]>([{}]);

  const setOffices = () => {
    if (!selected) {
      setErros((prevState) => ({
        ...prevState,
        autoComplete: "❌ Campo obrigatório",
      }));
      return false;
    }

    setErros((prevState) => ({ ...prevState, autoComplete: null }));

    const index = optionsSelected.findIndex((f) => f.id === selected.id);
    if (index === -1) {
      optionsSelected.push({ ...selected, amount: 1 });
    } else {
      optionsSelected[index].amount += 1;
    }

    setSelected(null);
  };

  const updateOfficeAmount = (item: any, operation: string) => {
    const updatedOptions = [...optionsSelected]; // Cria uma cópia do array optionsSelected

    const index = updatedOptions.findIndex((f) => f.id === item.id);
    if (index !== -1) {
      if (operation === "+") {
        updatedOptions[index].amount += 1;
      } else if (operation === "-") {
        if (updatedOptions[index].amount === 1) {
          updatedOptions.splice(index, 1); // Remove o item do array
        } else {
          updatedOptions[index].amount -= 1; // Decrementa a quantidade
        }
      }

      setOptionsSelected(updatedOptions); // Atualiza o estado com a nova lista modificada
    }
  };

  const clearError = () => {
    setErros({
      valueFile: null,
      proposalTitle: null,
      nameClient: null,
      proposalValue: null,
      proposalDate: null,
      proposalVersion: null,
      optionsSelected: null,
      autoComplete: null,
    });
  };

  const initForm = useCallback(() => {
    // Reinicia o formulário
    setProposalTitle("");
    setNameClient("");
    setProposalValue("");
    setProposalDate(dayjs(Date.now()));
    setProposalVersion("");
    setValueFile(null);
    setlogoClient(NoCamera);
    setSelected(null);
    setOptionsSelected([]);
  }, []);

  useMemo(() => {
    if (id) {
      setProposalTitle("");
      setNameClient("");
      setProposalValue("");
      setProposalDate(dayjs(Date.now()));
      setProposalVersion("");
      setValueFile(null);
      setlogoClient(NoCamera);
      setSelected(null);
      setOptionsSelected([]);
    } else {
      initForm();
    }
  }, [id, initForm]);

  const validFields = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!valueFile) {
      setErros((prevState) => ({
        ...prevState,
        valueFile: "❌ Selecione uma imagem",
      }));
      return false;
    }
    if (!proposalTitle.trim()) {
      setErros((prevState) => ({
        ...prevState,
        proposalTitle: "❌ Campo obrigatório",
      }));
      return false;
    }
    if (!nameClient.trim()) {
      setErros((prevState) => ({
        ...prevState,
        nameClient: "❌ Campo obrigatório",
      }));
      return false;
    }
    if (!proposalValue.trim()) {
      setErros((prevState) => ({
        ...prevState,
        proposalValue: "❌ Campo obrigatório",
      }));
      return false;
    }
    if (!proposalDate) {
      setErros((prevState) => ({
        ...prevState,
        proposalDate: "❌ Campo obrigatório",
      }));
      return false;
    }
    if (!proposalVersion.trim()) {
      setErros((prevState) => ({
        ...prevState,
        proposalVersion: "❌ Campo obrigatório",
      }));
      return false;
    }

    if (optionsSelected.length === 0) {
      setErros((prevState) => ({
        ...prevState,
        optionsSelected: "❌ Selecione um cargo",
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
      valueFile,
      logoClient,
      proposalTitle,
      nameClient,
      proposalValue,
      proposalDate,
      proposalVersion,
      optionsSelected,
    });

    // Reinicia o formulário
    initForm();
  };

  return (  
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={3} lg={3}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={() => fileInputRef?.current?.click()}
                  color={!!erros.valueFile ? "error" : "inherit"}
                >
                  <Box
                    component="img"
                    src={logoClient}
                    alt="Logo do cliente"
                    sx={{ width: 219, height: 132 }}
                  />
                </Button>
                <Typography variant="caption" color="error" gutterBottom>
                  {erros.valueFile || ""}
                </Typography>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleChangeFile}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={9} lg={9}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Titulo da Proposta"
                value={proposalTitle}
                onChange={(event) => setProposalTitle(event.target.value)}
                error={!!erros.proposalTitle}
                helperText={erros.proposalTitle || ""}
                fullWidth
                required
                variant="filled"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Nome do Cliente"
                value={nameClient}
                onChange={(event) => setNameClient(event.target.value)}
                error={!!erros.nameClient}
                helperText={erros.nameClient || ""}
                fullWidth
                required
                variant="filled"
              />
            </Grid>
          </Grid>

          <Grid xs={12} sm={12} md={4} lg={4}>
            <TextField
              label="Valor da Proposta"
              value={proposalValue}
              onChange={(event) => setProposalValue(event.target.value)}
              error={!!erros.proposalValue}
              helperText={erros.proposalValue || ""}
              fullWidth
              required
              variant="filled"
            />
          </Grid>

          <Grid xs={12} sm={12} md={4} lg={4}>
            <DatePicker
              label="Data da Proposta"
              localeText={{
                toolbarTitle: "Data da Proposta",
                cancelButtonLabel: "Cancelar",
              }}
              value={proposalDate}
              onChange={(newValue) => setProposalDate(newValue)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "filled",
                  error: !!erros.proposalDate,
                  helperText: erros.proposalDate || "",
                },
              }}
            />
          </Grid>

          <Grid xs={12} sm={12} md={4} lg={4}>
            <TextField
              label="Versão da Proposta"
              value={proposalVersion}
              onChange={(event) => setProposalVersion(event.target.value)}
              error={!!erros.proposalVersion}
              helperText={erros.proposalVersion || ""}
              fullWidth
              required
              variant="filled"
            />
          </Grid>

          <Grid xs={12} sm={12} md={10} lg={10}>
            <AutoCompleteCustom
              title="Cargos"
              required
              list={options}
              selected={selected}
              setSelected={setSelected}
              error={erros.autoComplete}
            />
          </Grid>
          <Grid xs={12} sm={12} md={2} lg={2}>
            <Button
              onClick={setOffices}
              startIcon={<PersonAddAlt fontSize="large" />}
              fullWidth
              sx={{ height: "100%" }}
            >
              Adicionar
            </Button>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12}>
            <Card
              sx={(theme) => ({
                ...(theme.palette.mode === "dark" && {
                  backgroundColor: "rgb(37, 37, 38)",
                }),
              })}
            >
              <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={<People />}
                title="Cargos Selecionados"
              />
              <Divider />
              <List
                sx={{
                  height: 300,
                  bgcolor: "background.paper",
                  overflow: "auto",
                }}
                dense
                component="div"
                role="list"
              >
                {optionsSelected.map((item) => (
                  <React.Fragment>
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Aumentar Quantidade">
                            <IconButton
                              onClick={() => updateOfficeAmount(item, "+")}
                              color="info"
                            >
                              <Add />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remover Quantidade">
                            <IconButton
                              onClick={() => updateOfficeAmount(item, "-")}
                              color="error"
                            >
                              <Remove />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>{item.amount}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.perfil}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              <CardActions>
                <Typography variant="caption" color="error" gutterBottom>
                  {erros.optionsSelected || ""}
                </Typography>
              </CardActions>
            </Card>
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
                onClick={() => navigate("/businessdevelopment/proposals")}
                color="error"
              >
                Voltar
              </Button>
              <Button type="submit">Salvar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>  
  );
};

export default BusinessDevelopmentProposalsFormPage;
