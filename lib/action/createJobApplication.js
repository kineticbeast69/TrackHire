"use server";
import { getSession } from "../auth";
import { prisma } from "../prisma";

export async function createJobApplicaiton(data) {
  const session = await getSession();
  if (session?.user) {
    return console.log("unauthorized user.");
  }
  const {
    company,
    position,
    location,
    salary,
    jobUrl,
    tags,
    description,
    notes,
    boardId,
    columnId,
  } = data;
  if (!boardId) return console.log("boardId is not found.");
  if (!columnId) return console.log("ColumnID is not found.");
  try {
    // board exits or not
    const board = await prisma.board.findFirst({ where: { id: boardId } });
    if (!board) return console.log("No board is found.");
    // column exist or not
    const column = await prisma.column.findFirst({
      where: { id: columnId, boardId: boardId },
    });
    if (!column) return console.log("No column is found.");

    //   creating the job application
  } catch (error) {
    throw error;
  }
}
