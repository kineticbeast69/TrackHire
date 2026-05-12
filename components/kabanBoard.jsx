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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu } from "./ui/dropdown-menu";
import JobApplicationCard from "./job-application-card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";
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
const defaultColumn = {
  color: "bg-gray-500",
  icon: <Calendar className="h-4 w-4" />,
};

function SortedJobCard({ jobs, columns }) {
  return (
    <div>
      <JobApplicationCard jobs={jobs} columns={columns} />
    </div>
  );
}

function DropableColumn({ column, config, boardId, jobs, sortedColumns }) {
  const sortedJobs = jobs?.sort((a, b) => a.order - b.order) || [];
  return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
      <CardHeader className={`${config.color} text-white rounded-lg pb-3 pt-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* card content */}
      <CardContent className="space-y-2 pt-4 bg-gray-50?50 min-h-[400px] rounded-b-lg">
        {/* sorted jobs */}
        {sortedJobs.map((job, index) => {
          return (
            <SortedJobCard
              key={index}
              jobs={{ ...job, columnId: job.columnId }}
              columns={sortedColumns}
            />
          );
        })}
        {/* add job component */}
        <CreateJobApplicationDialog boardId={boardId} columnId={column.id} />
      </CardContent>
    </Card>
  );
}

export default function KabanBoard({ board, columns, jobs }) {
  const sortedColumns = columns.sort((a, b) => a.order - b.order);
  return (
    <>
      <div>
        <div>
          {columns.map((col, index) => {
            const config = columnConfig[index] || defaultColumn;
            return (
              <DropableColumn
                key={index}
                column={col}
                jobs={jobs}
                config={config}
                boardId={board.id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
