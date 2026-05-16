import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface AuthProtectProps {
  children: ReactNode;
}

const Protected = ({ children }: AuthProtectProps) => {
  const { loading, user } = useAuth();

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  // if user not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if logged in
  return <>{children}</>;
};

export default Protected;