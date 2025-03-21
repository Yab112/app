"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

type LogEntry = {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  location: string;
  miles: string;
  notes: string;
  isEditing?: boolean;
  isNew?: boolean;
};

type LogTableProps = {
  date: Date;
};

export function LogTable({ date }: LogTableProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);

  // Generate logs based on date
  useEffect(() => {
    // This would normally fetch from an API based on the date
    // For demo purposes, we'll generate some sample data
    const dayOfMonth = date.getDate();
    const dateStr = format(date, "yyyy-MM-dd");

    // Generate different patterns based on the day of the month
    let generatedLogs: LogEntry[] = [];

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
      ];
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
      ];
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
      ];
    }

    setLogs(generatedLogs);
    setTotalPages(Math.ceil(generatedLogs.length / itemsPerPage));
    setCurrentPage(1);
  }, [date, itemsPerPage]);

  // Update displayed logs when page changes or logs change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedLogs(logs.slice(startIndex, endIndex));
  }, [logs, currentPage, itemsPerPage]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "1":
        return <Badge className="bg-green-500">Driving</Badge>;
      case "2":
        return <Badge className="bg-blue-500">On Duty</Badge>;
      case "3":
        return <Badge className="bg-yellow-500">Sleeper Berth</Badge>;
      case "4":
        return <Badge variant="outline">Off Duty</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleEdit = (log: LogEntry) => {
    // Cancel any pending auto-save
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
      setAutoSaveTimeout(null);
    }

    setEditingLog({ ...log });
  };

  const handleSave = () => {
    if (editingLog) {
      if (editingLog.isNew) {
        const updatedLogs = [...logs, { ...editingLog, isNew: false }];
        setLogs(updatedLogs);
        setTotalPages(Math.ceil(updatedLogs.length / itemsPerPage));
        // Navigate to the last page to show the new entry
        setCurrentPage(Math.ceil(updatedLogs.length / itemsPerPage));
        toast({
          title: "Log entry added",
          description: "New log entry has been added successfully",
        });
      } else {
        setLogs(
          logs.map((log) =>
            log.id === editingLog.id ? { ...editingLog, isEditing: false } : log
          )
        );
        toast({
          title: "Log entry updated",
          description: "Changes have been saved successfully",
        });
      }
      setEditingLog(null);
    }
  };

  const handleCancel = () => {
    // Cancel any pending auto-save
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
      setAutoSaveTimeout(null);
    }

    setEditingLog(null);
  };

  const handleChange = (field: keyof LogEntry, value: string) => {
    if (editingLog) {
      const updatedLog = { ...editingLog, [field]: value };
      setEditingLog(updatedLog);
    }
  };

  const handleAddEntry = () => {
    // Cancel any current editing
    if (editingLog) {
      handleCancel();
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
    };

    setEditingLog(newLog);
  };

  const handleDelete = (id: string) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    setTotalPages(Math.ceil(updatedLogs.length / itemsPerPage));

    // If we're on a page that no longer has items, go to the previous page
    if (
      currentPage > Math.ceil(updatedLogs.length / itemsPerPage) &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }

    toast({
      title: "Log entry deleted",
      description: "The log entry has been removed",
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = Number.parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setTotalPages(Math.ceil(logs.length / newItemsPerPage));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="space-y-4">
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Button
          onClick={handleAddEntry}
          className="gap-1 bg-blue-300 hover:bg-blue-400 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Show:
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
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
                  <Select
                    value={editingLog.status}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger className="h-8 w-28 max-w-full">
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

            {displayedLogs.map((log) => (
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
                        onChange={(e) =>
                          handleChange("startTime", e.target.value)
                        }
                        className="h-8 w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editingLog.endTime}
                        onChange={(e) =>
                          handleChange("endTime", e.target.value)
                        }
                        className="h-8 w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editingLog.status}
                        onValueChange={(value) => handleChange("status", value)}
                      >
                        <SelectTrigger className="h-8 w-28 max-w-full">
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
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleSave}
                        >
                          <Save className="h-4 w-4" />
                          <span className="sr-only">Save</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCancel}
                        >
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
                    <TableCell className="hidden md:table-cell">
                      {log.location}
                    </TableCell>
                    <TableCell>{log.miles}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {log.notes}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(log)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(log.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </motion.tr>
            ))}

            {displayedLogs.length === 0 && !editingLog?.isNew && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No log entries for this date. Click &quot;Add Entry&quot; to
                  create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, logs.length)} of {logs.length}{" "}
            entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="flex items-center text-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => handlePageChange(page)}
                    className="h-8 w-8 mx-0.5 bg-blue-500 hover:bg-blue-400"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
