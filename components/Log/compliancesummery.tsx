"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ComplianceSummary() {
  // Sample compliance data
  const complianceData = {
    drivingHours: {
      daily: {
        used: 8.5,
        limit: 11,
        percentage: Math.round((8.5 / 11) * 100),
        remaining: 2.5,
      },
      cycle: {
        used: 34.25,
        limit: 60,
        percentage: Math.round((34.25 / 60) * 100),
        remaining: 25.75,
      },
    },
    onDutyHours: {
      daily: {
        used: 12,
        limit: 14,
        percentage: Math.round((12 / 14) * 100),
        remaining: 2,
      },
    },
    restHours: {
      used: 10,
      required: 10,
      percentage: 100,
    },
    violations: [],
    nextBreakRequired: "16:30",
    cycleResetDate: "Sunday, June 30",
    weeklyRecap: {
      monday: { hours: 10, compliant: true },
      tuesday: { hours: 11, compliant: true },
      wednesday: { hours: 9.5, compliant: true },
      thursday: { hours: 10.5, compliant: true },
      friday: { hours: 8.5, compliant: true },
      saturday: { hours: 0, compliant: true },
      sunday: { hours: 0, compliant: true },
    },
  }

  const progressVariants = {
    initial: { width: 0 },
    animate: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1, ease: "easeOut" },
    }),
  }

  return (
    <div className="space-y-6">
      {/* Hours of Service Summary */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Hours of Service Summary</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Driving Hours ✅</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>11-Hour Driving Limit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium">
                {complianceData.drivingHours.daily.used} / {complianceData.drivingHours.daily.limit} hours
              </span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-green-500"
                initial="initial"
                animate="animate"
                custom={complianceData.drivingHours.daily.percentage}
                variants={progressVariants}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{complianceData.drivingHours.daily.remaining} hours remaining</span>
              <span>Next break: {complianceData.nextBreakRequired}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">On-Duty Hours ✅</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>14-Hour On-Duty Limit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium">
                {complianceData.onDutyHours.daily.used} / {complianceData.onDutyHours.daily.limit} hours
              </span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-blue-500"
                initial="initial"
                animate="animate"
                custom={complianceData.onDutyHours.daily.percentage}
                variants={progressVariants}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{complianceData.onDutyHours.daily.remaining} hours remaining</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Cycle Hours ⏳</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>60-Hour / 7-Day Rule</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium">
                {complianceData.drivingHours.cycle.used} / {complianceData.drivingHours.cycle.limit} hours
              </span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-amber-500"
                initial="initial"
                animate="animate"
                custom={complianceData.drivingHours.cycle.percentage}
                variants={progressVariants}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{complianceData.drivingHours.cycle.remaining} hours remaining in cycle</span>
              <span>Reset: {complianceData.cycleResetDate}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Weekly Recap */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Weekly Recap</h3>

        <div className="grid grid-cols-7 gap-1 text-center">
          {Object.entries(complianceData.weeklyRecap).map(([day, data], index) => (
            <motion.div
              key={day}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="text-xs text-muted-foreground mb-1">{day.charAt(0).toUpperCase() + day.slice(1, 3)}</div>

              <div
                className={`flex h-16 w-8 flex-col justify-end rounded-t-sm overflow-hidden ${data.compliant ? "bg-muted" : "bg-destructive/20"}`}
              >
                <motion.div
                  className={`w-full ${data.compliant ? "bg-green-500" : "bg-destructive"}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.hours / 11) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>

              <div className="text-xs font-medium mt-1">{data.hours > 0 ? data.hours : "-"}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Driving Hours</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-destructive"></div>
            <span>Violations</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Compliance Status */}
      <div>
        {complianceData.violations.length > 0 ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Violations Detected</AlertTitle>
            <AlertDescription>
              You have {complianceData.violations.length} violations in the last 7 days
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Compliant Status</AlertTitle>
            <AlertDescription>You are currently compliant with all HOS regulations</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>Last updated: Today at 11:45 AM</p>
      </div>
    </div>
  )
}

