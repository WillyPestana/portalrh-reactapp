import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import DrawerLayout from "../../components/layout/DrawerLayout";
import SettingsPage from ".";

export interface useSettingsRoutesProps {
  colorMode: any;
}

const useSettingsRoutes = (props: useSettingsRoutesProps) => {
  const routers = React.useMemo(
    () => [
      {
        path: "/settings",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <SettingsPage colorMode={props.colorMode} />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/settings/:page",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <SettingsPage colorMode={props.colorMode} />
              </DrawerLayout>
            }
          />
        ),
      },
    ],
    [props.colorMode]
  );

  return routers;
};

export default useSettingsRoutes;
