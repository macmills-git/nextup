import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const EventCardSkeleton = () => {
  return (
    <div className="rounded-[28px] border border-stone-200/90 bg-card p-3 flex flex-col justify-between">
      {/* Top Image Frame Placeholder */}
      <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-stone-100 p-3">
        <Skeleton className="w-full h-full rounded-[18px]" />
        <Skeleton className="absolute top-3 left-3 w-20 h-6 rounded-full" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-9 h-9 rounded-full" />
        </div>
      </div>

      {/* Content Section Placeholder */}
      <div className="px-2 pt-3.5 pb-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-12 rounded-lg" />
          </div>
          <Skeleton className="h-3 w-full rounded-md mt-2" />
        </div>

        {/* Footer Metadata Row Placeholder */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const VendorCardSkeleton = () => {
  return (
    <div className="rounded-[28px] border border-stone-200/90 bg-card p-3 flex flex-col justify-between">
      {/* Top Image Frame Placeholder */}
      <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-stone-100 p-3">
        <Skeleton className="w-full h-full rounded-[18px]" />
        <Skeleton className="absolute top-3 left-3 w-20 h-6 rounded-full" />
        <Skeleton className="absolute top-3 right-3 w-9 h-9 rounded-full" />
        
        {/* Floating Badge Placeholder */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full border border-stone-100/60 w-36">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-3 w-20 rounded-md" />
        </div>
      </div>

      {/* Content Section Placeholder */}
      <div className="px-2 pt-3.5 pb-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <Skeleton className="h-5 w-2/3 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-lg" />
          </div>
          <Skeleton className="h-3 w-full rounded-md mt-2" />
        </div>

        {/* Footer Metadata Row Placeholder */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const EventMapCardSkeleton = () => {
  return (
    <div className="rounded-[24px] border border-stone-200/90 bg-card p-3 flex gap-4">
      <Skeleton className="w-28 h-28 rounded-xl flex-shrink-0" />
      <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
          </div>
          <Skeleton className="h-4 w-3/4 rounded-md mt-2" />
          <Skeleton className="h-3 w-1/2 rounded-md mt-1" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const ListItemSkeleton = () => {
  return (
    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1">
        <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-3 w-1/3 rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
};
