import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";

import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router";

import logo from "../../../assets/imgs/LogoMenu.png";
import { BusinessDevelopmentMenuItem } from "./BusinessDevelopmentMenuItem";

const Nav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
export interface MenuProps {
  handleDrawerClose: () => void;
}
export default function Menu(props: MenuProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const closeMenu = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: theme.palette.mode,
            primary: { main: "rgb(255, 255, 255)" },
            background: {
              paper:
                theme.palette.mode === "dark"
                  ? "rgb(37, 37, 38)"
                  : "rgb(255, 255, 255)",
            },
          },
        })}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 300,
            minWidth: 300,
            [theme.breakpoints.down("md")]: {
              maxWidth: "100%",
              minWidth: "100%",
            },
            borderRadius: 0,
          }}
        >
          <Nav component="nav" disablePadding>
            <Stack direction="row" justifyContent="flex" alignItems="center">
              <Button
                onClick={() => {
                  navigate("/home");
                  closeMenu && props.handleDrawerClose();
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
              >
                <img src={logo} alt="Portal RH" height="47px" />
              </Button>

              <IconButton onClick={props.handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </Stack>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton
                sx={{ height: 56 }}
                onClick={() => {
                  navigate("/home");
                  closeMenu && props.handleDrawerClose();
                }}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  primary="Início"
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                  sx={{ ml: 1 }}
                />
              </ListItemButton>
              <Tooltip title="Abrir configurações">
                <IconButton
                  size="large"
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                  onClick={() => {
                    navigate("/settings");
                    closeMenu && props.handleDrawerClose();
                  }}
                >
                  <Settings />
                  <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={{ pl: 2, pt: 1, pr: 2 }}
            >
              Modulos
            </Typography>
            <BusinessDevelopmentMenuItem
              closeMenu={closeMenu}
              handleDrawerClose={props.handleDrawerClose}
            />
          </Nav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
