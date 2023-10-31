import { useEffect, useState } from "react";
import { useUserService } from "../services/user";

export const usePresence = () => {
  const { getPresence } = useUserService();
  const [colorPresence, setColorPresence] = useState("");
  const [statusPresence, setStatusPresence] = useState("");

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const presence = await getPresence();
        if (presence) {
          setColorPresence(getColorFromAvailability(presence.availability));
          setStatusPresence(getStatusFromActivity(presence.activity));
        }
      } catch (error) {
        // Tratar erros, se necessário
      }
    };

    fetchPresence();
  }, [getPresence]);

  const getColorFromAvailability = (availability: string): string => {
    switch (availability) {
      case "Available":
        return "#44b700";
      case "Busy":
      case "DoNotDisturb":
        return "#cc0000";
      case "BeRightBack":
      case "Away":
        return "#f1c232";
      case "Offline":
      default:
        return "#bcbcbc";
    }
  };

  const getStatusFromActivity = (activity: string): string => {
    switch (activity) {
      case "Available":
        return "Disponível";
      case "Busy":
        return "Ocupado";
      case "InACall":
        return "Ao Telefone";
      case "DoNotDisturb":
        return "Não incomodar";
      case "Presenting":
        return "Apresentando";
      case "BeRightBack":
        return "Volto logo";
      case "Away":
        return "Aparecer como ausente";
      case "Offline":
        return "Invisível";
      default:
        return activity;
    }
  };

  return { colorPresence, statusPresence };
};
