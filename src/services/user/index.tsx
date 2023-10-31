/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { IUser } from "./interfaces/IUser";
import { IPresence } from "./interfaces/IPresence";
import useApi from "../api";

export const useUserService = () => {
  const api = useApi();
  async function getProfile(): Promise<IUser> {
    try {
      const response = await api.get("/User/Profile");
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  async function getProfileById(userId: string): Promise<IUser> {
    try {
      const response = await api.get(`/User/ProfileById/${userId}`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  async function getPresence(): Promise<IPresence> {
    try {
      const response = await api.get(`/User/Presence`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  return { getProfile, getPresence, getProfileById };
};
