"use client";

import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { DropdownMenu } from "./ui/dropdown-menu";
import { useBoard } from "@/lib/hooks/useBoard";
import React from "react";
import JobApplicationCard from "./job-application-card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";
import { useMemo } from "react";

const columnConfig = [
  {
    color: "bg-cyan-500",
    border: "border-t-cyan-500",
    badge: "bg-cyan-100 text-cyan-700",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    color: "bg-purple-500",
    border: "border-t-purple-500",
    badge: "bg-purple-100 text-purple-700",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    border: "border-t-green-500",
    badge: "bg-green-100 text-green-700",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    border: "border-t-yellow-500",
    badge: "bg-yellow-100 text-yellow-700",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    border: "border-t-red-500",
    badge: "bg-red-100 text-red-700",
    icon: <XCircle className="h-4 w-4" />,
  },
];

const defaultColumn = {
  color: "bg-gray-500",
  border: "border-t-gray-500",
  badge: "bg-gray-100 text-gray-700",
  icon: <Calendar className="h-4 w-4" />,
};

function SortedJobCard({ jobs, columns }) {
  return (
    <div>
      <JobApplicationCard jobs={jobs} columns={columns} />
    </div>
  );
}

const DropableColumn = React.memo(function DropableColumn({
  column,
  config,
  boardId,
  jobs,
  sortedColumns,
}) {
  const columnJobs = useMemo(
    () =>
      (jobs ?? [])
        .filter((job) => job.columnId === column.id)
        .sort((a, b) => a.order - b.order),
    [jobs, column.id],
  );

  return (
    <Card
      className={`
      flex flex-col w-full border-t-4 ${config.border}
      shadow-sm hover:shadow-md transition-shadow duration-200
      rounded-xl bg-white p-0 overflow-hidden
    `}
    >
      <CardHeader className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-md ${config.color} text-white shrink-0`}
            >
              {config.icon}
            </div>
            <span className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">
              {column.name}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}
            >
              {columnJobs.length}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border border-gray-200 shadow-lg"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer text-sm">
                <Trash2 className="h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2.5 p-3 bg-gray-50/60 min-h-[400px] flex-1">
        {columnJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-10 text-center">
            <div
              className={`h-10 w-10 rounded-full ${config.color} opacity-10 mb-3`}
            />
            <p className="text-xs text-muted-foreground">No applications yet</p>
          </div>
        ) : (
          columnJobs.map((job) => (
            <SortedJobCard key={job.id} jobs={job} columns={sortedColumns} />
          ))
        )}

        <div className="mt-auto pt-2">
          <CreateJobApplicationDialog boardId={boardId} columnId={column.id} />
        </div>
      </CardContent>
    </Card>
  );
});
const KabanBoard = React.memo(function KabanBoard({ board, columns, jobs }) {
  // const { columns, moveJob } = useBoard(board);
  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns],
  );

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:min-w-max">
        {sortedColumns.map((col, index) => {
          const config = columnConfig[index] || defaultColumn;
          return (
            <div key={col.id} className="w-full sm:w-[300px]">
              <DropableColumn
                column={col}
                jobs={jobs}
                config={config}
                boardId={board.id}
                sortedColumns={sortedColumns}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
export default KabanBoard;
