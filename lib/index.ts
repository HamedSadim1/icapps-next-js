import prisma from "@/prisma/client";

import { IStagaire } from "@/types";
//? sort by name function
export const sortDate = (stagaireArray: IStagaire[]) => {
  stagaireArray.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA.getTime() - dateB.getTime();
  });
};

//? format date function for displaying
export const formatDate = (date: string | null): string => {
  if (!date) {
    return "";
  }

  const dateObject: Date = new Date(date);
  if (isNaN(dateObject.getTime())) {
    return "";
  }

  const day: number = dateObject.getDate();
  const month: number = dateObject.getMonth() + 1;
  const year: number = dateObject.getFullYear();

  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

  const formattedDate: string = `${formattedDay}-${formattedMonth}-${year}`;
  return formattedDate;
};

//! connect to database
export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};

//! get stagebegeleider name

export const getstagebegeleiderName = (
  stagebegeleidersId: string[],
  stagebegeleidersData: IStagaire[]
) => {
  return stagebegeleidersData
    .map((stagebegeleider) => {
      if (stagebegeleidersId.includes(stagebegeleider.id)) {
        return stagebegeleider.name;
      }
    })
    .join(", ");
};
//! inputDateFormate before sending to database
export const inputFormDater = (date: string | null): string => {
  if (!date) {
    return "";
  }

  const dateObject: Date = new Date(date);
  if (isNaN(dateObject.getTime())) {
    return "";
  }

  const year: number = dateObject.getFullYear();
  const month: number = dateObject.getMonth() + 1; // Note: January is 0
  const day: number = dateObject.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
};
