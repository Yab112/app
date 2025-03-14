"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
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
import { toast } from "@/hooks/use-toast"

// Status codes
// 1: Driving (Green)
// 2: On Duty (Blue)
// 3: Sleeper Berth (Yellow)
// 4: Off Duty (Gray)

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
  date: Date
}

export function LogChart({ date }: LogChartProps) {
  const [logData, setLogData] = useState<LogEntry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartHour, setDragStartHour] = useState<number | null>(null)
  const [dragEndHour, setDragEndHour] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
//   const dragControls = useDragControls()

  // Generate initial log data based on date
  useEffect(() => {
    // This would normally fetch from an API based on the date
    // For demo purposes, we'll generate some sample data
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hourStr = i < 12 ? `${i === 0 ? 12 : i} AM` : `${i === 12 ? 12 : i - 12} PM`

      // Generate different patterns based on the day of the month
      // to simulate different days having different logs
      const dayOfMonth = date.getDate()
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

  const handleBarClick = (data: { activePayload?: { payload: LogEntry }[] }) => {
      if (isDragging) return
  
      if (data.activePayload && data.activePayload.length > 0) {
        setSelectedEntry(data.activePayload[0].payload)
        setIsDialogOpen(true)
      }
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

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: LogEntry }[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <p className="font-medium">
            {data.startTime} - {data.endTime}
          </p>
          <p className="text-sm">{getStatusName(data.status)}</p>
          {data.location && <p className="text-xs text-muted-foreground">{data.location}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div ref={chartRef} className="relative" onMouseUp={() => isDragging && handleDragEnd()}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ChartContainer className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={logData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                  barSize={20}
                  onClick={(data) => data && handleBarClick(data.activePayload?.[0]?.payload)}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    scale="band"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.replace(" ", "")}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="duration" radius={[4, 4, 0, 0]} cursor="pointer">
                    {logData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getStatusColor(entry.status)}
                        onMouseDown={() => handleDragStart(entry.hourIndex)}
                        onMouseOver={() => handleDragMove(entry.hourIndex)}
                      />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>
        </AnimatePresence>

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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChange}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

