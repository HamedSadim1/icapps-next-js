import { UserRole } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useUser from "@/hooks/useUser";

function useCheckAuthorizeUser(id: string) {
  const { data: session } = useSession();

  const [role, setRole] = useState<UserRole>(UserRole.STAGIAIR);
  const { data: user } = useUser(id);

  if (session && user) {
    if (session.user!.email === user.email && user.role === UserRole.ADMIN) {
      setRole(UserRole.ADMIN);
    }

    if (
      session.user!.email === user.email &&
      user.role === UserRole.STAGEBEGELEIDER
    ) {
      setRole(UserRole.STAGEBEGELEIDER);
    }

    if (session.user!.email === user.email && user.role === UserRole.STAGIAIR) {
      setRole(UserRole.STAGIAIR);
    }
  }
  return role;
}

export default useCheckAuthorizeUser;
