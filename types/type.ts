
type status = "Off Duty" | "Sleeper Berth" | "Driving" | "On Duty";
type LogEntry = {
    hour: number;
    status: status;
}

type LogData = LogEntry[];

export default LogData;