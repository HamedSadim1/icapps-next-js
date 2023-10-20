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
}

export interface IStagebegeleider {
  id: string;
  name: string;
  email: string;
  stagiairs: IStagaire[];
}

export enum UserRole {
  ADMIN,
  STAGIAIR,
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
  title: string;
  url: string;
  createdAt: string;
  stagiairID: string;
  size: number;
}

export interface IChecklistStagiair {
  id: string;
  title: string;
  body: string;
  isChecked: boolean;
  stagiairID: string;
  createdAt: string;
}
