export interface IStagaire {
  id: string;
  name: string;
  email: string;
  startDate: Date;
  endDate: Date;
  stagebegeleiderId: string[];
}

export interface IStagebegeleider {
  id: string;
  name: string;
  email: string;
  stagiairs: IStagaire[];
}
