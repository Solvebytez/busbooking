'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils";

type LinkButtonProps = {
href:string;
children: React.ReactNode;
disabled?: boolean;
className?: string;
}

const LinkButton = ({children,href,className,disabled}:LinkButtonProps) => {
  return (
    <Button disabled={disabled} asChild className={cn('px-4 py-2 rounded',className)}>
    <Link href={href}>{children}</Link>
  </Button>
  )
}

export default LinkButton