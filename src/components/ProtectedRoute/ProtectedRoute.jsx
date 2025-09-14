import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ProtectedRoute({
  children,
  anonymous = false,
  isLoading,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(CurrentUserContext);
  if (isLoading) {
    return <p>Checking the weather...</p>;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
