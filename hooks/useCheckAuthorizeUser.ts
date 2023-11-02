import { UserRole } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useUsers from "./useUsers";

//? This hook checks if the user is logged in and if the user is an admin, stagebegeleider or stagiair.
function useCheckAuthorizeUser() {
  //? Get the session from next-auth
  const { data: session } = useSession();
  //? Set the role to stagiair by default
  const [role, setRole] = useState<UserRole>(UserRole.STAGIAIR);
  //? Get the users from the database
  const { data: users } = useUsers();
  //? If the user is logged in and the user is an admin, stagebegeleider or stagiair, set the role to the correct role.
  const user = users?.find((user) => user.email === session!.user!.email);

  if (session && session.user && user) {
    if (session.user.email === user.email && user.role === UserRole.ADMIN) {
      setRole(UserRole.ADMIN);
    }

    if (
    
      session.user.email === user.email &&
      user.role === UserRole.STAGEBEGELEIDER
    ) {
      setRole(UserRole.STAGEBEGELEIDER);
    }

    if (session.user.email === user.email && user.role === UserRole.STAGIAIR) {
      setRole(UserRole.STAGIAIR);
    }
  }
  return role;
}

export default useCheckAuthorizeUser;
