interface UserDetailPageProps {
  params: { id: string; name: string };
}

const UserDetailPage = ({ params: { id } }: UserDetailPageProps) => {
  return (
    <div>
      <h2>UserDetailPage</h2>
      {id}
    </div>
  );
};

export default UserDetailPage;
