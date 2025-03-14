"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HelpCircle,
  Mail,
  Menu,
  Printer,
  User,
} from "lucide-react"
import { format, addDays, subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { ThemeProvider } from "@/components/themeProvider/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { LogChart } from "./log-chart"
import { LogTable } from "./log-table"
import { ComplianceSummary } from "./compliancesummery"

export default function ELDLogger() {
  const [date, setDate] = useState(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const isMobile = useIsMobile()

  const handlePreviousDay = () => {
    setDate(subDays(date, 1))
  }

  const handleNextDay = () => {
    setDate(addDays(date, 1))
  }

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setIsCalendarOpen(false)
    }
  }

  return (
    <ThemeProvider defaultTheme={isDarkMode ? "dark" : "light"} storageKey="eld-theme">
      <div className={cn("flex min-h-screen flex-col bg-background text-foreground", isDarkMode ? "dark" : "")}>
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col gap-4 py-4">
                    <div className="px-4 py-2 text-lg font-bold">ELD Logger</div>
                    <Button variant="ghost" className="justify-start">
                      Dashboard
                    </Button>
                    <Button variant="secondary" className="justify-start">
                      Daily Logs
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Reports
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Settings
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-lg font-bold">ELD Logger</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center mr-4">
              <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Day</span>
              </Button>

              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mx-2 min-w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(date, "EEEE, MMMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="icon" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Day</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2 mr-2">
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5" />
                    <span className="sr-only">Help</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Mobile Date Selector */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <Button variant="outline" size="sm" onClick={handlePreviousDay}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="mr-1 h-4 w-4" />
                {format(date, "MMM d")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" onClick={handleNextDay}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Status Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Driving 🟢</div>
                    <p className="text-xs text-muted-foreground">Since 10:30 AM</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Drive Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5h 15m</div>
                    <div className="mt-2">
                      <Progress value={48} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">5h 45m remaining</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">On-Duty Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8h 30m</div>
                    <div className="mt-2">
                      <Progress value={61} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">5h 30m remaining</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Compliant ✅</div>
                    <p className="text-xs text-muted-foreground">No violations</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Log Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Daily Log Chart</CardTitle>
                      <CardDescription>24-hour timeline showing duty status changes</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <LogChart date={date} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Log Table and Compliance Summary */}
            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Log Entries</CardTitle>
                        <CardDescription>Detailed breakdown of duty status changes</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Add Entry
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <LogTable date={date} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Summary</CardTitle>
                    <CardDescription>Hours of service tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ComplianceSummary />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Export Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Export & Share</CardTitle>
                  <CardDescription>Download or share your logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      Export as PDF
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Printer className="h-4 w-4" />
                      Print Log
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Email Log
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

