import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export default function ProtectedRoute({ outlet }: ProtectedRouteProps) {
  const { accounts } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    if (accounts.length === 0) {
      navigate("/", { replace: true });
    }
  }, [accounts, navigate]);

  return outlet;
}
