import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRole: string;
}

function ProtectedRoute({
  children,
  allowedRole
}: Props) {

  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;