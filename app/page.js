"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import ImageTabs from "@/components/imageTab";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* hero section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold">
              A better way to track your job application
            </h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Capture, Organize, and manage your job search in one place.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="h-12 px-8 text-lg font-medium">
                Start for free <ArrowRight className="ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Free forever, No credit card required.
              </p>
            </div>
          </div>
        </section>

        {/* hero images sectio with tabs */}
        <ImageTabs />

        {/* features section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group flex flex-col rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 bg-white cursor-default">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group flex flex-col rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 bg-white cursor-default">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor your application status from applied to interview to
                  offer with visual Kanban boards.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group flex flex-col rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 bg-white cursor-default sm:col-span-2 md:col-span-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
