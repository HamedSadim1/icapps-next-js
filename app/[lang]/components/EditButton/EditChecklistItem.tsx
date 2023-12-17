import React, { useState } from "react";
import AuthorizedRole from "../AuthorizedRole";
import { BsPencil } from "react-icons/bs";
import CheckListItemModal from "../../detail/[id]/CheckListItemModal";
import useStagairStore from "@/store";
import { IChecklistItem, UserRole } from "@/types";

interface EditChecklistItemProps {
  item: IChecklistItem;

  lang: string;
}

const EditChecklistItem: React.FC<EditChecklistItemProps> = ({
  item,

  lang,
}) => {
  const openModal = () => {
    useStagairStore.setState({
      //Zetten wij de item die weegeven in the parent
      checklistItemStagiair: item,
    });
    setDiv(true); //Dit zorgt ervoor dat de modal opengaat
  };

  const [showDiv, setDiv] = useState<boolean>(false);

  return (
 <>
      <button
        type="button"
        className="hover:text-gray-400 ml-auto"
        onClick={openModal}
      >
        <BsPencil className="text-xl" />
      </button>
      <CheckListItemModal
        lang={lang}
        showDiv={showDiv}
        setDiv={setDiv} //Door op de button te klikken is setDiv true
        />
        </>
  
  );
};

export default EditChecklistItem;
