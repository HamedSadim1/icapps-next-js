import { formatDate } from "@/lib";
import { IStagaire } from "@/types";
import Link from "next/link";

interface EmailProps {
  item: IStagaire;
}

const Email = ({ item }: EmailProps) => {
  return (
    <tr key={item.id}>
      <td className="py-2 px-4">
        <button className=" hover:text-blue-500 focus:outline-none  ">
          <Link href={`/users/stagair${item.id}?name=${item.name}`}>
            {item.name}
          </Link>
        </button>
      </td>
      <td className="py-2 px-4">{item.email}</td>
      <td className="py-2 px-4">{formatDate(item.startDate)}</td>
      <td className="py-2 px-4">{formatDate(item.endDate)}</td>
      <td className="py-2 px-4">{item.stagebegeleiderId}</td>
    </tr>
  );
};

export default Email;
