import { IMemberOf } from "./IMemberOf";
import { IPresence } from "./IPresence";

export interface IUser {
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: null;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  photo: string;
  presence: IPresence;
  memberOf: IMemberOf[];
}
