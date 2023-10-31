import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Computer } from "@mui/icons-material";
import { useParams } from "react-router-dom";

import GeneralPage from "./general";
import { usePageTitle } from "../../components/PageTitleProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <React.Fragment>{children}</React.Fragment>
        </Box>
      )}
    </div>
  );
}

function TabProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export interface SettingsPageProps {
  colorMode: any;
}

export default function SettingsPage(props: SettingsPageProps) {
  const { page } = useParams();
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Configurações");
  }, [setPageTitle]);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    switch (page) {
      case "general":
      default:
        setValue(0);
        break;
    }
  }, [page]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<Computer />}
            iconPosition="start"
            label="Geral"
            {...TabProps(0)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GeneralPage colorMode={props.colorMode} />
      </TabPanel>
    </Box>
  );
}
