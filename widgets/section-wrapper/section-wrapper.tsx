import { cn } from "@/shared/lib/cn"
import { ReactNode } from "react"

type SectionWrapperProps = {
  children: ReactNode
  className?: string
}

export default function SectionWrapper({
  children,
  className
}: SectionWrapperProps) {
  return (
    <div className={cn("max-w-7xl w-full mx-auto", className)}>{children}</div>
  )
}
