import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import DrawerLayout from "../../components/layout/DrawerLayout";
import HomePage from ".";

const useHomeRoutes = () => {
  const routers = React.useMemo(
    () => [
      {
        path: "/home",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <HomePage />
              </DrawerLayout>
            }
          />
        ),
      },
    ],
    []
  );

  return routers;
};

export default useHomeRoutes;
