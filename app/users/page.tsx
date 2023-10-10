// import WelcomePage from "../components/WelcomePage";
"use client";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";

const UserLoginPage = () => {
  const { data, isLoading, error } = useStagebegeleiders();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!data || data.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserLoginPage;
