import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({children, className} : {children: ReactNode, className?: string}) {
  return <div className={cn('w-full h-full', className)}>
    {children}
  </div>
}