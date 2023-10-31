import { useEffect, useState } from "react";
import { IBDProfileLevel } from "../../../services/businessDevelopment/profilelevel/interfaces/IBDProfileLevel";
import { useBusinessDevelopmentService } from "../../../services/businessDevelopment/profilelevel";

export const useBusinessDevelopmentProfileLevel = (): [
  IBDProfileLevel[],
  () => void
] => {
  const { getProfileLevel } = useBusinessDevelopmentService();
  const [rows, setRows] = useState<IBDProfileLevel[]>([]);

  const fetchProfileLevel = async () => {
    try {
      const profileLevel = await getProfileLevel();
      if (profileLevel) {
        setRows(profileLevel);
      }
    } catch (error) {
      setRows([]);
    }
  };

  const requestUpdate = () => {
    fetchProfileLevel();
  };

  useEffect(() => {
    fetchProfileLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [rows, requestUpdate];
};
