import { VscChecklist } from "react-icons/vsc";

interface Props {
  checkListName: string;
  setCheckListName: (checklist: string) => void;
}

const CheckList = ({ checkListName, setCheckListName }: Props) => {
  return (
    <div className="flex justify-between mt-7 mb-5 ">
      <span className="flex gap-3">
        <VscChecklist className="text-3xl text-blue-400" />
        <h3 className="text-[1.3rem] font-medium">Checklist</h3>
      </span>
      <span className="flex ">
        <button
          type="button"
          onClick={() => setCheckListName("checkListStagiair")}
          className={`rounded-l-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium  ${
            checkListName === "checkListStagiair" && "bg-[#002548] text-white"
          }`}
        >
          Stagiair
        </button>
        <button
          onClick={() => setCheckListName("checklistStagebegeleider")}
          type="button"
          className={`rounded-r-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium ${
            checkListName === "checklistStagebegeleider" &&
            "bg-[#002548] text-white"
          }`}
        >
          Begeleider
        </button>
      </span>
    </div>
  );
};

export default CheckList;
