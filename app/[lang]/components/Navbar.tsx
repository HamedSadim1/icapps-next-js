import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOption } from "../../api/auth/[...nextauth]/route";

const Navar = async () => {
  const session = await getServerSession(authOption);

  return (
    <>
      {session && (
        <nav className="bg-[#002548]">
          <div className="flex items-center justify-between">
            <div className="flex items-center my-0 mr-3">
              <Link
                className="text-xl sm:text-2xl font-bold text-white ml-4 mr-2 sm:ml-8 sm:mr-6"
                href={`/`}
              >
                /
              </Link>
              <div className=" flex  ml-3 mt-0 mb-0">
                <div className="text-sm font-medium text-white bg-[#193B5A] px-9 py-4 rounded-none-lg">
                  Stagairs
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h3 className=" text-white text-sm sm:text-base">{session && session.user!.name}</h3>
              <button>
                <Link href="/api/auth/signout">
                  <FiLogOut className="text-white mr-5" />
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
