import { create } from "zustand";
import { IStagaire, IStagebeschrijving, IPost } from "@/types";

export interface IStore {
  commentModal: boolean;
  stagiairModal: boolean;
  toggleModal: () => void;
  stagaires: IStagaire;
  setStagaires: (stagaires: IStagaire) => void;
  updateStagairesAsync: (stagaire: IStagaire) => void;
  setCommentModal: (commentModal: boolean) => void;
  stageBeschrijving: IStagebeschrijving;
  setStageBeschrijving: (stageBeschrijving: IStagebeschrijving) => void;
  doel: IPost;
  setDoel: (doel: IPost) => void;
}

const useStagairStore = create<IStore>((set) => ({
  stagiairModal: false,
  commentModal: false,
  stagaires: {
    email: "",
    endDate: "",
    id: "",
    name: "",
    startDate: "",
    stagebegeleiderId: [],
    role: 1,
    posts: [],
    stagebeschriving: [],
    stagebegeleider: [],
    user: [],
  },
  stageBeschrijving: {
    id: "",
    beschrijving: "",
    school: "",
    stagebegeleiderIDS: [],
    stagiairId: "",
    contactPersoonName: "",
    contactPersoonEmail: "",
    contactPersoonTelefoon: "",
  },
  doel: {
    id: "",
    authorId: "",
    title: "",
    comments: [],
    body: "",
    createdAt: "",
  },
  setStagaires: (stagaires) => set({ stagaires }),
  toggleModal: () => set((state) => ({ stagiairModal: !state.stagiairModal })),
  setCommentModal: (commentModal) => set({ commentModal }),
  setStageBeschrijving: async (stageBeschrijving) => {
    try {
      set({ stageBeschrijving });
    } catch (error) {
      console.error("Error updating stagaires:", error);
    }
  },
  setDoel: (doel) => {
    set({ doel });
  },

  updateStagairesAsync: async (stagaire) => {
    try {
      set({ stagaires: stagaire });
    } catch (error) {
      console.error("Error updating stagaires:", error);
    }
  },
}));

export default useStagairStore;
