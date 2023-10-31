import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import BusinessDevelopmentPageBanner from "../../assets/imgs/BusinessDevelopmentPage_Banner.jpg";

import { useNavigate } from "react-router";
import { useMemberOf } from "../../hooks/useMemberOf";
import { usePageTitle } from "../../components/PageTitleProvider";
const HomePage = () => {
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Início");
  }, [setPageTitle]);

  const navigate = useNavigate();
  const CheckAuthorize = useMemberOf();

  const ModuleActions = React.useMemo(
    () => [
      {
        banner: BusinessDevelopmentPageBanner,
        title: "Desenvolvimento de Negócios",
        subtitle: "Business Development",
        description: "Cadastro de cargos, elaboração de propostas...",
        to: "/businessdevelopment",
        memberOf: [
          "PK.Administrator",
          "PK.BusinessDevelopment",
          "PK.BusinessDevelopmentAdministrator",
        ],
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      {ModuleActions.map((item, index) =>
        CheckAuthorize(item.memberOf) ? (
          <Grid
            key={index}
            {...{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
            minHeight={160}
          >
            <Card
              sx={(theme) => ({
                ...(theme.palette.mode === "dark" && {
                  backgroundColor: "rgb(37, 37, 38)",
                }),
              })}
            >
              <CardActionArea onClick={() => navigate(item.to)}>
                <CardMedia
                  component="img"
                  image={item.banner}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {item.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ) : null
      )}
    </Grid>
  );
};

export default HomePage;
