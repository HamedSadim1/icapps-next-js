// "use client";
// import { FormEvent, useEffect, useState } from "react";
// import { MdSystemUpdateAlt } from "react-icons/md";
// import useStagair from "@/hooks/useStagair";
// import { inputFormDater } from "@/lib";

// interface Params {
//   params: { id: string };
// }
// const Edit = ({ params: { id } }: Params) => {
//   const { data } = useStagair(id);

//   const getNamesFromStagebegeleiderId = (stagebegeleiderId: string[]) => {
//     const filteredStagebegeleiders = stagebegeleiders.filter(
//       (stagebegeleider) => stagebegeleiderId.includes(stagebegeleider.id)
//     );
//     const filteredNames = filteredStagebegeleiders.map(
//       (stagebegeleider) => stagebegeleider.name
//     );
//     return filteredNames;
//   };

//   console.log(getNamesFromStagebegeleiderId(data.stagebegeleiderId));

//   const [showDiv, setDiv] = useState(false);

//   if (!data) return null;

//   return (
//     <>
//       {showDiv == false && (
//         <MdSystemUpdateAlt className="z-0" onClick={() => setDiv(true)} />
//       )}
//       {showDiv == true && (
//         <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
//           <div className="bg-white shadow-xl w-2/3 h-1/2 text-gray-500 z-2">
//             <button
//               className="float-left w-16 h-10 pb-3"
//               onClick={() => setDiv(false)}
//             >
//               X
//             </button>
//             <form onSubmit={handleSubmitForm}>
//               <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
//                 <div>
//                   <label className="text-gray-700" htmlFor="name">
//                     Naam
//                   </label>
//                   <input
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
//                     id="name"
//                     type="text"
//                     name="name"
//                     value={data.name}
//                     onChange={(e) => setData({ ...data, name: e.target.value })}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-700" htmlFor="email">
//                     Email
//                   </label>
//                   <input
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     onChange={(e) =>
//                       setData({ ...data, email: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-700" htmlFor="startDate">
//                     Start Datum
//                   </label>
//                   <input
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
//                     id="startDate"
//                     type="date"
//                     name="startDate"
//                     value={inputFormDater(data.startDate)}
//                     onChange={(e) =>
//                       setData({ ...data, startDate: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-700" htmlFor="endDate">
//                     Eind Datum
//                   </label>
//                   <input
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
//                     id="endDate"
//                     type="date"
//                     name="endDate"
//                     value={inputFormDater(data.endDate)}
//                     onChange={(e) =>
//                       setData({ ...data, endDate: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-700" htmlFor="stagebegeleider">
//                     Stagebegeleider
//                   </label>
//                   <select
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
//                     id="stagebegeleider"
//                     name="stagebegeleider"
//                     value={data.stagebegeleiderId}
//                     onChange={(e) => {
//                       const selectedOptions = Array.from(
//                         e.target.selectedOptions,
//                         (option) => option.value
//                       );
//                       setData({
//                         ...data,
//                         stagebegeleiderId: selectedOptions,
//                       });
//                       console.log(selectedOptions);
//                     }}
//                     multiple={true}
//                   >
//                     {stagebegeleiders.map((stagebegeleider) => (
//                       <option
//                         key={stagebegeleider.id}
//                         value={stagebegeleider.id}
//                       >
//                         {stagebegeleider.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() => (window.location.href = "/users/stagiair")}
//                     className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                     type="submit"
//                   >
//                     OPSLAAN
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default Edit;
