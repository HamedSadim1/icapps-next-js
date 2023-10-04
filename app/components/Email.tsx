import { formateDate } from "@/lib";
import { IStagaire } from "@/types";
import Link from "next/link";

interface EmailProps {
  item: IStagaire;
}

const Email = ({ item }: EmailProps) => {
  return (
    <tr key={item.id}>
      <td className="py-2 px-4">
        <button className=" hover:text-sm  focus:outline-none  ">
          <Link href={`/users/${item.id}?name=${item.name}`}>{item.name}</Link>
        </button>
      </td>
      <td className="py-2 px-4">{item.email}</td>
      <td className="py-2 px-4">{formateDate(item.startDate)}</td>
      <td className="py-2 px-4">{formateDate(item.endDate)}</td>
      <td className="py-2 px-4">{item.supervisor}</td>
    </tr>
  );
};

export default Email;
