"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Download, FileText, Mail, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"

export function ExportOptions() {
  const [date, setDate] = useState<Date>(new Date())
  const [dateRange, setDateRange] = useState<"day" | "week" | "month">("day")
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv">("pdf")
  const [email, setEmail] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)

  const handleExport = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export successful",
        description: `Log exported as ${exportFormat.toUpperCase()}`,
      })
    }, 1500)
  }

  const handlePrint = () => {
    setIsPrinting(true)

    // Simulate print process
    setTimeout(() => {
      setIsPrinting(false)
      toast({
        title: "Print job sent",
        description: "Your log is being printed",
      })
    }, 1500)
  }

  const handleEmail = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    setIsEmailing(true)

    // Simulate email process
    setTimeout(() => {
      setIsEmailing(false)
      toast({
        title: "Email sent",
        description: `Log sent to ${email}`,
      })
    }, 1500)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <motion.div initial="hidden" animate="visible" variants={cardVariants} custom={0}>
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={(value: "day" | "week" | "month") => setDateRange(value)}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Single Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={cardVariants} custom={1}>
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={cardVariants} custom={2}>
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <Select value={exportFormat} onValueChange={(value: "pdf" | "csv") => setExportFormat(value)}>
                <SelectTrigger id="export-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document 📄</SelectItem>
                  <SelectItem value="csv">CSV Spreadsheet 📊</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-rows-3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={3}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Export Log</p>
                    <p className="text-xs text-muted-foreground">Download as PDF or CSV</p>
                  </div>
                </div>
                <Button onClick={handleExport} className="gap-1" disabled={isExporting}>
                  {isExporting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={4}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Printer className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Print Log</p>
                    <p className="text-xs text-muted-foreground">Print physical copy</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handlePrint} className="gap-1" disabled={isPrinting}>
                  {isPrinting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Printer className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Printer className="h-4 w-4" />
                  )}
                  {isPrinting ? "Printing..." : "Print"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={5}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm font-medium">Email Log 📧</p>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button variant="secondary" onClick={handleEmail} disabled={isEmailing}>
                    {isEmailing ? "Sending..." : "Send"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

