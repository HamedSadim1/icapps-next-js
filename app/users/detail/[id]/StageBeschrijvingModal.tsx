import useStagebeschrijving from "@/hooks/useStagebeschrijving";
import useStagairStore from "@/store";
import { useEffect, MouseEvent, FormEvent } from "react";
import Select from "react-select";
import FetchingError from "@/app/components/FetchingError";
import useStagair from "@/hooks/useStagair";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import { inputFormDater } from "@/lib";
import useUpdateStagiair from "@/hooks/useUpdateStagiair";
import useStagebeschrijvingUpdate from "@/hooks/useStagebeschrijvingUpdate";
import { IStagaire, IStagebeschrijving } from "@/types";

interface StageBeschrijvingModal {
  id: string;
  stagairId: string;
  stagair: IStagaire;
  stagebeshrijving: IStagebeschrijving;
}

const StageBeschrijvingModal = ({
  id,
  stagairId,
  stagair,
  stagebeshrijving,
}: StageBeschrijvingModal) => {
  const isModalOpen = useStagairStore((s) => s.commentModal);
  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  // const { data, error } = useStagebeschrijving(id);
  // const { data: stagair } = useStagair(stagairId);

  const stageBeschrijving = useStagairStore((s) => s.stageBeschrijving);
  const setStageBeschrijving = useStagairStore((s) => s.setStageBeschrijving);

  const setStagaires = useStagairStore((state) => state.setStagaires);
  const stagaire = useStagairStore((s) => s.stagaires);

  const { data: stagebegeleiders } = useStagebegeleiders();

  const { mutate: updateStagaire } = useUpdateStagiair(stagairId, stagaire);
  const { mutate: updateStagebescrhiving } = useStagebeschrijvingUpdate(
    id,
    stageBeschrijving
  );

  useEffect(() => {
    if (stagebeshrijving && stagair) {
      useStagairStore.setState({ stageBeschrijving: stagebeshrijving });
      useStagairStore.setState({ stagaires: stagair });
    }
  }, [stagebeshrijving, stagair]);

  useEffect(() => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;

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
      await updateStagaire();
      await updateStagebescrhiving();
      setIsModalOpen(false);
      useStagairStore.setState({ stagaires: stagaire });
      useStagairStore.setState({ stageBeschrijving: stageBeschrijving });
    } catch (error) {
      console.log(
        "🚀 ~ file: StageBeschrijvingModal.tsx:77 ~ handleSubmitForm ~ error:",
        error
      );
    }
  };

  return (
    <dialog id="my_modal_3" className="modal duration-0">
      {isModalOpen && (
        <div className="modal-box px-10 rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Stage details</h1>
          <form method="dialog" onSubmit={handleSubmitForm}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleModal}
            >
              ✕
            </button>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Beschrijving</span>
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
              <label className="label text-base">
                <span className="label-text text-base">Stage begeleider(s)</span>
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
                className="basic-multi-select"
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
            <div className="flex justify-between">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Start datum</span>
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
                  min={inputFormDater(new Date().toISOString().split("T")[0])}
                />
              </div>
              {/* Einddatum */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Eind datum</span>
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
                <span className="label-text text-base">School</span>
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
            <h2 className="text-lg font-bold mt-3">Contactpersoon</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Naam</span>
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
                  <span className="label-text text-base">Telefoonnummer</span>
                </label>
                <input
                  type="text"
                  placeholder="Telefoonnummer"
                  className="w-40 p-3 border-2 rounded-md mb-5"
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
                  <span className="label-text ml-3 text-base">Email</span>
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
                className="mr-4 px-7 py-2 rounded-md bg-gray-200 text-[#002548] font-semibold hover:bg-gray-400"
                onClick={handleModal}
              >
                Annuleren
              </button>
              <button className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500">
                Opslaan
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default StageBeschrijvingModal;
