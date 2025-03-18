"use client";

import { useState } from "react";
import { useRouteStore } from "@/store/useRouteStore";

export default function TripForm() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [stops, setStops] = useState<Array<{ location: string; name: string; estimatedCost: number; stopDuration: number }>>([]);
    const [errors, setErrors] = useState<{ start?: string; end?: string; stops?: string }>({});

    const { setCoordinates, setMandatoryStops } = useRouteStore();

    const validateForm = () => {
        const newErrors: { start?: string; end?: string; stops?: string } = {};
        if (!start.trim()) newErrors.start = "Start location is required.";
        if (!end.trim()) newErrors.end = "End location is required.";
        if (stops.some((stop) => !stop.location.trim() || !stop.name.trim())) {
            newErrors.stops = "All mandatory stops must have a location and name.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Example coordinates (replace with actual geocoding logic if needed)
        const startCoords: [number, number] = [38.7749, -122.4194]; // San Francisco
        const endCoords: [number, number] = [38.5816, -121.4944]; // Sacramento

        const mandatoryStops = stops.map((stop) => ({
            location: [37.8044, -122.2712] as [number, number], // Example coordinates (Oakland)
            name: stop.name,
            estimatedCost: stop.estimatedCost,
            stopDuration: stop.stopDuration,
        }));

        // Update the Zustand store
        setCoordinates([startCoords, endCoords]);
        setMandatoryStops(mandatoryStops);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-blue-50 rounded-lg -z-0">
            <div>
                <label className="block text-sm font-medium text-blue-700">Start Location</label>
                <input
                    type="text"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="mt-1 block w-full p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter start location"
                />
                {errors.start && <p className="text-red-500 text-sm">{errors.start}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-blue-700">End Location</label>
                <input
                    type="text"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="mt-1 block w-full p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter end location"
                />
                {errors.end && <p className="text-red-500 text-sm">{errors.end}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-blue-700">Mandatory Stops</label>
                {stops.map((stop, index) => (
                    <div key={index} className="mt-4 space-y-4 p-4 bg-blue-100 rounded-md">
                        <div>
                            <label className="block text-sm text-blue-600">Location</label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                value={stop.location}
                                onChange={(e) =>
                                    setStops(stops.map((s, i) => (i === index ? { ...s, location: e.target.value } : s)))
                                }
                                className="mt-1 block w-full p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-blue-600">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={stop.name}
                                onChange={(e) =>
                                    setStops(stops.map((s, i) => (i === index ? { ...s, name: e.target.value } : s)))
                                }
                                className="mt-1 block w-full p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-blue-600">Estimated Cost ($)</label>
                            <input
                                type="number"
                                placeholder="Enter estimated cost"
                                value={stop.estimatedCost.toString()}
                                onChange={(e) =>
                                    setStops(stops.map((s, i) => (i === index ? { ...s, estimatedCost: parseFloat(e.target.value) || 0 } : s)))
                                }
                                className="mt-1 block w-full p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-blue-600">Stop Duration (mins)</label>
                            <input
                                type="number"
                                placeholder="Enter stop duration"
                                value={stop.stopDuration.toString()}
                                onChange={(e) =>
                                    setStops(stops.map((s, i) => (i === index ? { ...s, stopDuration: parseFloat(e.target.value) || 0 } : s)))
                                }
                                className="mt-1 block w-full p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                ))}
                {errors.stops && <p className="text-red-500 text-sm">{errors.stops}</p>}
                <button
                    type="button"
                    onClick={() => setStops([...stops, { location: "", name: "", estimatedCost: 0, stopDuration: 0 }])}
                    className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add Stop
                </button>
            </div>
            <button
                type="submit"
                className="w-full p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
            >
                Find Route
            </button>
        </form>
    );
}