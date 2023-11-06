import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUsers from "./useUsers";
import { UserRole } from "@/types";

function useCheckAuthorizeUser() {
  const { data: session } = useSession();
  const { data: users, isLoading: usersLoading } = useUsers();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if session and users are loaded
    if (!session || !users || usersLoading) {
      setIsLoading(true); // Keep loading state true if data is not ready
      return; // Exit early if data is not ready
    }
    // Find user by email
    const user = users.find((user) => user.email === session.user?.email);
    if (user) {
      setRole(user.role); // Directly set the user role
    } else {
      console.error("User not found in the users data.");
    }
    setIsLoading(false); // Set loading state to false after processing
  }, [session, users, usersLoading]); // Depend on session, users, and usersLoading

  useEffect(() => {
    if (role !== null) {
      console.log("Role:", UserRole[role]);
      console.log("Role:", role);
    }
  }, [role]); // Depend only on role

  console.log(role)

  return { role, isLoading }; // Return both role and isLoading state
}

export default useCheckAuthorizeUser;
