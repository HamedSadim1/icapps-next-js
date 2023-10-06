import { IStagaire } from "@/types";

const StagiairPage = async () => {
  const res = await fetch("http://localhost:3000/api/users/stagiair");
  const data: IStagaire[] = await res.json();

  return (
    <>
      {data.map((item) => (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <h1>{item.email}</h1>
          <h1>{item.startDate.toString()}</h1>
          <h1>{item.endDate.toString()}</h1>
          <h1>{item.stagebegeleiderId}</h1>
        </div>
      ))}
    </>
  );
};

export default StagiairPage;
