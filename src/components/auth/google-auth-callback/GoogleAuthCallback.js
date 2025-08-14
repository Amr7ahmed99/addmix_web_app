import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token) {
      authContext.storeJWT(token, user);
      navigate("/welcome", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location, navigate, authContext]);

  return <p>Signing you in with Google...</p>;
}
