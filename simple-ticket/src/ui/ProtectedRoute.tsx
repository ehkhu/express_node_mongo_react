import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "@/hooks/auth";
import { ReactNode } from "react";

function ProtectedRoute({children}:{children:ReactNode}) {
  const navigate = useNavigate();
  const {isAuthenticated,user } = useAuth();

  useEffect(
   function () {
    // console.log("user ",user);
      if (!isAuthenticated()) {
             navigate("/login");
        }
    },
    [isAuthenticated,user, navigate]
  );
  if (isAuthenticated()) return children;
}

export default ProtectedRoute;
