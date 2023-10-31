import { useEffect, useState } from "react";
import { useBusinessDevelopmentService } from "../../../services/businessDevelopment/profilelevel";
import { IBDProfileLevelOptions } from "../../../services/businessDevelopment/profilelevel/interfaces/IBDProfileLevelOptions";

export const useBusinessDevelopmentProfileLevelOptions =
  (): IBDProfileLevelOptions[] => {
    const { getProfileLevelOptions } = useBusinessDevelopmentService();
    const [rows, setRows] = useState<IBDProfileLevelOptions[]>([]);

    const fetchProfileLevel = async () => {
      try {
        const profileLevel = await getProfileLevelOptions();
        if (profileLevel) {
          setRows(profileLevel);
        }
      } catch (error) {
        setRows([]);
      }
    };

    useEffect(() => {
      fetchProfileLevel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return rows;
  };
