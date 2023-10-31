/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import useApi from "../api";
import { IChatTypeOneToOne } from "./interfaces/IChatTypeOneToOne";

export const useTeamsService = () => {
  const api = useApi();
 

  async function chatTypeOneToOne(model: IChatTypeOneToOne): Promise<number> {
    try {
      const response = await api.post(
        "/Teams/ChatTypeOneToOne",
        model
      );
      return response.status;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  return { chatTypeOneToOne };
};
