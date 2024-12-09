import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({children, className} : {children: ReactNode, className?: string}) {
  return <div className={cn('mx-auto w-full max-w-screen-xl px-2.5', className)}>
    {children}
  </div>
}