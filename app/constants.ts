import { Home, MapPin, FileText, Calendar, Fuel, AlertCircle, Settings, Info } from "lucide-react"

export const navigationItems = [
  { icon: Home, label: "Dashboard", href: "#", active: true },
  { icon: MapPin, label: "Routes", href: "#" },
  { icon: FileText, label: "ELD Logs", href: "#" },
  { icon: Calendar, label: "Schedule", href: "#" },
]

export const reportItems = [
  { icon: Fuel, label: "Fuel Reports", href: "#" },
  { icon: AlertCircle, label: "Compliance", href: "#" },
]

export const settingItems = [
    { icon: Settings, label: "Settings", href: "#" },
    { icon: Info, label: "Help & Support", href: "#" },
  ]