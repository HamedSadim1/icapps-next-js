import { UserRole, IPost } from "@/types";
import { BsPencil } from "react-icons/bs";
import AuthorizedRole from "../AuthorizedRole";
import useStagairStore from "@/store";

interface EditDoelButtonProps {
  role: UserRole;
  userRole: UserRole;
  setUpdateGoalId: (goalId: string) => void;
  goal: IPost;
  setIsGoalModal: (modal: boolean) => void;
}

const EditDoelButton: React.FC<EditDoelButtonProps> = ({
  role,
  goal,
  setUpdateGoalId,
  setIsGoalModal,
  userRole,
}) => {
  return (
    <>
      <AuthorizedRole role={role} userRole={userRole}>
        <button
          type="button"
          onClick={() => {
            setUpdateGoalId(goal.id);
            useStagairStore.setState({ updatePost: goal });
            setIsGoalModal(true);
          }}
          className="hover:text-gray-400 w-6 ml-2"
        >
          <BsPencil className="text-xl" />
        </button>
      </AuthorizedRole>
    </>
  );
};

export default EditDoelButton;
