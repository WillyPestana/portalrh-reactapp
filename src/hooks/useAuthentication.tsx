import { useEffect, useState } from "react";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = () => {
      const storedProfile = localStorage.getItem("profile");
      setIsAuthenticated(!!storedProfile);
    };

    checkAuthentication();
    // Assumindo que você deseja atualizar o status de autenticação sempre que houver alterações nas contas
  }, []);

  return isAuthenticated;
};

export default useAuthentication;
