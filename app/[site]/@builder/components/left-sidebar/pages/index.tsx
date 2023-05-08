import { GaugeIcon } from "lucide-react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarButton, sidebarContent } from "../styles"

export default function SidebarPages() {
  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={sidebarButton} variant="subtle">
          <GaugeIcon size="16" />
        </Button>
      </SheetTrigger>
      <SheetContent position="left" className={cn(sidebarContent, "w-full")}>
        <SheetHeader className="p-4 font-semibold">Pages</SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
