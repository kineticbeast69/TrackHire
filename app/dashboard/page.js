import KabanBoard from "@/components/kabanBoard";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const getBoard = async (userId) => {
  // 👇 add this to simulate slow DB — remove after testing
  const board = await prisma.board.findFirst({
    where: { userId: userId },
    include: {
      columns: true,
      jobApplications: true,
    },
  });
  return board;
};
export default async function DashboardPage() {
  const session = await getSession();
  const board = await getBoard(session?.user.id);
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
          <p className="text-gray-600">Track your job application</p>
        </div>
        <KabanBoard
          session={session}
          board={board}
          columns={board?.columns}
          jobs={board?.jobApplications}
        />
      </div>
    </div>
  );
}
