import { IUserCollection } from "../../../interfaces/IUserCollection";

export interface IBDProfileLevel {
  id: string;
  name: string;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user: IUserCollection;
}
