import React from "react";
import AuthPage from ".";

const useAuthRoutes = () => {
  const routers = React.useMemo(
    () => [
      {
        path: "/",
        element: <AuthPage />,
      },
    ],
    []
  );

  return routers;
};

export default useAuthRoutes;
