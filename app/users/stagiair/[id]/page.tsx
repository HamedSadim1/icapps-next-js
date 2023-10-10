"use client";
import { FormEvent, useEffect } from "react";
import useStagairStore from "@/store";

import Select from "react-select";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import useStagair from "@/hooks/useStagair";
import { inputFormDater } from "@/lib";

interface Params {
  params: { id: string };
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const StagairForm = ({ params: { id }, setIsModalOpen }: Params) => {
  // const [data, setData] = useState<IStagaire>({
  //   id: "",
  //   name: "",
  //   email: "",
  //   startDate: "",
  //   endDate: "",
  //   stagebegeleiderId: [] as string[],
  // });

  const { data: stagair } = useStagair(id);

  useEffect(() => {
    if (stagair) {
      useStagairStore.setState({ stagaires: stagair });
    }
  }, [stagair]);

  const data = useStagairStore((state) => state.stagaires);
  const setData = useStagairStore((state) => state.setStagaires);
  const { data: stagebegeleiders } = useStagebegeleiders();
  // const [stagebegeleiders, setStagebegeleiders] = useState<IStagebegeleider[]>(
  //   []
  // );
  // const [loading, setLoading] = useState<boolean>(true);
  // const [selected, setSelected] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // setLoading(false);
  //     const resp = await fetch(
  //       `http://localhost:3000/api/users/stagiair/${id}`,
  //       {
  //         cache: "no-cache",
  //       }
  //     );
  //     const data: IStagaire = await resp.json();
  //     // setData(data);
  //     useStagairStore.setState({ stagaires: data });

  //     console.log(data);
  //   };

  // const fetchStagebegeleiders = async () => {
  //   const resp = await fetch("http://localhost:3000/api/stagebegeleider", {
  //     cache: "no-cache",
  //   });
  //   const data: IStagebegeleider[] = await resp.json();
  //   setStagebegeleiders(data);

  //   setLoading(false);
  // };

  // fetchStagebegeleiders();

  //   fetchData();
  // }, [id]);

  const getNamesFromStagebegeleiderId = (stagebegeleiderId: string[]) => {
    const filteredStagebegeleiders = stagebegeleiders!.filter(
      (stagebegeleider) => stagebegeleiderId.includes(stagebegeleider.id)
    );
    const filteredNames = filteredStagebegeleiders.map(
      (stagebegeleider) => stagebegeleider.name
    );
    return filteredNames;
  };

  // console.log(getNamesFromStagebegeleiderId(data?.stagebegeleiderId!));

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isoStartDate = data.startDate
        ? new Date(data.startDate).toISOString()
        : "";
      const isoEndDate = data.endDate
        ? new Date(data.endDate).toISOString()
        : "";
      // Ensure stagebegeleiderId is an array of unique strings
      const stagebegeleiderIdArray = Array.isArray(data.stagebegeleiderId)
        ? data.stagebegeleiderId
        : [data.stagebegeleiderId];
      const response = await fetch(
        `http://localhost:3000/api/users/stagiair/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            startDate: isoStartDate,
            endDate: isoEndDate,
            stagebegeleiderId: stagebegeleiderIdArray,
          }),
        }
      );

      setIsModalOpen(false);

      window.location.reload();

      if (response.ok) {
        console.log("Data updated");
        window.location.reload();
      } else {
        console.error("error", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmitForm} method="dialog">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="name">
                Naam
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="startDate">
                Start Datum
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                id="startDate"
                type="date"
                name="startDate"
                value={inputFormDater(data.startDate)}
                onChange={(e) =>
                  setData({ ...data, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="endDate">
                Eind Datum
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                id="endDate"
                type="date"
                name="endDate"
                value={inputFormDater(data.endDate)}
                onChange={(e) => setData({ ...data, endDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="stagebegeleider">
                Stagebegeleider
              </label>

              <Select
                defaultValue={getNamesFromStagebegeleiderId(
                  data.stagebegeleiderId
                ).map((name) => ({
                  label: name,
                  value: name,
                }))}
                isMulti
                name="stagebegeleider"
                options={stagebegeleiders!.map((stagebegeleider) => ({
                  label: stagebegeleider.name,
                  value: stagebegeleider.id,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selected, actionMeta) => {
                  //! selectedOptions is an array of unique strings
                  const selectedOptions = Array.from(
                    new Set(selected.map((option) => option.value))
                  );
                  //! setData is an array of unique stagebegleiderIds
                  setData({
                    ...data,
                    stagebegeleiderId: selectedOptions,
                  });
                }}
              />
            </div>

            <div>
              <button
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                type="submit"
              >
                Opslaan
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default StagairForm;
