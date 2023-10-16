import useStagebeschrijving from "@/hooks/useStagebeschrijving";
import useStagairStore from "@/store";
import { useEffect, MouseEvent, FormEvent } from "react";
import Select from "react-select";

import FetchingError from "@/app/components/FetchingError";
import useStagair from "@/hooks/useStagair";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import { inputFormDater } from "@/lib";

interface CommentModalProps {
  id: string;
  stagairId: string;
}

const StageBeschrijvingModal = ({ id, stagairId }: CommentModalProps) => {
  const isModalOpen = useStagairStore((s) => s.commentModal);
  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);

  const { data, error } = useStagebeschrijving(id);
  const { data: stagair } = useStagair(stagairId);

  const stageBeschrijving = useStagairStore((s) => s.stageBeschrijving);
  const setStageBeschrijving = useStagairStore((s) => s.setStageBeschrijving);

  const setStagaires = useStagairStore((state) => state.setStagaires);
  const stagaire = useStagairStore((s) => s.stagaires);

  const { data: stagebegeleiders } = useStagebegeleiders();

  useEffect(() => {
    if (data && stagair) {
      useStagairStore.setState({ stageBeschrijving: data });
      useStagairStore.setState({ stagaires: stagair });
    }
  }, [data, stagair]);

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

  if (error) {
    return <FetchingError error={error.message} />;
  }

  if (!stagaire) {
    return null;
  }

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isoStartDate = stagaire.startDate
        ? new Date(stagaire.startDate).toISOString()
        : "";
      const isoEndDate = stagaire.endDate
        ? new Date(stagaire.endDate).toISOString()
        : "";
      // Ensure stagebegeleiderId is an array of unique strings
      const stagebegeleiderIdArray = Array.isArray(stagaire.stagebegeleiderId)
        ? stagaire.stagebegeleiderId
        : [stagaire.stagebegeleiderId];

      const response = await fetch(
        `http://localhost:3000/api/users/stagiair/${stagairId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: stagaire.name,
            email: stagaire.email,
            startDate: isoStartDate,
            endDate: isoEndDate,
            stagebegeleiderId: stagebegeleiderIdArray,
          }),
        }
      );

      const stageBeschrijvingResponse = await fetch(
        `http://localhost:3000/api/stagebeschrijving/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            beschrijving: stageBeschrijving.beschrijving,
            school: stageBeschrijving.school,
            contactPersoonName: stageBeschrijving.contactPersoonName,
            contactPersoonTelefoon: stageBeschrijving.contactPersoonTelefoon,
            contactPersoonEmail: stageBeschrijving.contactPersoonEmail,
          }),
        }
      );

      setIsModalOpen(false);

      if (response.ok && stageBeschrijvingResponse.ok) {
        console.log("Data updated");
      } else {
        console.error("error", response.status, response.statusText);
        console.error(
          "error",
          stageBeschrijvingResponse.status,
          stageBeschrijvingResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      {isModalOpen && (
        <div className="modal-box">
          <h1 className="text-2xl mb-3">Stage Detail</h1>
          <form method="dialog" onSubmit={handleSubmitForm}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleModal}
            >
              ✕
            </button>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Beschrijving</span>
              </label>
              <textarea
                value={stageBeschrijving.beschrijving}
                className="textarea h-24 textarea-bordered"
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
              <label className="label">
                <span className="label-text">Stage begeleider(s)</span>
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
            <div className="flex space-x-20">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">StartDatum</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  placeholder="StartDatum"
                  className="input input-bordered "
                  value={inputFormDater(stagaire.startDate)}
                  onChange={(e) =>
                    setStagaires({ ...stagaire, startDate: e.target.value })
                  }
                />
              </div>
              {/* Einddatum */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">EindDatum</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  placeholder="EindDatum"
                  className="input input-bordered"
                  value={inputFormDater(stagaire.endDate)}
                  onChange={(e) =>
                    setStagaires({ ...stagaire, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            {/* School */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">School</span>
              </label>
              <input
                type="text"
                placeholder="School"
                className="input input-bordered"
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
                <span className="label-text">Naam</span>
              </label>
              <input
                type="text"
                placeholder="naam"
                className="input input-bordered "
                value={stageBeschrijving.contactPersoonName}
                onChange={(e) =>
                  setStageBeschrijving({
                    ...stageBeschrijving,
                    contactPersoonName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex space-x-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">TelefoonNummmer</span>
                </label>
                <input
                  type="text"
                  placeholder="Telefoonnummer"
                  className="input input-bordered w-40"
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
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered  w-full"
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

            <div className="form-control mt-3 flex flex-row justify-end ">
              <button className="btn" onClick={handleModal}>
                Annuleren
              </button>
              <button className="btn btn-neutral">Opslaan</button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default StageBeschrijvingModal;
