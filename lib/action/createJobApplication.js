"use server";

import { getSession } from "../auth";
import { prisma } from "../prisma";

export async function createJobApplication(data, boardId, columnId) {
  try {
    const session = await getSession();

    // auth check
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized user.",
      };
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
    } = data;

    // validation
    if (!boardId) {
      return {
        success: false,
        error: "Board ID not found.",
      };
    }

    if (!columnId) {
      return {
        success: false,
        error: "Column ID not found.",
      };
    }

    // check board
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      return {
        success: false,
        error: "Board not found.",
      };
    }

    // check column
    const column = await prisma.column.findFirst({
      where: {
        id: columnId,
        boardId,
      },
    });

    if (!column) {
      return {
        success: false,
        error: "Column not found.",
      };
    }

    // get max order
    const maxOrder = await prisma.jobApplication.findFirst({
      where: {
        columnId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    // create job application
    const jobApplication = await prisma.jobApplication.create({
      data: {
        company,
        position,
        location,
        salary,
        jobUrl,
        tags,
        description,
        notes,

        column: {
          connect: {
            id: columnId,
          },
        },

        board: {
          connect: {
            id: boardId,
          },
        },

        user: {
          connect: {
            id: session.user.id,
          },
        },

        order: maxOrder ? maxOrder.order + 1 : 0,
      },
    });

    return {
      success: true,
      data: jobApplication,
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message || "Something went wrong.",
    };
  }
}
