import { IStagaire, IStagebegeleider } from "@/types";

const StagiairPage = async () => {
  async function fetchData() {
    try {
      const respStagebegeleiders = await fetch(
        "http://localhost:3000/api/users/stagebegeleider"
      );
      const stagebegeleidersData: IStagebegeleider[] =
        await respStagebegeleiders.json();

      const respStagaire = await fetch(
        "http://localhost:3000/api/users/stagiair"
      );
      const stagiairData: IStagaire[] = await respStagaire.json();

      console.log(stagiairData.map((s) => s));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();

  return (
    <div>
      <h1>Stagiaires</h1>
      <table>
        <thead>
          <tr>
            <th>Naam</th>
            <th>Email</th>
            <th>Startdatum</th>
            <th>Einddatum</th>
            <th>Stagebegeleider</th>
          </tr>
        </thead>
        <tbody>
          {/* {stagiairData.map((stagiair) => (
            <tr key={stagiair.id}>
              <td>{stagiair.name}</td>
              <td>{stagiair.email}</td>
              <td>{stagiair.startDate.toLocaleDateString()}</td>
              <td>{stagiair.endDate.toLocaleDateString()}</td>
              <td>{stagiair.stagebegeleiderId.map((s) => s)}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default StagiairPage;
