"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit2, Plus, Save, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"

type LogEntry = {
  id: string
  startTime: string
  endTime: string
  status: string
  location: string
  miles: string
  notes: string
  isEditing?: boolean
  isNew?: boolean
}

type LogTableProps = {
  date: Date
}

export function LogTable({ date }: LogTableProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)

  // Generate logs based on date
  useEffect(() => {
    // This would normally fetch from an API based on the date
    // For demo purposes, we'll generate some sample data
    const dayOfMonth = date.getDate()
    const dateStr = format(date, "yyyy-MM-dd")

    // Generate different patterns based on the day of the month
    let generatedLogs: LogEntry[] = []

    if (dayOfMonth % 3 === 0) {
      // Pattern 1
      generatedLogs = [
        {
          id: `${dateStr}-1`,
          startTime: "00:00",
          endTime: "06:00",
          status: "4",
          location: "Truck Stop, Denver CO",
          miles: "0",
          notes: "Rest period",
        },
        {
          id: `${dateStr}-2`,
          startTime: "06:00",
          endTime: "10:00",
          status: "2",
          location: "Truck Stop, Denver CO",
          miles: "0",
          notes: "Pre-trip inspection, loading",
        },
        {
          id: `${dateStr}-3`,
          startTime: "10:00",
          endTime: "14:00",
          status: "1",
          location: "I-70 E, Mile 240-390",
          miles: "150",
          notes: "Driving east on I-70",
        },
        {
          id: `${dateStr}-4`,
          startTime: "14:00",
          endTime: "15:00",
          status: "2",
          location: "Rest Area, Topeka KS",
          miles: "0",
          notes: "Lunch break",
        },
        {
          id: `${dateStr}-5`,
          startTime: "15:00",
          endTime: "19:00",
          status: "1",
          location: "I-70 E, Mile 440-540",
          miles: "100",
          notes: "Continuing east on I-70",
        },
        {
          id: `${dateStr}-6`,
          startTime: "19:00",
          endTime: "21:00",
          status: "2",
          location: "Truck Stop, Kansas City MO",
          miles: "0",
          notes: "Unloading, post-trip inspection",
        },
        {
          id: `${dateStr}-7`,
          startTime: "21:00",
          endTime: "24:00",
          status: "3",
          location: "Truck Stop, Kansas City MO",
          miles: "0",
          notes: "Sleeper berth",
        },
      ]
    } else if (dayOfMonth % 3 === 1) {
      // Pattern 2
      generatedLogs = [
        {
          id: `${dateStr}-1`,
          startTime: "00:00",
          endTime: "04:00",
          status: "4",
          location: "Truck Stop, Chicago IL",
          miles: "0",
          notes: "Off duty",
        },
        {
          id: `${dateStr}-2`,
          startTime: "04:00",
          endTime: "06:00",
          status: "3",
          location: "Truck Stop, Chicago IL",
          miles: "0",
          notes: "Sleeper berth",
        },
        {
          id: `${dateStr}-3`,
          startTime: "06:00",
          endTime: "08:00",
          status: "2",
          location: "Distribution Center, Chicago IL",
          miles: "0",
          notes: "Loading cargo",
        },
        {
          id: `${dateStr}-4`,
          startTime: "08:00",
          endTime: "12:00",
          status: "1",
          location: "I-80 W, Mile 120-240",
          miles: "120",
          notes: "Driving west on I-80",
        },
        {
          id: `${dateStr}-5`,
          startTime: "12:00",
          endTime: "13:00",
          status: "2",
          location: "Truck Stop, Iowa",
          miles: "0",
          notes: "Lunch break",
        },
        {
          id: `${dateStr}-6`,
          startTime: "13:00",
          endTime: "17:00",
          status: "1",
          location: "I-80 W, Mile 240-380",
          miles: "140",
          notes: "Continuing west on I-80",
        },
        {
          id: `${dateStr}-7`,
          startTime: "17:00",
          endTime: "19:00",
          status: "2",
          location: "Distribution Center, Omaha NE",
          miles: "0",
          notes: "Unloading cargo",
        },
        {
          id: `${dateStr}-8`,
          startTime: "19:00",
          endTime: "23:00",
          status: "3",
          location: "Truck Stop, Omaha NE",
          miles: "0",
          notes: "Sleeper berth",
        },
        {
          id: `${dateStr}-9`,
          startTime: "23:00",
          endTime: "24:00",
          status: "4",
          location: "Truck Stop, Omaha NE",
          miles: "0",
          notes: "Off duty",
        },
      ]
    } else {
      // Pattern 3
      generatedLogs = [
        {
          id: `${dateStr}-1`,
          startTime: "00:00",
          endTime: "05:00",
          status: "4",
          location: "Truck Stop, Dallas TX",
          miles: "0",
          notes: "Off duty",
        },
        {
          id: `${dateStr}-2`,
          startTime: "05:00",
          endTime: "07:00",
          status: "3",
          location: "Truck Stop, Dallas TX",
          miles: "0",
          notes: "Sleeper berth",
        },
        {
          id: `${dateStr}-3`,
          startTime: "07:00",
          endTime: "09:00",
          status: "2",
          location: "Warehouse, Dallas TX",
          miles: "0",
          notes: "Loading cargo",
        },
        {
          id: `${dateStr}-4`,
          startTime: "09:00",
          endTime: "13:00",
          status: "1",
          location: "I-35 N, Mile 100-250",
          miles: "150",
          notes: "Driving north on I-35",
        },
        {
          id: `${dateStr}-5`,
          startTime: "13:00",
          endTime: "14:00",
          status: "2",
          location: "Rest Area, Oklahoma",
          miles: "0",
          notes: "Lunch break",
        },
        {
          id: `${dateStr}-6`,
          startTime: "14:00",
          endTime: "18:00",
          status: "1",
          location: "I-35 N, Mile 250-400",
          miles: "150",
          notes: "Continuing north on I-35",
        },
        {
          id: `${dateStr}-7`,
          startTime: "18:00",
          endTime: "20:00",
          status: "2",
          location: "Distribution Center, Kansas City MO",
          miles: "0",
          notes: "Unloading cargo",
        },
        {
          id: `${dateStr}-8`,
          startTime: "20:00",
          endTime: "22:00",
          status: "3",
          location: "Truck Stop, Kansas City MO",
          miles: "0",
          notes: "Sleeper berth",
        },
        {
          id: `${dateStr}-9`,
          startTime: "22:00",
          endTime: "24:00",
          status: "4",
          location: "Truck Stop, Kansas City MO",
          miles: "0",
          notes: "Off duty",
        },
      ]
    }

    setLogs(generatedLogs)
  }, [date])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "1":
        return <Badge className="bg-green-500">Driving</Badge>
      case "2":
        return <Badge className="bg-blue-500">On Duty</Badge>
      case "3":
        return <Badge className="bg-yellow-500">Sleeper Berth</Badge>
      case "4":
        return <Badge variant="outline">Off Duty</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleEdit = (log: LogEntry) => {
    // Cancel any pending auto-save
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
      setAutoSaveTimeout(null)
    }

    setEditingLog({ ...log })
  }

  const handleSave = () => {
    if (editingLog) {
      if (editingLog.isNew) {
        setLogs([...logs, { ...editingLog, isNew: false }])
        toast({
          title: "Log entry added",
          description: "New log entry has been added successfully",
        })
      } else {
        setLogs(logs.map((log) => (log.id === editingLog.id ? { ...editingLog, isEditing: false } : log)))
        toast({
          title: "Log entry updated",
          description: "Changes have been saved successfully",
        })
      }
      setEditingLog(null)
    }
  }

  const handleCancel = () => {
    // Cancel any pending auto-save
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
      setAutoSaveTimeout(null)
    }

    if (editingLog?.isNew) {
      // If canceling a new entry, just discard it
      setEditingLog(null)
    } else {
      setEditingLog(null)
    }
  }

  const handleChange = (field: keyof LogEntry, value: string) => {
    if (editingLog) {
      const updatedLog = { ...editingLog, [field]: value }
      setEditingLog(updatedLog)

      // Set up auto-save after 2 seconds of inactivity
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }

      const timeout = setTimeout(() => {
        if (updatedLog.isNew) {
          setLogs([...logs, { ...updatedLog, isNew: false }])
          toast({
            title: "Auto-saved",
            description: "New log entry has been saved",
          })
        } else {
          setLogs(logs.map((log) => (log.id === updatedLog.id ? { ...updatedLog, isEditing: false } : log)))
          toast({
            title: "Auto-saved",
            description: "Changes have been saved automatically",
          })
        }
        setEditingLog(null)
      }, 2000)

      setAutoSaveTimeout(timeout)
    }
  }

  const handleAddEntry = () => {
    // Cancel any current editing
    if (editingLog) {
      handleCancel()
    }

    // Create a new empty log entry
    const newLog: LogEntry = {
      id: `new-${Date.now()}`,
      startTime: "",
      endTime: "",
      status: "2", // Default to On Duty
      location: "",
      miles: "0",
      notes: "",
      isEditing: true,
      isNew: true,
    }

    setEditingLog(newLog)
  }

  const handleDelete = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id))
    toast({
      title: "Log entry deleted",
      description: "The log entry has been removed",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead>Miles</TableHead>
            <TableHead className="hidden md:table-cell">Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editingLog?.isNew && (
            <TableRow>
              <TableCell>
                <Input
                  value={editingLog.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="h-8 w-20"
                  placeholder="HH:MM"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={editingLog.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className="h-8 w-20"
                  placeholder="HH:MM"
                />
              </TableCell>
              <TableCell>
                <Select value={editingLog.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger className="h-8 w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Driving</SelectItem>
                    <SelectItem value="2">On Duty</SelectItem>
                    <SelectItem value="3">Sleeper Berth</SelectItem>
                    <SelectItem value="4">Off Duty</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Input
                  value={editingLog.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="h-8"
                  placeholder="Enter location"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={editingLog.miles}
                  onChange={(e) => handleChange("miles", e.target.value)}
                  className="h-8 w-16"
                  placeholder="0"
                />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Input
                  value={editingLog.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="h-8"
                  placeholder="Add notes"
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}

          {logs.map((log) => (
            <motion.tr
              key={log.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              {editingLog && editingLog.id === log.id ? (
                // Editing mode
                <>
                  <TableCell>
                    <Input
                      value={editingLog.startTime}
                      onChange={(e) => handleChange("startTime", e.target.value)}
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={editingLog.endTime}
                      onChange={(e) => handleChange("endTime", e.target.value)}
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={editingLog.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Driving</SelectItem>
                        <SelectItem value="2">On Duty</SelectItem>
                        <SelectItem value="3">Sleeper Berth</SelectItem>
                        <SelectItem value="4">Off Duty</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Input
                      value={editingLog.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={editingLog.miles}
                      onChange={(e) => handleChange("miles", e.target.value)}
                      className="h-8 w-16"
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Input
                      value={editingLog.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={handleSave}>
                        <Save className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cancel</span>
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                // View mode
                <>
                  <TableCell>{log.startTime}</TableCell>
                  <TableCell>{log.endTime}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{log.location}</TableCell>
                  <TableCell>{log.miles}</TableCell>
                  <TableCell className="hidden md:table-cell">{log.notes}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(log)}>
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(log.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </motion.tr>
          ))}

          {logs.length === 0 && !editingLog?.isNew && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No log entries for this date. Click &quot;Add Entry&quot; to create one.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {!editingLog?.isNew && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleAddEntry} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      )}
    </div>
  )
}

