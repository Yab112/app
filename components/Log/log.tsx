"use client";
import { useEffect, useRef } from "react";
import LogData from "../../types/type";

interface ELDLogChartProps {
  logData: LogData;
}
const ELDLogChart = ({ logData }: ELDLogChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hours = 24;
  const statuses = ["Off Duty", "Sleeper Berth", "Driving", "On Duty"];
  const colors = {
    "Off Duty": "#f3f4f6",
    "Sleeper Berth": "#facc15",
    Driving: "#2563eb",
    "On Duty": "#ef4444",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const rowHeight = height / statuses.length;
    const colWidth = width / hours;

    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = "#d1d5db";
    for (let i = 0; i <= hours; i++) {
      ctx.beginPath();
      ctx.moveTo(i * colWidth, 0);
      ctx.lineTo(i * colWidth, height);
      ctx.stroke();
    }
    for (let i = 0; i <= statuses.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * rowHeight);
      ctx.lineTo(width, i * rowHeight);
      ctx.stroke();
    }

    // Plot Log Data
    ctx.lineWidth = 3;
    logData.forEach((entry, index) => {
      if (index === 0) return;
      const prev = logData[index - 1];
      const x1 = (prev.hour / hours) * width;
      const y1 = statuses.indexOf(prev.status) * rowHeight + rowHeight / 2;
      const x2 = (entry.hour / hours) * width;
      const y2 = statuses.indexOf(entry.status) * rowHeight + rowHeight / 2;

      ctx.strokeStyle = colors[prev.status];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  }, [logData]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl">
      <h2 className="text-lg font-semibold mb-2">ELD Log Chart</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="w-full border rounded-md"
      />
    </div>
  );
};

export default ELDLogChart;
