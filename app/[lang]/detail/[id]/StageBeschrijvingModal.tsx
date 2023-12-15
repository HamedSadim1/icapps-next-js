import useStagairStore from "@/store";
import { useEffect, MouseEvent, FormEvent, useRef, useState } from "react";
import Select from "react-select";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import { inputFormDater } from "@/lib";
import useUpdateStagiair from "@/hooks/useUpdateStagiair";
import useStagebeschrijvingUpdate from "@/hooks/useStagebeschrijvingUpdate";
import { IStagaire, IStagebeschrijving } from "@/types";
import getTranslation from "../../components/getTranslation";
import { Locale } from "@/i18n-config";
import { ClipLoader } from "react-spinners";

interface StageBeschrijvingModal {
  id: string;
  stagairId: string;
  stagair: IStagaire;
  stagebeshrijving: IStagebeschrijving;
  lang: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const StageBeschrijvingModal = ({
  id,
  stagairId,
  stagair,
  stagebeshrijving,
  lang,
  isModalOpen,
  setIsModalOpen
}: StageBeschrijvingModal) => {
  // const isModalOpen = useStagairStore((s) => s.commentModal);
  // const setIsModalOpen = useStagairStore((state) => state.setCommentModal);

  const stageBeschrijving = useStagairStore((s) => s.stageBeschrijving);
  const setStageBeschrijving = useStagairStore((s) => s.setStageBeschrijving);

  const setStagaires = useStagairStore((state) => state.setStagaires);
  const stagaire = useStagairStore((s) => s.stagaires);
  const [spinner, setSpinner] = useState(false);//loading
  const { data: stagebegeleiders } = useStagebegeleiders();

  const { mutate: updateStagaire } = useUpdateStagiair(stagairId, stagaire);
  const { mutate: updateStagebescrhiving } = useStagebeschrijvingUpdate(
    id,
    stageBeschrijving
  );


  const modalRef = useRef(null);

  useEffect(() => {
    if (stagebeshrijving && stagair) {
      useStagairStore.setState({ stageBeschrijving: stagebeshrijving });
      useStagairStore.setState({ stagaires: stagair });
    }
  }, [stagebeshrijving, stagair]);

  useEffect(() => {
    const modal = modalRef.current as any;

    if (modal) {
      if (isModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isModalOpen]);

  const handleModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  // if (error) {
  //   return <FetchingError error={error.message} />;
  // }

  if (!stagaire) {
    return null;
  }

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSpinner(true);//loading
      await updateStagaire();
      await updateStagebescrhiving();
      setTimeout(() => {
        setSpinner(false);//loading
        setIsModalOpen(false);
      }, 8000);
      useStagairStore.setState({ stagaires: stagaire });
      useStagairStore.setState({ stageBeschrijving: stageBeschrijving });
    } catch (error) {
      console.log(
        "🚀 ~ file: StageBeschrijvingModal.tsx:77 ~ handleSubmitForm ~ error:",
        error
      );
    }
  };
  const translation = getTranslation(lang as Locale);
  return (
    <dialog ref={modalRef} id="my_modal_3" className="modal duration-0 rounded-md">
      {isModalOpen && (
        <div className="modal-box p-10">
          <h1 className="text-2xl font-semibold mb-5 text-[#002548]">{translation.detail.internshipdetails}</h1>
          <form method="dialog" onSubmit={handleSubmitForm} className="">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3"
              onClick={handleModal}
            >
              ✕
            </button>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-gray-500">{translation.detail.description}</span>
              </label>
              <textarea
                value={stageBeschrijving.beschrijving}
                className="w-full p-3 border-2 rounded-md mb-5 h-24"
                placeholder="beschrijving"
                onChange={(e) =>
                  setStageBeschrijving({
                    ...stageBeschrijving,
                    beschrijving: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label text-base mb-5">
                <span className="label-text text-base text-gray-500">{translation.detail.supervisor}</span>
              </label>
              <Select
                defaultValue={stagair?.stagebegeleider.map(
                  (stagebegeleider) => ({
                    label: stagebegeleider.name,
                    value: stagebegeleider.id,
                  })
                )}
                isMulti
                name="stagebegeleider"
                //! all stagebegeleiders
                options={stagebegeleiders?.map((stagebegeleider) => ({
                  label: stagebegeleider.name,
                  value: stagebegeleider.id,
                }))}
                className="basic-multi-select mb-5"
                classNamePrefix="select"
                onChange={(selected, actionMeta) => {
                  //! selectedOptions is an array of unique strings
                  const selectedOptions = Array.from(
                    new Set(selected.map((option) => option.value))
                  );
                  console.log(selectedOptions);
                  //! setData is an array of unique stagebegleiderIds
                  setStagaires({
                    ...stagaire,
                    stagebegeleiderId: selectedOptions,
                  });
                }}
              />
            </div>
            {/* StartDatum and Eind datum */}
            <div className="flex justify-between gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-gray-500">{translation.detail.startdate}</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  placeholder="StartDatum"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  value={inputFormDater(stagaire.startDate)}
                  onChange={(e) =>
                    setStagaires({ ...stagaire, startDate: e.target.value })
                  }
                  min={inputFormDater(stagaire.startDate)}
                />
              </div>
              {/* Einddatum */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-gray-500">{translation.detail.enddate}</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  placeholder="EindDatum"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  value={inputFormDater(stagaire.endDate)}
                  onChange={(e) =>
                    setStagaires({ ...stagaire, endDate: e.target.value })
                  }
                  min={inputFormDater(new Date().toISOString().split("T")[0])}
                />
              </div>
            </div>
            {/* School */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-gray-500">{translation.detail.school}</span>
              </label>
              <input
                type="text"
                placeholder="School"
                className="w-full p-3 border-2 rounded-md mb-5"
                value={stageBeschrijving.school}
                onChange={(e) =>
                  setStageBeschrijving({
                    ...stageBeschrijving,
                    school: e.target.value,
                  })
                }
              />
            </div>
            {/* Contact Persoon */}
            <h2 className="text-lg font-bold mb-5 text-[#002548]">{translation.detail.contactperson}</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-gray-500">{translation.detail.name}</span>
              </label>
              <input
                type="text"
                placeholder="naam"
                className="w-full p-3 border-2 rounded-md mb-5"
                value={stageBeschrijving.contactPersoonName}
                onChange={(e) =>
                  setStageBeschrijving({
                    ...stageBeschrijving,
                    contactPersoonName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-gray-500">{translation.detail.phonenumber}</span>
                </label>
                <br />
                <input
                  type="text"
                  placeholder={translation.detail.phonenumber}
                  className="w-52 p-3 border-2 rounded-md mb-5"
                  value={stageBeschrijving.contactPersoonTelefoon}
                  onChange={(e) =>
                    setStageBeschrijving({
                      ...stageBeschrijving,
                      contactPersoonTelefoon: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ml-3 text-base text-gray-500">{translation.detail.email}</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="ml-3 w-full p-3 border-2 rounded-md mb-5"
                  value={stageBeschrijving.contactPersoonEmail}
                  onChange={(e) =>
                    setStageBeschrijving({
                      ...stageBeschrijving,
                      contactPersoonEmail: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="w-full text-right mt-2 ">
              <button
                className="mr-4 px-7 py-2 rounded-md  bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                onClick={handleModal}
              >
                {translation.detail.cancel}
              </button>
              {spinner == true ? //loading
                    <button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 pointer-events-none"
                    >
                      <ClipLoader
                        color={"#ffffff"}
                        loading={true}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                    :
                    <button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
                    >
                      {translation.detail.save}
                    </button>
                  }
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default StageBeschrijvingModal;
