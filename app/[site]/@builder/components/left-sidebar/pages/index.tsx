import { GaugeIcon, LayoutTemplateIcon } from "lucide-react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarButton, sidebarContent, sidebarTitle } from "../styles"

export default function SidebarPages() {
  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={sidebarButton} variant="subtle">
          <LayoutTemplateIcon size="18" />
        </Button>
      </SheetTrigger>
      <SheetContent position="left" size="full" className={cn(sidebarContent, "max-w-full animate-none")}>
        <SheetHeader className={sidebarTitle}>Pages</SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
