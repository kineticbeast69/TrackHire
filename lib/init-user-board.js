import { prisma } from "./prisma";
export default async function InitUserBoard(userId) {
  const boardName = "Job tracker";
  try {
    // checking the board exist or not
    const boardExists = await prisma.board.findFirst({
      where: { userId, name: boardName },
    });
    if (boardExists) return boardExists;

    // creating the baord and columns
    const createBoard = await prisma.$transaction(async (tx) => {
      const board = await tx.board.create({
        data: { name: boardName, userId },
      });

      await tx.column.createMany({
        data: [
          { name: "Wish list", order: 0, boardId: board.id },
          { name: "Applied", order: 1, boardId: board.id },
          { name: "Interviewing", order: 2, boardId: board.id },
          { name: "offer", order: 3, boardId: board.id },
          { name: "Rejected", order: 4, boardId: board.id },
        ],
      });
      return board;
    });
    return createBoard;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
