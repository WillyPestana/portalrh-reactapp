import { useEffect, useState } from "react";
import { useUserService } from "../services/user";
import { IUser } from "../services/user/interfaces/IUser";
import { useMsal } from "@azure/msal-react";

const useProfile = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const { getProfile } = useUserService();
  const { accounts } = useMsal();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      if (accounts.length > 0) {
        getProfile().then((newProfile) => {
          setProfile(newProfile);
          localStorage.setItem("profile", JSON.stringify(newProfile));
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return profile;
};

export default useProfile;
