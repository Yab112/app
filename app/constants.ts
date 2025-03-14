import { Home, MapPin, FileText, Calendar, Fuel, AlertCircle, Settings, Info } from "lucide-react"

export const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/", active: true , index: 0},
  { icon: MapPin, label: "Routes", href: "/Routes" , index: 1},
  { icon: FileText, label: "ELD Logs", href: "/EldLogsheet", index: 2},
  { icon: Calendar, label: "Schedule", href: "/Calander" , index: 3},
]

export const reportItems = [
  { icon: Fuel, label: "Fuel Reports", href: "#" },
  { icon: AlertCircle, label: "Compliance", href: "#" },
]

export const settingItems = [
    { icon: Settings, label: "Settings", href: "#" },
    { icon: Info, label: "Help & Support", href: "#" },
  ]

export const stops = [
    { location: "Denver, CO", time: "8:00 AM", status: "completed", type: "pickup" },
    { location: "Grand Junction, CO", time: "12:30 PM", status: "current", type: "rest" },
    { location: "Green River, UT", time: "3:00 PM", status: "upcoming", type: "fuel" },
    { location: "Salt Lake City, UT", time: "5:30 PM", status: "upcoming", type: "dropoff" },
  ]

export const logData = [
    {
      type: "Driving",
      color: "bg-primary",
      segments: [
        { start: 8, duration: 4 },
        { start: 13, duration: 3.5 },
      ],
    },
    {
      type: "On Duty",
      color: "bg-amber-500",
      segments: [
        { start: 7, duration: 1 },
        { start: 12, duration: 1 },
      ],
    },
    {
      type: "Off Duty",
      color: "bg-green-500",
      segments: [
        { start: 0, duration: 7 },
        { start: 17, duration: 7 },
      ],
    },
    {
      type: "Sleeper",
      color: "bg-blue-500",
      segments: [],
    },
  ]

  export const  hours = Array.from({ length: 24 }).map((_, i) => {
    if (i === 0) return "12am"
    if (i === 12) return "12pm"
    return i > 12 ? `${i - 12}pm` : `${i}am`
  })