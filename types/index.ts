export interface IStagaire {
  id: string;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  stagebegeleiderId: string[];
  role: UserRole;
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
  createdAt: Date;
  role: UserRole;
}
