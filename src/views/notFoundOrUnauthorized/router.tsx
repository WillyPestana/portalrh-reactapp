import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import DrawerLayout from "../../components/layout/DrawerLayout";
import useAuthentication from "../../hooks/useAuthentication";
import NotFoundOrUnauthorizedPage from ".";

const useNotFoundOrUnauthorizedRoutes = () => {
  const isAuthenticated = useAuthentication();
  const routers = React.useMemo(
    () => [
      {
        path: "/*",
        element: (
          <ProtectedRoute
            outlet={
              isAuthenticated ? (
                <DrawerLayout>
                  <NotFoundOrUnauthorizedPage />
                </DrawerLayout>
              ) : (
                <NotFoundOrUnauthorizedPage />
              )
            }
          />
        ),
      },
    ],
    [isAuthenticated]
  );

  return routers;
};

export default useNotFoundOrUnauthorizedRoutes;
