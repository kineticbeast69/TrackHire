"use client";

import {
  AlertCircle,
  Briefcase,
  Building2,
  DollarSign,
  Edit2,
  ExternalLink,
  FileText,
  Link,
  Loader2,
  MapPin,
  MoreVertical,
  Plus,
  StickyNote,
  Tag,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import jobSchemas from "@/lib/validation/addJob.schema";
import React, { useState } from "react";
import { UpdateJobApplication } from "@/lib/action/updateJobApplicaiton";
import { DeleteJobApplication } from "@/lib/action/deleteJobApplication";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { toast } from "react-toastify";
const JobApplicationCard = React.memo(function JobApplicationCard({
  jobs,
  columns,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(jobSchemas) });
  const [edit, setEdit] = useState(false);
  // moving the job card
  async function handleMove(newColumnId) {
    try {
      const result = await UpdateJobApplication(jobs.id, {
        columnId: newColumnId,
      });
      console.log(result);
    } catch (error) {
      console.log("Failed to move job application", error);
    }
  }

  // editing the job card
  const editSubmit = async (data) => {
    try {
      const result = await UpdateJobApplication(jobs.id, {
        ...data,
      });
      console.log(result);
      if (result.success) return toast.success("Job edit succesfully.");
    } catch (error) {
      console.log("Failed to move job application", error);
    }
  };

  // deleting the job application
  const deleteJob = async (id) => {
    try {
      const result = await DeleteJobApplication(id);
      console.log(result);
      if (result.success) return toast.success("Job deleted succesfully.");
    } catch (error) {
      console.log("Failed to move job application", error);
    }
  };
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
                  <DropdownMenuItem onClick={() => setEdit(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c.id !== jobs.columnId)
                        .map((column, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={() => handleMove(column.id)}
                          >
                            <span className="text-black hover:text-red-500">
                              Move to {column.name}
                            </span>
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}
                  <DropdownMenuItem onClick={() => deleteJob(jobs?.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* edit the job dialog */}
      <Dialog open={edit} onOpenChange={setEdit}>
        <DialogContent className="w-full max-w-2xl rounded-2xl border border-gray-200 shadow-xl p-0 gap-0 overflow-hidden">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gray-50/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Edit Job Application
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                  Track a new job opportunity in your pipeline
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit(editSubmit)}>
            <div className="px-6 py-5 space-y-5 overflow-y-auto max-h-[60vh]">
              {/* Company + Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="company"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                  >
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    Company <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="company"
                    placeholder="e.g. Google"
                    defaultValue={jobs?.company}
                    className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                    {...register("company")}
                  />
                  {errors.company && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.company.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="position"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    Position <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="position"
                    defaultValue={jobs?.position}
                    placeholder="e.g. Frontend Engineer"
                    className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                    {...register("position")}
                  />
                  {errors.position && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.position.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location + Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    defaultValue={jobs?.location}
                    placeholder="e.g. Remote / New York"
                    className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="salary"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                  >
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    defaultValue={jobs?.salary}
                    placeholder="e.g. $100k – $150k"
                    className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                    {...register("salary")}
                  />
                  {errors.salary && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.salary.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Job URL */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="jobUrl"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                >
                  <Link className="h-3.5 w-3.5 text-muted-foreground" />
                  Job URL
                </Label>
                <Input
                  id="jobUrl"
                  type="url"
                  defaultValue={jobs?.jobUrl}
                  placeholder="https://jobs.example.com/frontend-engineer"
                  className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                  {...register("jobUrl")}
                />
                {errors.jobUrl && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.jobUrl.message}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="tags"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                >
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                  Tags <span className="text-red-400">*</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  id="tags"
                  defaultValue={jobs?.tags.join(", ")}
                  placeholder="React, Tailwind, High Pay, Startup"
                  className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                  {...register("tags")}
                />
                {errors.tags && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.tags.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  defaultValue={jobs?.description}
                  rows={3}
                  placeholder="Brief description of the role and responsibilities..."
                  className="rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                >
                  <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  defaultValue={jobs?.notes}
                  rows={3}
                  placeholder="Any personal notes, referrals, or follow-up reminders..."
                  className="rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                  {...register("notes")}
                />
                {errors.notes && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.notes.message}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEdit(false)}
                className="w-full sm:w-auto rounded-lg border-gray-200 text-gray-700 hover:bg-gray-100 h-10"
              >
                Cancel
              </Button>
              <Button
                type={isSubmitting ? "button" : "submit"}
                className="w-full sm:w-auto rounded-lg bg-primary hover:bg-primary/90 text-white h-10 font-medium hover:shadow-md transition-all duration-200"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Edit Job
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
});
export default JobApplicationCard;
