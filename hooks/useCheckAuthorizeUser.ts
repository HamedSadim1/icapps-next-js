import { UserRole } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useUsers from "./useUsers";

//? This hook checks if the user is logged in and if the user is an admin, stagebegeleider or stagiair.
function useCheckAuthorizeUser() {
  const { data: session } = useSession();
  const { data: users } = useUsers();
  const [role, setRole] = useState<UserRole>(UserRole.STAGIAIR);

  if (session && session.user && users) {
    const user = users.find((user) => user.email === session!.user!.email);

    if (user) {
      if (user.role === UserRole.ADMIN) {
        setRole(UserRole.ADMIN);
      } else if (user.role === UserRole.STAGEBEGELEIDER) {
        setRole(UserRole.STAGEBEGELEIDER);
      } else if (user.role === UserRole.STAGIAIR) {
        setRole(UserRole.STAGIAIR);
      }
    }
  }

  return role;
}

export default useCheckAuthorizeUser;
