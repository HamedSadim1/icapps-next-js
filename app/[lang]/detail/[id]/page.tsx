import StagiairDetailPage from "./StagiairDetailPage";

interface Params {
  params: {
    id: string,
    lang: string
  };
}

const StagiairDetail = ({ params: { lang,id } }: Params) => {
  return (
    <StagiairDetailPage
      params={{
        lang,
        id,
      }}
    />
  );
};

export default StagiairDetail;
