import React, { ReactNode } from "react";
import { UserRole } from "@/types";

interface AuthorizedRoleProps {
  role: UserRole;
  userRole: UserRole;
  children: ReactNode;
}

const AuthorizedRole: React.FC<AuthorizedRoleProps> = ({
  userRole,
  children,
  role,
}) => {
  return <>{userRole === role ? children : null}</>;
};

export default AuthorizedRole;
