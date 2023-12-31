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
  ICheckListItemStagebegeleider,
  IChecklistSection,
  checklistSectionStagebegeleider,
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

  //new begeleider
  checklistItemBegeleider: ICheckListItemStagebegeleider; 
  setchecklistItemBegeleider: (checklistItemBegeleider: ICheckListItemStagebegeleider) => void;

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
  documentComment: IDocumentComment;
  setDocumentComment: (comment: IDocumentComment) => void;
  documentId: string;
  setDocumentId: (documentId: string) => void;
  documentCommentId: (documentId: string) => void;
  pushNotificationId: string;
  setPushNotificationId: (pushNotificationId: string) => void;
  stagairId: string;
  setStagairId: (stagairId: string) => void;
  checklistItemUpdate: IChecklistItem;
  setChecklistItemUpdate: (checklistItem: IChecklistItem) => void;
  
  checklistModal :boolean;
  setChecklistModal: (checklistModal: boolean) => void;

  checklistBegeleiderUpdate:ICheckListItemStagebegeleider; //new begeleider
  setChecklistBegeleiderUpdate: (checklistBegeleider: ICheckListItemStagebegeleider) =>void; //new begeleider

  checklistbegeleiderModal :boolean;  //new begeleider
  setChecklistBegeleiderModal: (checklistBegleiderModal: boolean) => void; //new begeleider

  checklistSection: IChecklistSection;
  setChecklistSection: (checklistSection: IChecklistSection) => void;

  checklistSectionBegeleider: checklistSectionStagebegeleider;
  setChecklistSectionBegeleider: (checklistSectionBegeleider: checklistSectionStagebegeleider) => void;
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
    checklistSectionStagebegeleider: [],
    doel: [],
  },
  checklistSection: {  //new section checklist
    id: "",
    createdAt: "",
    updatedAt: "",
    sectionTitle: "",
    stagiairID: "",
    items: [],
  },
  checklistSectionBegeleider:{ //new section checklist
    id: "",
    createdAt: "",
    sectionTitle: "",
    stagiairID: "",
    date: "",
    checklistItem: [],
  }
  ,
  checklistItemUpdate: {
    createdAt: "",
    date: "",
    id: "",
    isChecked: false,
    title: "",
    updatedAt: "",
    checklistItemSectionID: "",
  },
  checklistBegeleiderUpdate:{  //new begeleider section
    id: "",
    date: "",
    isChecked: false,
    createdAt: "",
    updatedAt: "",
    title: "",
    checklistItemSectionID: "",
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
  checklistItemBegeleider: {  //new begeleider
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
  stagairId: "",
  setStagairId: (stagairId) => set({ stagairId }),
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
  setChecklistItemUpdate: (checklistItemUpdate) => {
    set({ checklistItemUpdate: checklistItemUpdate });
  },
  setChecklistBegeleiderUpdate:(checklistBegeleiderUpdate)=>{ //new begeleider
    set({ checklistBegeleiderUpdate: checklistBegeleiderUpdate });
  }
  ,

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

  setchecklistItemBegeleider(checklistItemBegeleider) { //new
    set({ checklistItemBegeleider:checklistItemBegeleider});
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
  setDocumentComment: (documentComment) => set({ documentComment }),
  documentId: "",
  documentCommentId: (documentId) => set({ documentId }),

  updateStagairesAsync: async (stagaire) => {
    try {
      set({ stagaires: stagaire });
    } catch (error) {
      console.error("Error updating stagaires:", error);
    }
  },
  checklistModal:false,
  setChecklistModal: (checklistModal) => set({ checklistModal }),

  setChecklistSection: (checklistSection) => { //new section checklist
    set({ checklistSection:checklistSection });
  },
  setChecklistSectionBegeleider:(checklistSectionBegeleider)=>{ //new section checklist
    set({ checklistSectionBegeleider:checklistSectionBegeleider });
  }
  ,

  checklistbegeleiderModal:false, //new begeleider
  setChecklistBegeleiderModal:(checklistbegeleiderModal)=>set({checklistbegeleiderModal}) //new begeleider
}));

export default useStagairStore;
