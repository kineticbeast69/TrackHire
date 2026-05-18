"use server";
import { prisma } from "../prisma";
import { getSession } from "../auth";
import { revalidatePath } from "next/cache";

export async function UpdateJobApplication(id, updates) {
  try {
    // ─── Security Checks ────────────────────────────────────────────
    const session = await getSession();
    if (!session?.user)
      return { success: false, error: "Unauthorized session" };

    const jobApplication = await prisma.jobApplication.findFirst({
      where: { id },
    });
    if (!jobApplication)
      return { success: false, error: "Job application not found." };

    if (jobApplication.userId !== session.user.id)
      return { success: false, error: "Unauthorized user." };

    // ─── Separate columnId and order from other updates ─────────────
    const { columnId, order, ...otherUpdates } = updates;
    const updatesToApply = { ...otherUpdates };

    const currentColumnId = jobApplication.columnId;
    const newColumnId = columnId;
    const isMovingToDifferentColumn =
      newColumnId && newColumnId !== currentColumnId;

    // ─── Case 1: Moving to a different column ───────────────────────
    if (isMovingToDifferentColumn) {
      const jobsInTargetColumn = await prisma.jobApplication.findMany({
        where: {
          columnId: newColumnId,
          id: { not: id },
        },
        orderBy: { order: "asc" },
        select: { id: true, order: true },
      });

      let newOrderValue;

      if (order !== undefined && order !== null) {
        newOrderValue = order * 100;

        const jobsThatNeedToShift = jobsInTargetColumn.slice(order);
        await Promise.all(
          jobsThatNeedToShift.map((job) =>
            prisma.jobApplication.update({
              where: { id: job.id },
              data: { order: job.order + 100 },
            }),
          ),
        );
      } else {
        const lastJob = jobsInTargetColumn[jobsInTargetColumn.length - 1];
        newOrderValue = lastJob ? lastJob.order + 100 : 0;
      }

      updatesToApply.columnId = newColumnId;
      updatesToApply.order = newOrderValue;

      // ─── Case 2: Reordering within the same column ──────────────────
    } else if (order !== undefined && order !== null) {
      const otherJobsInColumn = await prisma.jobApplication.findMany({
        where: {
          columnId: currentColumnId,
          id: { not: id },
        },
        orderBy: { order: "asc" },
        select: { id: true, order: true },
      });

      const currentJobOrder = jobApplication.order ?? 0;
      const currentPositionIndex = otherJobsInColumn.findIndex(
        (job) => job.order > currentJobOrder,
      );
      const oldPositionIndex =
        currentPositionIndex === -1
          ? otherJobsInColumn.length
          : currentPositionIndex;

      const newOrderValue = order * 100;

      if (order < oldPositionIndex) {
        // moving UP — shift cards DOWN
        const jobsToShiftDown = otherJobsInColumn.slice(
          order,
          oldPositionIndex,
        );
        await Promise.all(
          jobsToShiftDown.map((job) =>
            prisma.jobApplication.update({
              where: { id: job.id },
              data: { order: job.order + 100 },
            }),
          ),
        );
      } else if (order > oldPositionIndex) {
        // moving DOWN — shift cards UP
        const jobsToShiftUp = otherJobsInColumn.slice(oldPositionIndex, order);
        await Promise.all(
          jobsToShiftUp.map((job) =>
            prisma.jobApplication.update({
              where: { id: job.id },
              data: { order: Math.max(0, job.order - 100) },
            }),
          ),
        );
      }

      updatesToApply.order = newOrderValue;
    }

    // ─── Save final updates ─────────────────────────────────────────
    const updated = await prisma.jobApplication.update({
      where: { id },
      data: updatesToApply,
    });

    revalidatePath("/dashboard");
    return { success: true, data: updated };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Something went wrong." };
  }
}
