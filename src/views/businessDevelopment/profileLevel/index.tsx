import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import {
  Add,
  CheckCircle,
  Delete,
  Edit,
  Error,
  Refresh,
} from "@mui/icons-material";
import DataGridCustom from "../../../components/DataGridCustom";
import NotFoundOrUnauthorizedPage from "../../notFoundOrUnauthorized";
import { useMemberOf } from "../../../hooks/useMemberOf";
import { useNavigate } from "react-router";
import { usePageTitle } from "../../../components/PageTitleProvider";
import { useBusinessDevelopmentProfileLevel } from "../hooks/useBusinessDevelopmentProfileLevel";
import { IBDProfileLevel } from "../../../services/businessDevelopment/profilelevel/interfaces/IBDProfileLevel";
import { useBusinessDevelopmentService } from "../../../services/businessDevelopment/profilelevel";
import dayjs from "dayjs";
import useProfile from "../../../hooks/useProfile";
import { useFormDialog } from "../../../hooks/useFormDialog";
import { TeamsMessageFormDialog } from "../../../components/TeamsMessageFormDialog";

const BusinessDevelopmentProfileLevelPage = () => {
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Nível de Perfil");
  }, [setPageTitle]);

  const CheckAuthorize = useMemberOf();
  const memberOfModule = React.useMemo(
    () => ["PK.Administrator", "PK.BusinessDevelopmentAdministrator"],
    []
  );
  const navigate = useNavigate();
  const [rows, refresh] = useBusinessDevelopmentProfileLevel();
  const { deleteProfileLevel } = useBusinessDevelopmentService();
  const profile = useProfile();
  const { isOpenFormDialog, titleFormDialog, openFormDialog, closeFormDialog } =
    useFormDialog();
  const [userId, setUserId] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", width: 100 },
    {
      field: "user",
      headerName: "Utilizador",
      sortable: false,
      filterable: false,
      description:
        "Esta coluna tem um renderCell de valor e não pode ser classificada ou filtrada.",
      width: 200,
      valueFormatter: (params) => params.value.displayName ?? "",
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.displayName}>
            <Button
              variant="text"
              onClick={() => {
                setUserId(params.value.userId);
                openFormDialog("Desenvolvimento de Negócios - Nível de Perfil");
              }}
              disabled={profile?.id === params.value.userId}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  src={params.value.photo}
                  alt={params.value.displayName}
                  sx={{ width: 32, height: 32 }}
                />

                <Typography variant="inherit">
                  {params.value.displayName.length < 14
                    ? params.value.displayName
                    : params.value.displayName.slice(0, 14) + "..."}
                </Typography>
              </Stack>
            </Button>
          </Tooltip>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Data de Criação",
      width: 180,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "updatedAt",
      headerName: "Data de Atualização",
      width: 180,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      field: "isActive",
      headerName: "Status",
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      description:
        "Esta coluna tem um renderCell de valor e não pode ser classificada ou filtrada.",
      width: 60,
      valueFormatter: (params) => (params.value ? "Ativo" : "Inativo"),
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            {params.value ? (
              <Tooltip title="Ativo">
                <CheckCircle color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Inativo">
                <Error color="error" />
              </Tooltip>
            )}
          </Stack>
        );
      },
    },
    {
      field: "action",
      headerName: "Opções",
      sortable: false,
      filterable: false,
      disableExport: true,
      headerAlign: "center",
      align: "center",
      description:
        "Esta coluna tem um renderCell de valor e não pode ser classificada ou filtrada.",
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => navigate(`./form/${params.row.id}`)}
              color="info"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => deteleCollection(params.row)}
              color="error"
            >
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const deteleCollection = async (collection: IBDProfileLevel) => {
    await deleteProfileLevel(collection.id);
    refresh();
  };

  return CheckAuthorize(memberOfModule) ? (
    <React.Fragment>
      <DataGridCustom
        rows={rows}
        getRowId={(row: IBDProfileLevel) => row.id}
        columns={columns}
        customButton={
          <React.Fragment>
            <Button
              color="success"
              startIcon={<Add />}
              size="small"
              onClick={() => navigate("./form")}
            >
              Adicionar Nível de Perfil
            </Button>
            <Button startIcon={<Refresh />} size="small" onClick={refresh}>
              Atualizar
            </Button>
          </React.Fragment>
        }
      />
      <TeamsMessageFormDialog
        title={titleFormDialog}
        isOpen={isOpenFormDialog}
        close={closeFormDialog}
        userId={userId}
      />
    </React.Fragment>
  ) : (
    <NotFoundOrUnauthorizedPage />
  );
};

export default BusinessDevelopmentProfileLevelPage;
