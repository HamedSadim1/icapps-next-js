export interface IStagaire {
  id: string;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  stagebegeleiderId: string[];
}

export interface IStagebegeleider {
  id: string;
  name: string;
  email: string;
  stagiairs: IStagaire[];
}
