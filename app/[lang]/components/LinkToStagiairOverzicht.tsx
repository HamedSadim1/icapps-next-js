import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import AuthorizedRole from "./AuthorizedRole";
import { UserRole } from "@/types";

interface LinkToStagiairOverzcihtPage {
  role: UserRole;
  userRole: UserRole;
  href: string
  title: string
}

const LinkToStagiairOverzciht = ({
  role,
  userRole,
  href,
  title,
}: LinkToStagiairOverzcihtPage) => {
  return (
    <AuthorizedRole role={role} userRole={userRole}>
      <Link href={href}>
        <button
          type="button"
          className="flex items-center  hover:text-gray-600 mr-20"
        >
          <IoIosArrowRoundBack className="text-3xl mr-2 text-blue-400" />
          <h2 className="text-l ">{title}</h2>
        </button>
      </Link>
    </AuthorizedRole>
  );
};

export default LinkToStagiairOverzciht;
