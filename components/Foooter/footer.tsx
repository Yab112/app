"use client"

import { Button } from "@/components/ui/button"
import { Fuel, FileText, AlertCircle } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="border-t border-blue-100 dark:border-blue-900 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span>Next mandatory rest: 4.5 hours from now</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <Fuel className="h-4 w-4 mr-2" />
            Fuel Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <FileText className="h-4 w-4 mr-2" />
            Compliance Status
          </Button>
        </div>
      </div>
    </footer>
  )
}