"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"


type LogEntry = {
  hour: string
  hourIndex: number
  status: number
  duration: number
  location: string
  startTime: string
  endTime: string
}

type LogChartProps = {
  date?: Date
}

export function LogChart({ date = new Date() }: LogChartProps) {
  const [logData, setLogData] = useState<LogEntry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartHour, setDragStartHour] = useState<number | null>(null)
  const [dragEndHour, setDragEndHour] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  // Generate initial log data based on date
  useEffect(() => {
    // This would normally fetch from an API based on the date
    // For demo purposes, we'll generate some sample data
    const currentDate = date || new Date()
    const dayOfMonth = currentDate.getDate()

    const hours = Array.from({ length: 24 }, (_, i) => {
      const hourStr = i < 12 ? `${i === 0 ? 12 : i} AM` : `${i === 12 ? 12 : i - 12} PM`

      // Generate different patterns based on the day of the month
      // to simulate different days having different logs
      let status = 4 // Default to Off Duty

      // Pattern based on day of month
      if (dayOfMonth % 3 === 0) {
        // Pattern 1
        if (i >= 6 && i < 10)
          status = 2 // On Duty
        else if (i >= 10 && i < 14)
          status = 1 // Driving
        else if (i >= 14 && i < 15)
          status = 2 // On Duty
        else if (i >= 15 && i < 19)
          status = 1 // Driving
        else if (i >= 19 && i < 21)
          status = 2 // On Duty
        else if (i >= 21 && i < 24) status = 3 // Sleeper Berth
      } else if (dayOfMonth % 3 === 1) {
        // Pattern 2
        if (i >= 4 && i < 6)
          status = 3 // Sleeper Berth
        else if (i >= 6 && i < 8)
          status = 2 // On Duty
        else if (i >= 8 && i < 12)
          status = 1 // Driving
        else if (i >= 12 && i < 13)
          status = 2 // On Duty
        else if (i >= 13 && i < 17)
          status = 1 // Driving
        else if (i >= 17 && i < 19)
          status = 2 // On Duty
        else if (i >= 19 && i < 23) status = 3 // Sleeper Berth
      } else {
        // Pattern 3
        if (i >= 5 && i < 7)
          status = 3 // Sleeper Berth
        else if (i >= 7 && i < 9)
          status = 2 // On Duty
        else if (i >= 9 && i < 13)
          status = 1 // Driving
        else if (i >= 13 && i < 14)
          status = 2 // On Duty
        else if (i >= 14 && i < 18)
          status = 1 // Driving
        else if (i >= 18 && i < 20)
          status = 2 // On Duty
        else if (i >= 20 && i < 22) status = 3 // Sleeper Berth
      }

      // Generate location based on status
      let location = ""
      if (status === 1) {
        location = `Highway I-${70 + (i % 10)}, Mile ${i * 20}`
      } else if (status === 2) {
        location = i < 12 ? "Truck Stop, Denver CO" : "Distribution Center, Kansas City MO"
      }

      // Format start and end times
      const startHour = i
      const endHour = i + 1
      const startTime = `${startHour.toString().padStart(2, "0")}:00`
      const endTime = `${endHour.toString().padStart(2, "0")}:00`

      return {
        hour: hourStr,
        hourIndex: i,
        status,
        duration: 1,
        location,
        startTime,
        endTime,
      }
    })

    setLogData(hours)
  }, [date])

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "#22c55e" // green-500
      case 2:
        return "#3b82f6" // blue-500
      case 3:
        return "#eab308" // yellow-500
      case 4:
        return "#d1d5db" // gray-300
      default:
        return "#d1d5db"
    }
  }

  const getStatusName = (status: number) => {
    switch (status) {
      case 1:
        return "Driving 🟢"
      case 2:
        return "On Duty 🔵"
      case 3:
        return "Sleeper Berth 🟡"
      case 4:
        return "Off Duty ⚪"
      default:
        return "Unknown"
    }
  }

  const handleCellClick = (entry: LogEntry) => {
    if (isDragging) return

    setSelectedEntry(entry)
    setIsDialogOpen(true)
  }

  const handleSaveChange = () => {
    if (selectedEntry) {
      setLogData(logData.map((item) => (item.hourIndex === selectedEntry.hourIndex ? selectedEntry : item)))
      setIsDialogOpen(false)

      toast({
        title: "Log entry updated",
        description: `Status changed to ${getStatusName(selectedEntry.status)}`,
      })
    }
  }

  const handleStatusChange = (value: string) => {
    if (selectedEntry) {
      setSelectedEntry({
        ...selectedEntry,
        status: Number.parseInt(value),
      })
    }
  }

  const handleLocationChange = (value: string) => {
    if (selectedEntry) {
      setSelectedEntry({
        ...selectedEntry,
        location: value,
      })
    }
  }

  // Handle drag start
  const handleDragStart = (hourIndex: number) => {
    setIsDragging(true)
    setDragStartHour(hourIndex)
    setDragEndHour(hourIndex)
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)

    if (dragStartHour !== null && dragEndHour !== null) {
      // Ensure start is before end
      const startHour = Math.min(dragStartHour, dragEndHour)
      const endHour = Math.max(dragStartHour, dragEndHour)

      // Open dialog to set status for the range
      setSelectedEntry({
        hour: `${startHour}:00 - ${endHour}:00`,
        hourIndex: startHour,
        status: 1, // Default to Driving
        duration: endHour - startHour,
        location: "",
        startTime: `${startHour.toString().padStart(2, "0")}:00`,
        endTime: `${endHour.toString().padStart(2, "0")}:00`,
      })
      setIsDialogOpen(true)
    }

    setDragStartHour(null)
    setDragEndHour(null)
  }

  // Handle drag move
  const handleDragMove = (hourIndex: number) => {
    if (isDragging && dragStartHour !== null) {
      setDragEndHour(hourIndex)
    }
  }

  // Calculate totals for each status
  const statusTotals = [1, 2, 3, 4].map((status) => {
    return logData.filter((entry) => entry.status === status).length
  })

  return (
    <>
      <div
        ref={chartRef}
        className="relative"
        onMouseUp={() => isDragging && handleDragEnd()}
        onMouseLeave={() => isDragging && handleDragEnd()}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="border rounded-lg p-4"
          >
            <div className="text-center font-bold text-lg mb-4">
              Driver&aposs Duty Log
              <div className="text-sm font-normal text-gray-500">{date ? date.toLocaleDateString() : "Today"}</div>
            </div>

            {/* Hours header */}
            <div className="flex">
              <div className="w-24 flex-shrink-0"></div>
              <div className="flex-1 flex border-b">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="flex-1 text-center text-xs">
                    {i}
                  </div>
                ))}
              </div>
              <div className="w-16 flex-shrink-0 text-center text-xs font-semibold">Total</div>
            </div>

            {/* Status rows */}
            <div className="flex flex-col">
              {[4, 1, 2, 3].map((statusCode, rowIndex) => (
                <div key={statusCode} className="flex h-10 items-center">
                  <div className="w-24 flex-shrink-0 text-sm pr-2">
                    {getStatusName(statusCode)
                      .replace(" 🟢", "")
                      .replace(" 🔵", "")
                      .replace(" 🟡", "")
                      .replace(" ⚪", "")}
                  </div>
                  <div className="flex-1 flex border-b">
                    {Array.from({ length: 24 }, (_, hourIndex) => {
                      const entry = logData.find((e) => e.hourIndex === hourIndex)
                      const isActive = entry && entry.status === statusCode

                      return (
                        <div
                          key={hourIndex}
                          className="flex-1 flex items-center justify-center cursor-pointer"
                          onClick={() => entry && handleCellClick(entry)}
                          onMouseDown={() => handleDragStart(hourIndex)}
                          onMouseOver={() => handleDragMove(hourIndex)}
                        >
                          <div
                            className={`w-full h-6 ${isActive ? "" : "border border-dashed border-gray-300"}`}
                            style={{
                              backgroundColor: isActive ? getStatusColor(statusCode) : "transparent",
                              borderRadius: isActive ? "4px" : "0",
                            }}
                          ></div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="w-16 flex-shrink-0 text-center font-semibold">{statusTotals[rowIndex]}h</div>
                </div>
              ))}
            </div>

            {/* Drag selection overlay */}
            {isDragging && dragStartHour !== null && dragEndHour !== null && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="bg-primary/20 border border-primary rounded-md px-4 py-2">
                    Selecting: {Math.min(dragStartHour, dragEndHour)}:00 - {Math.max(dragStartHour, dragEndHour)}:00
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm">Driving</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <span className="text-sm">On Duty</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm">Sleeper Berth</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-gray-300"></span>
            <span className="text-sm">Off Duty</span>
          </div>
        </div>

        <div className="text-center mt-2 text-sm text-muted-foreground">
          <p>Click on a time slot to edit or drag to select multiple hours</p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Log Entry</DialogTitle>
            <DialogDescription>
              {selectedEntry?.duration === 1
                ? `Update duty status for ${selectedEntry?.hour}`
                : `Update duty status from ${selectedEntry?.startTime} to ${selectedEntry?.endTime}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Duty Status</Label>
              <Select value={selectedEntry?.status.toString()} onValueChange={handleStatusChange}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Driving 🟢</SelectItem>
                  <SelectItem value="2">On Duty 🔵</SelectItem>
                  <SelectItem value="3">Sleeper Berth 🟡</SelectItem>
                  <SelectItem value="4">Off Duty ⚪</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={selectedEntry?.location || ""}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Enter location"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-blue-600">
              Cancel
            </Button>
            <Button onClick={handleSaveChange} variant="outline">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

