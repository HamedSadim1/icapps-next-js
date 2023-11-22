import StagiairDetailPage from "./StagiairDetailPage";

interface Params {
  params: {
    id: string;
  };
}

const StagiairDetail = ({ params: { id } }: Params) => {
  return (
    <StagiairDetailPage
      params={{
        id,
      }}
    />
  );
};

export default StagiairDetail;
