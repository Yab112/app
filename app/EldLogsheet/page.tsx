"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ThemeProvider } from "@/components/themeProvider/theme-provider"
import { LogTable } from "@/components/Log/log-table"
import { LogChart } from "@/components/Log/log-chart"
import { ComplianceSummary } from "@/components/Log/compliancesummery"



export default function ELDLogger() {
  const [date, setDate] = useState(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handlePreviousDay = () => setDate(subDays(date, 1))
  const handleNextDay = () => setDate(addDays(date, 1))
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setIsCalendarOpen(false)
    }
  }

  return (
    <ThemeProvider storageKey="eld-theme">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Mobile Date Selector */}
        <div className="items-center justify-center p-4 gap-2 flex">
          <Button variant="outline" size="sm" onClick={handlePreviousDay}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="mr-1 h-4 w-4" /> {format(date, "MMM d")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" onClick={handleNextDay}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Log Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Daily Log Chart</CardTitle>
                  <CardDescription>24-hour timeline showing duty status changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <LogChart date={date} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Log Table and Compliance Summary */}
            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Log Entries</CardTitle>
                    <CardDescription>Detailed breakdown of duty status changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LogTable date={date} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
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
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
