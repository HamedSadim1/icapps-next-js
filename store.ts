import { create } from "zustand";
import {
  IStagaire,
  IStagebeschrijving,
  IPost,
  IComment,
  IDocument,
  UserRole,
  IDocumentComment,
  IChecklistItem,
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
  checklistItemStagiair: IChecklistItem;
  setchecklistItemStagiair: (checklistStagiair: IChecklistItem) => void;
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
  setDocumentId: (documentId: string) => void;
  documentComment: IDocumentComment;
  setDocumentComment: (comment: IDocumentComment) => void;
  documentId: string;
  documentCommentId: (documentId: string) => void;
  pushNotificationId: string;
  setPushNotificationId: (pushNotificationId: string) => void;
  checklistItemUpdate:IChecklistItem;
  setChecklistItemUpdate: (checklistItem: IChecklistItem) => void;
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
    role: UserRole.STAGIAIR,
    posts: [],
    stagebeschriving: [],
    stagebegeleider: [],
    user: [],
    checklistsection: [],
    documents: [],
    checkliststagebegeleider: [],
    doel: [],
  },
  checklistItemUpdate:{
  createdAt:"" ,
  date:"",
  id:"",
  isChecked:false,
  title:"",
  updatedAt:"",
  checklistItemSectionID:"",
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
  checklistItemStagiair: {
    id: "",
    date: "",
    isChecked: false,
    createdAt: "",
    updatedAt: "",
    title: "",
    checklistItemSectionID: "",
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
    comments: [],
    documentUploaderName: "",
    img: "",
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
  pushNotificationId: "",
  setPushNotificationId: (pushNotificationId) => set({ pushNotificationId }),

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
setChecklistItemUpdate:(checklistItemUpdate) =>{
  set({ checklistItemUpdate: checklistItemUpdate});
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
  setchecklistItemStagiair: (checklistStagiair) => {
    set({ checklistItemStagiair: checklistStagiair });
  },
  setUpdatePost(updatePost) {
    set({ updatePost });
  },
  setDocumentId: (documentId) => set({ documentId }),
  documentComment: {
    comment: "",
    createdAt: "",
    id: "",
    documentId: "",
    commentatorName: "",
    img: "",
  },
  setDocumentComment: (comment) => set({ documentComment: comment }),
  documentId: "",
  documentCommentId: (documentId) => set({ documentId }),

  updateStagairesAsync: async (stagaire) => {
    try {
      set({ stagaires: stagaire });
    } catch (error) {
      console.error("Error updating stagaires:", error);
    }
  },
}));

export default useStagairStore;
