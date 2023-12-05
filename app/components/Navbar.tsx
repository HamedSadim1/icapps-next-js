import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";

const Navar = async () => {
  const session = await getServerSession(authOption);

  return (
    <>
      {session && (
        <nav className="bg-[#002548]">
          <div className="flex items-center justify-between ">
            <div className="flex items-center mt-0 mb-0">
              <Link
                className="text-2xl font-bold text-white ml-8 mr-6"
                href="/"
              >
                /
              </Link>
              <div className=" flex  ml-3 mt-0 mb-0">
                <div className="text-sm font-medium text-white bg-[#193B5A] px-9 py-4 rounded-none-lg">
                  Stagairs
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <h3 className=" text-white ">{session && session.user!.name}</h3>
              <button>
                <Link href="/api/auth/signout">
                  <FiLogOut className="text-white ml-5 mr-7" />
                </Link>
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navar;
