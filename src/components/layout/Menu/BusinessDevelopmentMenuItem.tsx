import React, { useState } from "react";
import { useMemberOf } from "../../../hooks/useMemberOf";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  CurrencyExchange,
  Home,
  KeyboardArrowDown,
  MilitaryTech,
  People,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
export interface BusinessDevelopmentMenuItemProps {
  handleDrawerClose: () => void;
  closeMenu: boolean;
}
export const BusinessDevelopmentMenuItem = (
  props: BusinessDevelopmentMenuItemProps
) => {
  const [open, setOpen] = useState(true);
  const CheckAuthorize = useMemberOf();
  const navigate = useNavigate();

  const memberOfModule = React.useMemo(
    () => [
      "PK.Administrator",
      "PK.BusinessDevelopment",
      "PK.BusinessDevelopmentAdministrator",
    ],
    []
  );

  const memberOfAdminModule = React.useMemo(
    () => ["PK.Administrator", "PK.BusinessDevelopmentAdministrator"],
    []
  );

  const MenuItemButton = React.useMemo(
    () => [
      {
        icon: <Home />,
        label: "Início",
        to: "/businessdevelopment",
        memberOf: memberOfModule,
      },
      {
        icon: <CurrencyExchange />,
        label: "Propostas",
        to: "/businessdevelopment/proposals",
        memberOf: memberOfModule,
      },
      {
        icon: <MilitaryTech />,
        label: "Nível de Perfil",
        to: "/businessdevelopment/profilelevel",
        memberOf: memberOfAdminModule,
      },
      {
        icon: <People />,
        label: "Cargos",
        to: "/businessdevelopment/office",
        memberOf: memberOfAdminModule,
      },
    ],
    [memberOfAdminModule, memberOfModule]
  );

  return CheckAuthorize(memberOfModule) ? (
    <Box
      sx={{
        bgcolor: open ? "rgba(255, 255, 255, 0.08)" : null,
        pb: open ? 2 : 0,
        m: 2,
        borderRadius: 2,
      }}
    >
      <ListItemButton
        alignItems="flex-start"
        onClick={() => setOpen(!open)}
        sx={{
          px: 3,
          pt: 2.5,
          pb: open ? 0 : 2.5,
          borderRadius: 2,
          "&:hover, &:focus": {
            ...(open && { "& svg": { opacity: 1 } }),
            ...(open && { backgroundColor: "transparent" }),
          },
        }}
      >
        <ListItemText
          primary="Desenvolvimento de Negócios"
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: "medium",
            lineHeight: "20px",
            mb: "2px",
          }}
          secondary="Business Development"
          secondaryTypographyProps={{
            noWrap: true,
            fontSize: 12,
            lineHeight: "16px",
          }}
          sx={{ my: 0 }}
        />
        <KeyboardArrowDown
          sx={{
            mr: -1,
            opacity: 0,
            transform: open ? "rotate(-180deg)" : "rotate(0)",
            transition: "0.2s",
          }}
        />
      </ListItemButton>
      {open &&
        MenuItemButton.map((item) =>
          CheckAuthorize(item.memberOf) ? (
            <ListItemButton
              key={item.label}
              sx={{ py: 0, minHeight: 32 }}
              onClick={() => {navigate(item.to); props.closeMenu && props.handleDrawerClose();}}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          ) : null
        )}
    </Box>
  ) : null;
};
