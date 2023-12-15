import React, { useState } from "react";
import AuthorizedRole from "../AuthorizedRole";
import { BsPencil } from "react-icons/bs";
import useStagairStore from "@/store";
import { IChecklistItem, IChecklistSection, UserRole } from "@/types";
import ChecklistitemSectionStagairTitleModal from "../../detail/[id]/ChecklistitemSectionStagairTitleModal";

interface EditChecklistSectionStagairTitleProps {
  item: IChecklistSection;
  role: UserRole;
  userRole: UserRole;
  lang: string;
}

const EditChecklistSectionStagairTitle: React.FC<EditChecklistSectionStagairTitleProps> = ({
  item,
  role,
  userRole,
  lang
}) => {
  const openModal = () => {
    useStagairStore.setState({  //Zetten wij de item die weegeven in the parent
      checklistSection: item,
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
      <ChecklistitemSectionStagairTitleModal 
        lang={lang}
        showDiv={showDiv}
        setDiv={setDiv}  //Door op de button te klikken is setDiv true 
      />
    </AuthorizedRole>
  );
};

export default EditChecklistSectionStagairTitle;
