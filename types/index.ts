export interface IStagaireResponse {
  stagiairs: IStagaire[];      // Array of individual items  
  totalPage: number;      // Number of items per page
  page:number;
  pageSize:number;
}

export interface IStagaire {
  id: string;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  stagebegeleiderId: string[];
  role: UserRole;
  stagebeschriving: IStagebeschrijving[];
  stagebegeleider: IStagebegeleider[];
  posts: IPost[];
  user: IUser[];
  checklistsection: IChecklistSection[];
  documents: IDocument[];
  checklistSectionStagebegeleider: checklistSectionStagebegeleider[];
}

export interface IStagebegeleider {
  id: string;
  name: string;
  email: string;
  stagiairs: IStagaire[];
}

export enum UserRole {
  ADMIN = "ADMIN",
  STAGIAIR = "STAGIAIR",
  STAGEBEGELEIDER = "STAGEBEGELEIDER",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  img: string;
  createdAt: Date;
  role: UserRole;
  stagiairID: string;
}

export interface IStagebeschrijving {
  id: string;
  beschrijving: string;
  school: string;
  stagebegeleiderIDS: string[];
  stagiairId: string;
  contactPersoonName: string;
  contactPersoonEmail: string;
  contactPersoonTelefoon: string;
}

export interface IPost {
  id: string;
  title: string;
  body: string;
  stagiairID: string;
  createdAt: string;
  comments: IComment[];
  endDate: string;
}

export interface IComment {
  id: string;
  comment: string;
  postId: string;
  createdAt: string;
  img?: string;
  commentatorName: string;
}

export interface IDocumentComment {
  id: string;
  comment: string;
  documentId: string;
  createdAt: string;
  img: string;
  commentatorName: string;
}

export interface IDocument {
  comments?: IDocumentComment[];
  id: string;
  original_filename: string;
  url: string;
  secure_url: string;
  public_id: string;
  created_at: string;
  stagiairID: string;
  bytes: number;
  resource_type: string;
  img: string;
  documentUploaderName: string;
}

export interface IChecklistItem {
  id: string;
  title: string;
  isChecked: boolean;
  createdAt: string;
  date: string;
  updatedAt: string;
  checklistItemSectionID?: string;
}

export interface IChecklistSection {
  id: string;
  sectionTitle: string;
  createdAt: string;
  updatedAt: string;
  stagiairID?: string;
  items: IChecklistItem[];
}

export interface checklistSectionStagebegeleider {
  id: string;
  sectionTitle: string;
  createdAt: string;
  stagiairID: string;
  date: string;
  checklistItem: ICheckListItemStagebegeleider[];
}

export interface INotification {
  app_id?: string;
  include_player_ids: string[];
  headings: { [language: string]: string };
  contents: { [language: string]: string };
}

export interface ICheckListItemStagebegeleider {
  id: string;
  title: string;
  isChecked: boolean;
  createdAt: string;
  date: string;
  updatedAt: string;
  checklistItemSectionID?: string;
}
