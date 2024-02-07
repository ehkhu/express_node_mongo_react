// import Link from "next/link"

import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overviews
      </NavLink>
    </nav>
  )
}