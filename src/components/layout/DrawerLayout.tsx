import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import { useEffect } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

import Menu from "./Menu";
import AppBar from "./AppBar";
import { usePageTitle } from "../PageTitleProvider";

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type DrawerLayoutProps = {
  children: React.ReactNode;
};

export default function DrawerLayout({ children }: DrawerLayoutProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const [open, setOpen] = React.useState(false);
  const { pageTitle } = usePageTitle();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        sx={{
          [theme.breakpoints.down("md")]: { ...(open && { display: "none" }) },
        }}
      >
        <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      </Box>
      <Drawer variant={open ? "permanent" : "temporary"} open={open}>
        <Menu handleDrawerClose={handleDrawerClose} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flex: 1,
          [theme.breakpoints.down("md")]: { ...(open && { display: "none" }) },
        }}
      >
        <DrawerHeader />
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          sx={{
            pl: 2,
            pt: 1,
            [theme.breakpoints.up("sm")]: { display: "none" },
          }}
        >
          {pageTitle}
        </Typography>
        <Box
          sx={{ pl: 2, pr: 2, pb: 2, [theme.breakpoints.up("sm")]: { p: 2 } }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
