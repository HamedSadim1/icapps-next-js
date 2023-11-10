import { create } from "zustand";
import {
  IStagaire,
  IStagebeschrijving,
  IPost,
  IComment,
  IChecklistStagiair,
  IDocument,
  UserRole,
} from "@/types";

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
  postId: string;
  setPostId: (postId: string) => void;
  comment: IComment;
  setComment: (comment: IComment) => void;
  commentId: string;
  setCommentId: (commentId: string) => void;
  checklistStagiair: IChecklistStagiair;
  setChecklistStagiair: (checklistStagiair: IChecklistStagiair) => void;
  documents: IDocument;
  setDocuments: (documents: IDocument) => void;
  updatePost: IPost;
  setUpdatePost: (post: IPost) => void;
  updatePostId: string;
  setUpdatePostId: (updatePostId: string) => void;
  isPostModal: boolean;
  setIsPostModal: (isPostModal: boolean) => void;
  role: UserRole | null;
  setRole: (role: UserRole) => void;
}

const useStagairStore  = create<IStore>((set) => ({
  stagiairModal: false,
  commentModal: false,
  stagaires: {
    email: "",
    endDate: "",
    id: "",
    name: "",
    startDate: "",
    stagebegeleiderId: [],
    role: UserRole.STAGIAIR,
    posts: [],
    stagebeschriving: [],
    stagebegeleider: [],
    user: [],
    checkListStagiair: [],
    documents: [],
    checkliststagebegeleider: [],
    doel: [],
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
    stagiairID: "",
    title: "",
    comments: [],
    body: "",
    createdAt: "",
    endDate: "",
  },
  comment: {
    comment: "",
    createdAt: "",
    id: "",
    postId: "",
    commentatorName: "",
    img: "",
  },
  checklistStagiair: {
    id: "",
    stagiairID: "",
    createdAt: "",
    date: "",
    isChecked: false,
    title: "",
  },
  documents: {
    id: "",
    stagiairID: "",
    created_at: "",
    bytes: 0,
    original_filename: "",
    url: "",
    public_id: "",
    resource_type: "",
    secure_url: "",
  },
  updatePost: {
    body: "",
    comments: [],
    createdAt: "",
    endDate: "",
    stagiairID: "",
    id: "",
    title: "",
  },
  role: null,
  setRole: (role) => set({ role }),
  isPostModal: false,
  postId: "",
  commentId: "",
  updatePostId: "",
  setPostId: (postId) => set({ postId }),
  setStagaires: (stagaires) => set({ stagaires }),
  toggleModal: () => set((state) => ({ stagiairModal: !state.stagiairModal })),
  setCommentModal: (commentModal) => set({ commentModal }),
  setDocuments: (documents) => set({ documents }),
  setStageBeschrijving: async (stageBeschrijving) => {
    try {
      set({ stageBeschrijving });
    } catch (error) {
      console.error("Error updating stagaires:", error);
    }
  },
  setIsPostModal: (isPostModal) => {
    set({ isPostModal });
  },
  setUpdatePostId: (updatePostId) => {
    set({ updatePostId });
  },
  setDoel: (doel) => {
    set({ doel });
  },
  setComment: (comment) => {
    set({ comment });
  },
  setCommentId: (commentId) => {
    set({ commentId });
  },
  setChecklistStagiair: (checklistStagiair) => {
    set({ checklistStagiair });
  },

  setUpdatePost(updatePost) {
    set({ updatePost });
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
