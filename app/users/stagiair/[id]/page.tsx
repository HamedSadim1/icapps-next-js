"use client";
import Link from "next/link";
import { IStagaire, IStagebegeleider } from "@/types";
import { FormEvent, useEffect, useState } from "react";

interface Params {
  params: { id: string };
}
const StagairForm = ({ params: { id } }: Params) => {
  const [data, setData] = useState<IStagaire>({
    id: "",
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    stagebegeleiderId: [],
  });

  const [stagebegeleiders, setStagebegeleiders] = useState<IStagebegeleider[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `http://localhost:3000/api/users/stagiair/${id}`,
        {
          cache: "no-cache",
        }
      );
      const data: IStagaire = await resp.json();
      setData(data);
      console.log(data);
    };

    const fetchStagebegeleiders = async () => {
      const resp = await fetch("http://localhost:3000/api/stagebegeleider", {
        cache: "no-cache",
      });
      const data: IStagebegeleider[] = await resp.json();
      setStagebegeleiders(data);
    };

    fetchStagebegeleiders();

    fetchData();
  }, [id]);

  const getNamesFromStagebegeleiderId = (stagebegeleiderId: string[]) => {
    const filteredStagebegeleiders = stagebegeleiders.filter(
      (stagebegeleider) => stagebegeleiderId.includes(stagebegeleider.id)
    );
    const filteredNames = filteredStagebegeleiders.map(
      (stagebegeleider) => stagebegeleider.name
    );
    return filteredNames;
  };

  console.log(getNamesFromStagebegeleiderId(data.stagebegeleiderId));

  const inputFormDater = (date: string | null): string => {
    if (!date) {
      return "";
    }

    const dateObject: Date = new Date(date);
    if (isNaN(dateObject.getTime())) {
      return "";
    }

    const year: number = dateObject.getFullYear();
    const month: number = dateObject.getMonth() + 1; // Note: January is 0
    const day: number = dateObject.getDate();

    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

    const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isoStartDate = data.startDate
        ? new Date(data.startDate).toISOString()
        : "";
      const isoEndDate = data.endDate
        ? new Date(data.endDate).toISOString()
        : "";

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
            stagebegeleiderId: [
              ...data.stagebegeleiderId,
              data.stagebegeleiderId,
            ],
          }),
        }
      );

      if (response.ok) {
        console.log("Data updated");
      } else {
        console.error("error", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center ">
      <div>
        <Link href="/users/stagiair">Terug</Link>
      </div>
      <form onSubmit={handleSubmitForm}>
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
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
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
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              id="stagebegeleider"
              name="stagebegeleider"
              value={data.stagebegeleiderId}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setData({
                  ...data,
                  stagebegeleiderId: selectedOptions,
                });
                console.log(selectedOptions);
              }}
              multiple={true}
            >
              <option selected>Kies een stagebegeleider</option>
              {stagebegeleiders.map((stagebegeleider) => (
                <option key={stagebegeleider.id} value={stagebegeleider.id}>
                  {stagebegeleider.name}
                </option>
              ))}
            </select>
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
  );
};

export default StagairForm;
