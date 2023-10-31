import {
  Autocomplete,
  TextField,
  darken,
  lighten,
  styled,
} from "@mui/material";

export interface AutoCompleteCustomProps {
  title: string;
  required?: boolean;
  error?: string | null;
  list: readonly any[];
  selected: any;
  setSelected: (selected: any) => void;
}

const AutoCompleteCustom = (props: AutoCompleteCustomProps) => {
  //Options AutoComplete
  const options = props.list.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
  }));

  const GroupItems = styled("ul")({
    padding: 0,
  });

  return (
    <Autocomplete
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.label}
      fullWidth
      autoHighlight
      value={props.selected}
      onChange={(event: any, newValue: any | null) => {
        props.setSelected(newValue);
      }}
      noOptionsText={"Não encontrado..."}
      renderInput={(params) => (
        <TextField
          {...params}
          required={props.required}
          variant="filled"
          label={props.title}
          error={!!props.error}
          helperText={props.error || ""}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
};

export default AutoCompleteCustom;
