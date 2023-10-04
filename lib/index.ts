import prisma from "@/prisma/client";

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

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};
