import * as React from "react";
import {
  DataGrid,
  DataGridProps,
  GridColumnHeaders,
  GridRow,
  GridRowIdGetter,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridValidRowModel,
  ptBR,
} from "@mui/x-data-grid";
import { Box, useMediaQuery, useTheme } from "@mui/material";
const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type RowData = {
  id: number | string;
};

interface DataGridCustomProps<T extends GridValidRowModel>
  extends Omit<DataGridProps, "getRowId"> {
  getRowId?: GridRowIdGetter<T>;
  rows: T[];
  columns: any[];
  customButton?: any;
  checkboxSelection?: boolean;
  isRowSelectable?: (params: GridRowParams) => boolean;
  onRowSelectionModelChange?: (
    newRowSelectionModel: GridRowSelectionModel
  ) => void;
  rowSelectionModel?: GridRowSelectionModel;
}
const DataGridCustom = <T extends RowData>({
  rows,
  columns,
  customButton,
  getRowId,
  checkboxSelection,
  isRowSelectable,
  onRowSelectionModelChange,
  rowSelectionModel,
}: DataGridCustomProps<T>) => {
  const theme = useTheme();
  const isVisibled = useMediaQuery(theme.breakpoints.up("sm"));
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        {customButton}
        {isVisibled && <GridToolbarColumnsButton />}
        {isVisibled && <GridToolbarFilterButton />}
        {isVisibled && <GridToolbarDensitySelector />}
        <GridToolbarExport
          csvOptions={{
            delimiter: ";",
            utf8WithBom: true,
          }}
          printOptions={{
            disableToolbarButton: true,
          }}
        />
      </GridToolbarContainer>
    );
  };

  return (
    <Box
      sx={{
        [theme.breakpoints.down("md")]: {
          width: `calc(100vw - ${theme.spacing(4)})`,
        },
      }}
    >
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={getRowId ?? ((row: T) => row.id)}
        slots={{
          toolbar: CustomToolbar,
          row: MemoizedRow,
          columnHeaders: MemoizedColumnHeaders,
        }}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        isRowSelectable={isRowSelectable}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        sx={{
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
            {
              outline: "none !important",
            },
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgb(37, 37, 38)"
              : "rgb(255, 255, 255)",

          padding: theme.spacing(2),
        }}
      />
    </Box>
  );
};
export default DataGridCustom;
