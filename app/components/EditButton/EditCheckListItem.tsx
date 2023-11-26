import { UserRole } from "@/types";
import AuthorizedRole from "../AuthorizedRole";

import { BsPencil } from "react-icons/bs";

interface EditStageBeschrijvingProps {
  setIsModalOpen: (value: boolean) => void;
  role: UserRole;
  userRole: UserRole;
}

const EditCheckListItem: React.FC<EditStageBeschrijvingProps> = ({
  role,
  userRole,
  setIsModalOpen,
}) => {
  return (
    <AuthorizedRole role={role} userRole={userRole}>
      <button
        type="button"
        className="hover:text-gray-400"
        onClick={() => setIsModalOpen(true)}
      >
        <BsPencil className="text-xl" />
      </button>
    </AuthorizedRole>
  );
};



export default EditCheckListItem