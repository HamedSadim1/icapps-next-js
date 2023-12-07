import { formatDate } from "@/lib";
import { StageBeschrijvingModal } from ".";
import EditStageBeschrijving from "./EditButton/EditStageBeschrijving";
import { IStagaire, IStagebeschrijving, UserRole } from "@/types";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";

interface StageBeschrijvingProps {
  stagebeschriving: IStagebeschrijving;
  role: UserRole;
  userRole: UserRole;
  setIsModalOpen: (value: boolean) => void;
  id: string;
  data: IStagaire;
  getStagebegeleiderName: () => string;
  lang: string;
}

const StageBeschrijving = ({
  id,
  role,
  setIsModalOpen,
  data,
  stagebeschriving,
  getStagebegeleiderName,
  lang,
}: StageBeschrijvingProps) => {
  const translation = getTranslation(lang as Locale);
  return (
    <div
      key={stagebeschriving.id}
      className="bg-blue-50  mt-11 rounded-lg pb-5 p-5"
    >
      <div className="flex justify-between items-center ml-2">
        <h2 className="text-2xl font-semibold text-[#002548]">{translation.detail.description}</h2>
        {/* Edit Stagebeschrijving */}
        <EditStageBeschrijving
          
          role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
          userRole={role}
          setIsModalOpen={setIsModalOpen}
          
        />
        {/* Stagebeschrijving Modal */}
        <StageBeschrijvingModal
          stagairId={id}
          id={stagebeschriving.id}
          stagebeshrijving={stagebeschriving}
          stagair={data}
          lang={lang}
        />
      </div>
      <p className="text-gray-600 text-base leading-relaxed mt-2 ml-2 mr-10">
        {stagebeschriving.beschrijving}
      </p>
      <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
        {translation.detail.supervisor}
      </h2>
      <h3 className="text-gray-600 ml-2">{getStagebegeleiderName()}</h3>
      <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
        {translation.detail.internshipduration}
      </h2>
      <h3 className="text-gray-600 ml-2">
        {formatDate(data.startDate)} - {formatDate(data.endDate)}
      </h3>
      <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
        {translation.detail.school}
      </h2>
      <h3 className="text-gray-600 ml-2">{stagebeschriving.school}</h3>
      <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
      {translation.detail.contactperson}
      </h2>
      <h3 className="text-gray-600 ml-2">
        {stagebeschriving.contactPersoonName}
      </h3>
      <h3 className="text-gray-600 ml-2 mt-1">
        {stagebeschriving.contactPersoonEmail}
      </h3>
      <h3 className="text-gray-600 ml-2 mt-1">
        {stagebeschriving.contactPersoonTelefoon}
      </h3>
    </div>
  );
};

export default StageBeschrijving;
