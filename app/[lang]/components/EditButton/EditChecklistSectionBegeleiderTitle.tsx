import React, { useState } from "react";
import AuthorizedRole from "../AuthorizedRole";
import { BsPencil } from "react-icons/bs";
import useStagairStore from "@/store";
import { IChecklistItem, IChecklistSection, UserRole, checklistSectionStagebegeleider } from "@/types";
import ChecklistitemSectionStagairTitleModal from "../../detail/[id]/ChecklistitemSectionStagairTitleModal";
import ChecklistItemSectionTitleBegeleider from "../../detail/[id]/ChecklistItemSectionTitleBegeleider";

interface EditChecklistSectionBegeleiderTitleProps {
  item: checklistSectionStagebegeleider;
  role: UserRole;
  userRole: UserRole;
  lang: string;
}

const EditChecklistSectionBegeleiderTitle: React.FC<EditChecklistSectionBegeleiderTitleProps> = ({
  item,
  role,
  userRole,
  lang
}) => {
  const openModal = () => {
    useStagairStore.setState({  //Zetten wij de item die weegeven in the parent
      checklistSectionBegeleider: item,
    });
    setDiv(true); //Dit zorgt ervoor dat de modal opengaat
  };


  const [showDiv, setDiv] = useState<boolean>(false);

  return (
    <AuthorizedRole role={role} userRole={userRole}>
      <button
        type="button"
        className="hover:text-gray-400 ml-auto"
        onClick={openModal}
      >
        <BsPencil className="text-xl" />
      </button>
      <ChecklistItemSectionTitleBegeleider 
        lang={lang}
        showDiv={showDiv}
        setDiv={setDiv}  //Door op de button te klikken is setDiv true 
      />
    </AuthorizedRole>
  );
};

export default EditChecklistSectionBegeleiderTitle;
