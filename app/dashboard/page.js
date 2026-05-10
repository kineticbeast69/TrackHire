import KabanBoard from "@/components/kabanBoard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
          <p className="text-gray-600">Track your job application</p>
        </div>
        <KabanBoard />
      </div>
    </div>
  );
}
