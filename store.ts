// import { create } from "zustand";
// import { IStagaire } from "@/types";

// export interface IStore {
//   stagaires: IStagaire;
//   setStagaires: (stagaires: IStagaire) => void;
// }

// const useStagairStore = create<IStore>((set) => ({
//   stagaires: {
//     email: "",
//     endDate: "",
//     id: "",
//     name: "",
//     startDate: "",
//     stagebegeleiderId: [],
//     role: 1,
//   },
//   setStagaires: (stagaires) => set({ stagaires }),
// }));

// export default useStagairStore;

import { create } from "zustand";
import { IStagaire } from "@/types";

export interface IStore {
  commentModal: boolean;
  stagiairModal: boolean;
  toggleModal: () => void;
  stagaires: IStagaire;
  setStagaires: (stagaires: IStagaire) => void;
  updateStagairesAsync: (stagaire: IStagaire) => void;
  setCommentModal: (commentModal: boolean) => void;
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
  setStagaires: (stagaires) => set({ stagaires }),
  toggleModal: () => set((state) => ({ stagiairModal: !state.stagiairModal })),
  setCommentModal: (commentModal) => set({ commentModal }),
  updateStagairesAsync: async (stagaire) => {
    try {
      set({ stagaires: stagaire });
    } catch (error) {
      console.error("Error updating stagaires:", error);
    }
  },
}));

export default useStagairStore;
