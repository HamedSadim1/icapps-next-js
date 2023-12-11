import { AiOutlineSearch } from "react-icons/ai";
import Emails from "./Emails";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  lang: string;
}

const SearchStagiair = ({ search, setSearch, lang }: Props) => {
  const translation = getTranslation(lang as Locale)
  return (
    <>
      <section className="flex xs:flex-col sm:flex-row mt-9 flex-wrap  justify-start ">
        <div className="">
          <h1 className="xs:text-2xl sm:text-4xl xs:mb-8 sm: mb-0 font-medium text-[#002548] ">{translation.detail['intern']}</h1>
        </div>
        <div className="flex xs:justify-start sm:justify-center items-center flex-auto sm:pr-[5rem] xs:w-full sm:w-auto">
          <div className="xs:w-full sm:w-auto flex items-center xs:px-3 text-gray-700 rounded border">
            <AiOutlineSearch className="w-5 h-5" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder={translation.userStagiair['searchintern']}
              className="px-4 py-2 text-gray-700 bg-transparent focus:outline-none w-full"
            />
          </div>
        </div>
      </section>
      <Emails search={search} />
    </>
  );
};

export default SearchStagiair;
