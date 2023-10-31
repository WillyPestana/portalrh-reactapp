import React, { useMemo, useState } from "react";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Add, CheckCircle, Delete, Edit, Error } from "@mui/icons-material";
import DataGridCustom from "../../../components/DataGridCustom";
import NotFoundOrUnauthorizedPage from "../../notFoundOrUnauthorized";
import { useMemberOf } from "../../../hooks/useMemberOf";
import { useNavigate } from "react-router";
import { usePageTitle } from "../../../components/PageTitleProvider";

const BusinessDevelopmentOfficePage = () => {
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Cargos");
  }, [setPageTitle]);

  const CheckAuthorize = useMemberOf();
  const memberOfModule = React.useMemo(
    () => ["PK.Administrator", "PK.BusinessDevelopmentAdministrator"],
    []
  );
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);

  useMemo(() => {
    setRows([{ id: 1, firstName: "Exemplo", lastName: "1", isActive: true }]);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Código", width: 100 },
    {
      field: "fullName",
      headerName: "Nome",
      description:
        "Esta coluna tem um getter de valor e não pode ser classificada.",
      sortable: false,
      width: 255,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            {params.row.isActive ? (
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
            <IconButton onClick={() => deteleData(params.row)} color="error">
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const deteleData = (data: any) => {
    console.log("Delete", data);
  };

  return CheckAuthorize(memberOfModule) ? (
    <React.Fragment>
      <DataGridCustom
        rows={rows}
        getRowId={(row: any) => row.id}
        columns={columns}
        customButton={
          <Button
            color="success"
            startIcon={<Add />}
            size="small"
            onClick={() => navigate("./form")}
          >
            Adicionar Cargo
          </Button>
        }
      />
    </React.Fragment>
  ) : (
    <NotFoundOrUnauthorizedPage />
  );
};

export default BusinessDevelopmentOfficePage;
