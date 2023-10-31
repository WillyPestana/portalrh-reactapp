import useProfile from "./useProfile";

export const useMemberOf = () => {
  const profile = useProfile();

  const CheckAuthorize = (memberOf: string[]): boolean => {
    return memberOf.some((value) =>
      profile?.memberOf.some((f) => f.displayName === value)
    );
  };

  return CheckAuthorize;
};
