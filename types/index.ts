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
  checkListStagiair: IChecklistStagiair[];
  documents: IDocument[];
  checkliststagebegeleider: ICheckListStagebegeleider[];
}

export interface IStagebegeleider {
  id: string;
  name: string;
  email: string;
  stagiairs: IStagaire[];
}

export enum UserRole {
  ADMIN,
  STAGIAIR ,
  STAGEBEGELEIDER,
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
  documentID: string;
  createdAt: string;
  comments: IDocumentComment[];
}

export interface IDocument {
  id: string;
  original_filename: string;
  url: string;
  secure_url: string;
  public_id: string;
  created_at: string;
  stagiairID: string;
  bytes: number;
  resource_type: string;
}

export interface IChecklistStagiair {
  id: string;
  title: string;
  isChecked: boolean;
  stagiairID: string;
  createdAt: string;
  date: string;
}

export interface ICheckListStagebegeleider {
  id: string;
  title: string;
  isChecked: boolean;
  stagebegeleiderID: string;
  createdAt: string;
  stagiairID: string;
}
