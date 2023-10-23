interface Params {
  params: { id: string };
}
const EditPost = ({ params: { id } }: Params) => {
  return <div>{id}</div>;
};

export default EditPost;
