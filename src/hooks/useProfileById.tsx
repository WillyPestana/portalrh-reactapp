import { useEffect, useState } from "react";

import { IUser } from "../services/user/interfaces/IUser";
import { useUserService } from "../services/user";

export const useProfileById = (userId: string): IUser | null => {
  const { getProfileById } = useUserService();
  const [profile, setProfile] = useState<IUser | null>(null);

  const fetchProfileLevel = async () => {
    try {
      if (userId === "") return;
      const response = await getProfileById(userId);
      if (response) {
        setProfile(response);
      }
    } catch (error) {
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfileLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return profile;
};
