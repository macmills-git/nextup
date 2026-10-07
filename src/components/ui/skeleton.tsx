import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-skeleton-shimmer rounded-md bg-stone-200/70 dark:bg-stone-800/70", className)}
      {...props}
    />
  );
}

export default Skeleton;
