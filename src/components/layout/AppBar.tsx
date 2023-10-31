import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logout from "@mui/icons-material/Logout";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  CardHeader,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useProfile from "../../hooks/useProfile";
import { useMsal } from "@azure/msal-react";
import { CustomCircularProgressFullScreen } from "../CustomCircularProgress";
import { useNavigate } from "react-router";
import logo from "../../assets/imgs/LogoMenu.png";
import { usePresence } from "../../hooks/usePresence";
import StyledBadge from "../StyledBadge";
import { usePageTitle } from "../PageTitleProvider";

const drawerWidth = 300;

interface AppBarPropsCustom extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarPropsCustom>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function MenuAppBar(props: AppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { instance } = useMsal();
  const profile = useProfile();
  const navigate = useNavigate();
  const { colorPresence, statusPresence } = usePresence();
  const { pageTitle } = usePageTitle();
  const isScreenSM = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = async () => {
    await instance.logoutRedirect();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      {profile === null && <CustomCircularProgressFullScreen />}
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
        <AppBar
          position="fixed"
          sx={{ backgroundImage: "none", boxShadow: "none" }}
          open={props.open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerOpen}
              sx={{
                ...(props.open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                ...(props.open && { display: "none" }),
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                divider={
                  !isScreenSM && <Divider orientation="vertical" flexItem />
                }
              >
                <Button onClick={() => navigate("/home")}>
                  <img src={logo} alt="Portal RH" height="47px" />
                </Button>
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{
                    pt: 2,
                    [theme.breakpoints.down("md")]: { display: "none" },
                  }}
                >
                  {pageTitle}
                </Typography>
              </Stack>
            </Box>

            <Typography
              variant="overline"
              gutterBottom
              sx={{
                flexGrow: 1,
                pt: 1,
                [theme.breakpoints.down("md")]: { display: "none" },
                ...(!props.open && { display: "none" }),
              }}
            >
              {pageTitle}
            </Typography>

            <React.Fragment>
              <Tooltip title={profile?.displayName}>
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    p: 0,
                    [theme.breakpoints.down("md")]: {
                      ...(props.open && { display: "none" }),
                    },
                  }}
                >
                  <StyledBadge
                    theme={theme}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    colorhex={colorPresence}
                  >
                    <Avatar src={profile?.photo} alt={profile?.displayName} />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background: "transparent",
                  }}
                >
                  <Box>
                    <CardHeader
                      avatar={
                        <StyledBadge
                          theme={theme}
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                          colorhex={colorPresence}
                        >
                          <Avatar
                            src={profile?.photo}
                            sx={{ width: 56, height: 56 }}
                            alt={profile?.displayName}
                          />
                        </StyledBadge>
                      }
                      title={profile?.displayName}
                      subheader={
                        <React.Fragment>
                          <Typography
                            variant="caption"
                            component="span"
                            display="block"
                          >
                            {profile?.mail}
                          </Typography>
                          <Typography
                            variant="caption"
                            component="span"
                            display="block"
                          >
                            {statusPresence}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Box>
                  <MenuList>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>Sair</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Menu>
            </React.Fragment>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  );
}
