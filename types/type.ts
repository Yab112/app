
type status = "Off Duty" | "Sleeper Berth" | "Driving" | "On Duty";
type LogEntry = {
    hour: number;
    status: status;
}

interface Stop {
    location: string
    time: string
    status: string
    type: string
  }
  
export interface TripSummaryProps {
    currentLocation: string
    destination: string
    remainingDistance: number
    totalDistance: number
    eta: string
    stops: Stop[]
  }

type LogData = LogEntry[];

export default LogData;