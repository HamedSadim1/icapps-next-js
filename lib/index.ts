import { IStagaire } from "@/types";
//? sort by name function
export const sortDate = (stagaireArray: IStagaire[]) =>
  stagaireArray.sort((a, b) => {
    return a.startDate.getTime() - b.startDate.getTime();
  });

//? format date function
export const formateDate = (date: Date) =>
  date &&
  date.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
