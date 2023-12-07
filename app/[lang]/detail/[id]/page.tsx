import StagiairDetailPage from "./StagiairDetailPage";

interface Params {
  params: {
    id: string;
    lang: string;
  };
}

const StagiairDetail = ({ params: { id,lang } }: Params) => {
  return (
    <StagiairDetailPage
      params={{
        id,lang
      }}
    />
  );
};

export default StagiairDetail;
