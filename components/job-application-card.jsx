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

export default function JobApplicationCard({ jobs, columns }) {
  console.log(jobs);
  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div>
              <h3>{jobs?.position}</h3>
              <p>{jobs?.company}</p>
              {jobs?.description && <p>{jobs?.description}</p>}
              {jobs?.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
              {jobs?.jobUrl && (
                <a target="_blank" href={jobs.jobUrl}>
                  <ExternalLink />
                </a>
              )}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 />
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
                    <Trash2 />
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
}
