"use client";

import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React from "react";
const JobApplicationCard = React.memo(function JobApplicationCard({
  jobs,
  columns,
}) {
  // console.log(jobs);
  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg bg-white group shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{jobs?.position}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {jobs?.company}
              </p>
              {jobs?.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {jobs?.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1 mb-2">
                {jobs?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {jobs?.jobUrl && (
                <a
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                  href={jobs.jobUrl}
                >
                  <ExternalLink className="h-3 w-3" />
                  View Job Posting
                </a>
              )}
            </div>
            <div className="flex items-start gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c.id !== jobs.columnId)
                        .map((column, index) => (
                          <DropdownMenuItem key={index}>
                            Move to {column.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}
                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
});
export default JobApplicationCard;
