import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  return children;
}

export default ProtectedRoute;
