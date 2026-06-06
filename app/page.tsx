// FIX: Wrap the client component that uses useSearchParams() in a Suspense
// boundary at the layout level. The component itself stays "use client".
import { Suspense } from "react";
import HomePageClient from "./home-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <main className="container px-4 py-6 mx-auto">
            <div className="mb-6">
              <div className="h-8 w-48 mb-4 rounded-md bg-muted animate-pulse" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array(20).fill(0).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-[240px] w-full rounded-md" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-2/3 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      }
    >
      <HomePageClient />
    </Suspense>
  );
}
