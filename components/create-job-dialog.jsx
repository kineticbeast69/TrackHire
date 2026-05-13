"use client";
import {
  Plus,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Link,
  Tag,
  FileText,
  StickyNote,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import jobSchema from "@/lib/validation/addJob.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { createJobApplication } from "@/lib/action/createJobApplication";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";

const CreateJobApplicationDialog = React.memo(
  function CreateJobApplicationDialog({ columnId, boardId }) {
    const router = useRouter();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(jobSchema) });
    const [open, setOpen] = useState(false);
    const addJobSubmit = async (data) => {
      try {
        const result = await createJobApplication(data, boardId, columnId);
        if (result.success) {
          reset();
          toast.success("Job added succesfully.");
          router.refresh();
        } else {
          console.log(result.error);
        }
      } catch (error) {
        throw error;
      }
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-center gap-2 text-muted-foreground border border-dashed border-gray-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary rounded-xl h-10 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Add Job</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-2xl rounded-2xl border border-gray-200 shadow-xl p-0 gap-0 overflow-hidden">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gray-50/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Add Job Application
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                  Track a new job opportunity in your pipeline
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit(addJobSubmit)}>
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
                onClick={() => setOpen(false)}
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
                    Add Application
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
);
export default CreateJobApplicationDialog;
