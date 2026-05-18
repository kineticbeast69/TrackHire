"use server";
import { prisma } from "../prisma";
import { getSession } from "../auth";
import { revalidatePath } from "next/cache";
export async function DeleteJobApplication(id) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await prisma.jobApplication.findUnique({
    where: {
      id,
    },
  });

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  if (jobApplication.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  await prisma.jobApplication.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");

  return { success: true };
}
