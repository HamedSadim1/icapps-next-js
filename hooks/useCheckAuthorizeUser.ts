import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUsers from "./useUsers";
import { UserRole } from "@/types";
import useStagairStore from "@/store";

function useCheckAuthorizeUser() {
  const { data: session } = useSession();
  const { data: users, isLoading: usersLoading } = useUsers();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Check if session and users are loaded
    if (!session || !users || usersLoading) {
      setIsLoading(true); // Keep loading state true if data is not ready
      return; // Exit early if data is not ready
    }
    // Find user by email
    const user = users.find((user) => user.email === session.user?.email);
    if (user) {
      setUserEmail(user.email);
      setRole(user.role); // Directly set the user role
      useStagairStore.setState({ role: user.role });
    } else {
      console.error("User not found in the users data.");
    }
    setIsLoading(false); // Set loading state to false after processing
  }, [session, users, usersLoading]); // Depend on session, users, and usersLoading

  return { role, isLoading, userEmail }; // Return both role and isLoading state
}

export default useCheckAuthorizeUser;
