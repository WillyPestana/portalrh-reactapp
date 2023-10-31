import React, { createContext, useContext, useEffect, useState } from "react";

interface PageTitleContextProps {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextProps>({
  pageTitle: "",
  setPageTitle: () => {},
});

export const PageTitleProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    document.title = `Portal RH - ${pageTitle}`; // Atualiza o título da página ao pressionar F5
  }, [pageTitle]);

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = (): PageTitleContextProps =>
  useContext(PageTitleContext);
