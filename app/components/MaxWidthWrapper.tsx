import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({children, className} : {children: ReactNode, className?: string}) {
  return <div className={cn('w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg h-full mx-auto', className)}>
    {children}
  </div>
}