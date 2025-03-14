"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function WelcomeBanner({ progress, destination, remainingDistance }: {
  progress: number
  destination: string
  remainingDistance: number
}) {
  return (
    <div className="col-span-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
      <div className="flex items-center gap-6">
        <div className="relative h-28 w-28 overflow-hidden rounded-xl border-4 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/40 animate-pulse" />
          <Image
            src="/maru_pic_linkedin.jpg"
            alt="Truck"
            layout="fill"
            objectFit="cover"
            className="relative z-1"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Maru!</h1>
          <p className="text-muted-foreground">
            You&apos;re on your way to {destination}. {remainingDistance} miles to go.
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="font-medium mr-2">Trip Progress:</span>
            <div className="w-32 h-3 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ml-2 text-muted-foreground">{progress}%</span>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <div className="text-sm text-muted-foreground mb-1">Current Status</div>
          <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">On Route</Badge>
          <div className="relative h-10 w-10 mt-2">
            <Image
              src="/tracker_image.jpg"
              alt="Tracker"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}