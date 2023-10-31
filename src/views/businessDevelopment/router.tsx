import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import DrawerLayout from "../../components/layout/DrawerLayout";
import BusinessDevelopmentPage from ".";
import BusinessDevelopmentProposalsPage from "./proposals";
import BusinessDevelopmentProposalsFormPage from "./proposals/form";
import BusinessDevelopmentOfficePage from "./office";
import BusinessDevelopmentOfficeFormPage from "./office/form";
import BusinessDevelopmentProfileLevelPage from "./profileLevel";
import BusinessDevelopmentProfileLevelFormPage from "./profileLevel/form";

const useBusinessDevelopmentRoutes = () => {
  const routers = React.useMemo(
    () => [
      {
        path: "/businessdevelopment",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/proposals",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentProposalsPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/proposals/form",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentProposalsFormPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/proposals/form/:id",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentProposalsFormPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/profilelevel",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentProfileLevelPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/profilelevel/form",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentProfileLevelFormPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/profilelevel/form/:id",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentProfileLevelFormPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/office",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentOfficePage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/office/form",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentOfficeFormPage />
              </DrawerLayout>
            }
          />
        ),
      },
      {
        path: "/businessdevelopment/office/form/:id",
        element: (
          <ProtectedRoute
            outlet={
              <DrawerLayout>
                <BusinessDevelopmentOfficeFormPage />
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

export default useBusinessDevelopmentRoutes;
