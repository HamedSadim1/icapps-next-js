import { VscChecklist } from "react-icons/vsc";
import AuthorizedRole from "../AuthorizedRole";
import { UserRole } from "@/types";
import getTranslation from "../getTranslation";
import { Locale } from "@/i18n-config";

interface Props {
  checkListName: string;
  setCheckListName: (checklist: string) => void;
  role: UserRole;
  userRole: UserRole;
  lang: string;
}

const CheckList = ({
  checkListName,
  setCheckListName,
  role,
  userRole,
  lang
}: Props) => {
  const translation = getTranslation(lang as Locale);
  return (
    <div className="flex justify-between mt-7 mb-5 ">
      <AuthorizedRole role={role} userRole={userRole}>
        <span className="flex gap-3">
          <VscChecklist className="text-3xl text-blue-400" />
          <h3 className="text-[1.3rem] font-medium">{translation.detail.checklist}</h3>
        </span>
        <span className="flex ">
          <button
            type="button"
            onClick={() => setCheckListName("checkListStagiair")}
            className={`rounded-l-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium  ${checkListName === "checkListStagiair" && "bg-[#002548] text-white"
              }`}
          >
            {translation.detail.intern}
          </button>
          <button
            onClick={() => setCheckListName("checklistStagebegeleider")}
            type="button"
            className={`rounded-r-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium ${checkListName === "checklistStagebegeleider" &&
              "bg-[#002548] text-white"
              }`}
          >
            {translation.detail.supervisor}
          </button>
        </span>
      </AuthorizedRole>
    </div>
  );
};

export default CheckList;
