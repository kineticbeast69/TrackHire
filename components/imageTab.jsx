"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize");
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/*tabs*/}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-lg px-6 py-3 text-sm transition-colors ${activeTab === "organize" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
            >
              Organize Application
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-lg px-6 py-3 text-sm transition-colors ${activeTab === "hired" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
            >
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab("manage")}
              className={`rounded-lg px-6 py-3 text-sm transition-colors ${activeTab === "manage" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
            >
              Manage Boards
            </Button>
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border-e-red-50 border-gray-200 shadow-xl">
            {activeTab === "organize" && (
              <Image
                src="/hero-images/hero1.png"
                alt="organize applications"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "hired" && (
              <Image
                src="/hero-images/hero2.png"
                alt="organize applications"
                width={1200}
                height={800}
              />
            )}
            {activeTab === "manage" && (
              <Image
                src="/hero-images/hero3.png"
                alt="organize applications"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
