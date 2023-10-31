/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useMemo, useState } from "react";

export interface FormDialogProps {
  title: string;
  isOpen: boolean;
  close: () => void;
  editData: any;
}

interface Erros {
  nome: string | null;
  email: string | null;
  mensagem: string | null;
}

const FormDialog = (props: FormDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //Form
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({
    nome: null,
    email: null,
    mensagem: null,
  });

  const clearError = () => {
    setErros({
      nome: null,
      email: null,
      mensagem: null,
    });
  };

  const initForm = useCallback(() => {
    // Reinicia o formulário
    setNome("");
    setEmail("");
    setMensagem("");
    clearError();
  }, []);

  useMemo(() => {
    if (props.editData !== null) {
      setNome(props.editData.firstName);
      setEmail(props.editData.firstName);
      setMensagem(props.editData.firstName);
    } else {
      initForm();
    }
  }, [initForm, props.editData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome.trim()) {
      setErros((prevState) => ({
        ...prevState,
        nome: "Campo obrigatório",
      }));
      return;
    }

    if (!email.trim()) {
      setErros((prevState) => ({
        ...prevState,
        email: "Campo obrigatório",
      }));
      return;
    }

    if (!mensagem.trim()) {
      setErros((prevState) => ({
        ...prevState,
        mensagem: "Campo obrigatório",
      }));
      return;
    }

    // Se todos os campos obrigatórios foram preenchidos, faça algo com os dados
    console.log("Dados do formulário:", { nome, email, mensagem });

    // Reinicia o formulário
    initForm();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      open={props.isOpen}
      onClose={() => props.close()}
      aria-labelledby="alert-dialog-title"
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            error={!!erros.nome}
            helperText={erros.nome || ""}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!!erros.email}
            helperText={erros.email || ""}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Mensagem"
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
            error={!!erros.mensagem}
            helperText={erros.mensagem || ""}
            fullWidth
            margin="normal"
            multiline
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="error">
            Fechar
          </Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FormDialog;
