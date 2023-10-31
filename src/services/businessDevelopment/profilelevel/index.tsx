/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import useApi from "../../api";
import { IBDProfileLevel } from "./interfaces/IBDProfileLevel";
import { IBDProfileLevelOptions } from "./interfaces/IBDProfileLevelOptions";

export const useBusinessDevelopmentService = () => {
  const api = useApi();
  async function getProfileLevel(): Promise<IBDProfileLevel[]> {
    try {
      const response = await api.get(`/BusinessDevelopment/ProfileLevel`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }
  async function getProfileLevelOptions(): Promise<IBDProfileLevelOptions[]> {
    try {
      const response = await api.get(`/BusinessDevelopment/ProfileLevelOptions`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  async function getProfileLevelById(Id: string): Promise<IBDProfileLevel> {
    try {
      const response = await api.get(`/BusinessDevelopment/ProfileLevel/${Id}`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  async function setProfileLevel(collection: IBDProfileLevel): Promise<number> {
    try {
      const response = await api.post(
        "/BusinessDevelopment/ProfileLevel",
        collection
      );
      return response.status;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  async function updateProfileLevel(
    collection: IBDProfileLevel
  ): Promise<number> {
    try {
      const response = await api.put(
        "/BusinessDevelopment/ProfileLevel",
        collection
      );
      return response.status;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  async function deleteProfileLevel(Id: string): Promise<number> {
    try {
      const response = await api.delete(
        `/BusinessDevelopment/ProfileLevelLogic/${Id}`
      );
      return response.status;
    } catch (error: AxiosError | any) {
      return error.response.data.status;
    }
  }

  return {
    getProfileLevel,
    getProfileLevelOptions,
    getProfileLevelById,
    setProfileLevel,
    updateProfileLevel,
    deleteProfileLevel,
  };
};
