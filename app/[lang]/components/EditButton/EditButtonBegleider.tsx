import { UserRole } from "@/types";
import AuthorizedRole from "../AuthorizedRole";

import { BsPencil } from "react-icons/bs";

interface EditChecklistItemBegleiderProps {
  setIsModalOpen: (value: boolean) => void;
  role: UserRole;
  userRole: UserRole;
  lang: string;
}

const EditButtonBegleider: React.FC<EditChecklistItemBegleiderProps> = ({
  role,
  userRole,
  setIsModalOpen,
  lang
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

export default EditButtonBegleider;
