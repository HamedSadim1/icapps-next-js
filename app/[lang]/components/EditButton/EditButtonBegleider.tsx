import React, { useState } from "react";
import AuthorizedRole from "../AuthorizedRole";
import { BsPencil } from "react-icons/bs";
import CheckListItemModal from "../../detail/[id]/CheckListItemModal";
import useStagairStore from "@/store";
import { IChecklistItem, UserRole } from "@/types";
import ChecklistBegeleiderItemsModal from "../../detail/[id]/ChecklistBegeleiderItemsModal";

interface EditChecklistItemProps {
  item: IChecklistItem;
  role: UserRole;
  userRole: UserRole;
  lang: string;
}

const EditButtonBegleider: React.FC<EditChecklistItemProps> = ({
  item,
  role,
  userRole,
  lang
}) => {
  const openModal = () => {
    useStagairStore.setState({  //Zetten wij de item die weegeven van de parent, in de store zodat child kan weten over welke item
      checklistItemBegeleider: item,
    });
    setDiv(true); //Dit zorgt ervoor dat de modal opengaat
  };

  const [showDiv, setDiv] = useState<boolean>(false);

  return (
    <>
      <AuthorizedRole role={role} userRole={userRole}>
        <button
          type="button"
          className="hover:text-gray-400 ml-auto"
          onClick={openModal}
        >
          <BsPencil className="text-xl" />
        </button>
        <ChecklistBegeleiderItemsModal
          lang={lang}
          showDiv={showDiv}
          setDiv={setDiv}  //Door op de button te klikken is setDiv true
        />
      </AuthorizedRole>
    </>
  );
};


export default EditButtonBegleider;
