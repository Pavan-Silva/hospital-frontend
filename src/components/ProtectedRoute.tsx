import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element,
  roles,
}: {
  element: React.ReactNode;
  roles?: string[];
}) => {
  const auth = useAuth();

  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles?.includes(auth.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
