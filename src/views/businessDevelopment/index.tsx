import * as React from "react";
import { useMemberOf } from "../../hooks/useMemberOf";
import NotFoundOrUnauthorizedPage from "../notFoundOrUnauthorized";
import { Typography } from "@mui/material";
import { usePageTitle } from "../../components/PageTitleProvider";

const BusinessDevelopmentPage = () => {
  const { setPageTitle } = usePageTitle();

  React.useEffect(() => {
    setPageTitle("Desenvolvimento de Negócios");
  }, [setPageTitle]);

  const CheckAuthorize = useMemberOf();

  const memberOfModule = React.useMemo(
    () => [
      "PK.Administrator",
      "PK.BusinessDevelopment",
      "PK.BusinessDevelopmentAdministrator",
    ],
    []
  );

  return CheckAuthorize(memberOfModule) ? (
    <Typography variant="body1"></Typography>
  ) : (
    <NotFoundOrUnauthorizedPage />
  );
};
export default BusinessDevelopmentPage;
