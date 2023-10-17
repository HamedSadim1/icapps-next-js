import StagairForm from "./StagairForm";
interface Params {
  params: { id: string };
}

const StagiareTable = ({ params: { id } }: Params) => {
  return <StagairForm params={{ id: id }} />;
};

export default StagiareTable;
