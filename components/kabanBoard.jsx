"use client";

import { Award, Calendar, CheckCircle2, Mic, XCircle } from "lucide-react";
const columnConfig = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];
export default function KabanBoard({ session, board, columns }) {
  return (
    <>
      <div>
        <div></div>
      </div>
    </>
  );
}
