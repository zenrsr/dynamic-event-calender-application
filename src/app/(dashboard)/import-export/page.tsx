/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";

interface Event {
  id: string;
  name: string;
  date: string; // Store as ISO string
  description?: string;
  recurrence?: "daily" | "weekly" | "monthly" | "yearly" | "no";
}

export default function ExportImportPage() {
  const [events, setEvents] = useLocalStorage<Event[]>("calendar-events", []);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const filterEvents = (months: number | "all") => {
    if (months === "all") return events;

    const now = new Date();
    const futureDate = new Date();
    futureDate.setMonth(now.getMonth() + months);

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= now && eventDate <= futureDate;
    });
  };

  const exportFilteredEvents = (
    months: number | "all",
    format: "json" | "csv"
  ) => {
    const filteredEvents = filterEvents(months);

    if (format === "json") {
      const dataStr = JSON.stringify(filteredEvents, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `events_${months}-months.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      const headers = "id,name,date,description,recurrence\n";
      const rows = filteredEvents
        .map(
          (event) =>
            `${event.id},${event.name},${event.date},${event.description || ""},${
              event.recurrence || "no"
            }`
        )
        .join("\n");

      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `events_${months}-months.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (!["application/json", "text/csv"].includes(file.type)) {
      setImportMessage("Unsupported file format. Please use JSON or CSV.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.type === "application/json") {
          const importedEvents = JSON.parse(e.target?.result as string);
          validateAndMergeEvents(importedEvents);
        } else if (file.type === "text/csv") {
          const csvData = e.target?.result as string;
          const importedEvents = csvToEvents(csvData);
          validateAndMergeEvents(importedEvents);
        }
      } catch (error) {
        setImportMessage("Error processing the file.");
        console.error("Error processing the file", error);
      }
    };
    reader.readAsText(file);
  };

  const csvToEvents = (csv: string): Event[] => {
    const lines = csv.split("\n").filter(Boolean);
    const [header, ...rows] = lines;
    if (!header.includes("id,name,date")) {
      throw new Error("Invalid CSV format.");
    }

    return rows
      .map((row) => {
        const [id, name, date, description, recurrence] = row.split(",");
        if (!id || !name || !date) {
          return null; // Skip rows with missing required fields
        }
        return {
          id,
          name,
          date,
          description: description || undefined,
          recurrence: recurrence || "no",
        };
      })
      .filter((event): event is Event => event !== null); // Remove null values
  };

  const validateAndMergeEvents = (importedEvents: any[]) => {
    if (Array.isArray(importedEvents)) {
      const validatedEvents = importedEvents.filter(
        (ev) =>
          typeof ev.id === "string" &&
          typeof ev.name === "string" &&
          typeof ev.date === "string" &&
          (!ev.description || typeof ev.description === "string") &&
          (!ev.recurrence ||
            ["daily", "weekly", "monthly", "yearly", "no"].includes(
              ev.recurrence
            ))
      );

      const eventMap = new Map<string, Event>();
      [...events, ...validatedEvents].forEach((event) => {
        eventMap.set(event.id, event);
      });

      setEvents(Array.from(eventMap.values()));
      setImportMessage("Events imported successfully!");
    } else {
      setImportMessage("Invalid file structure.");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Export/Import Events</h1>
      <div className="space-y-4">
        {/* Export Buttons */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Export Options</h2>
          <div className="flex space-x-4">
            <Button onClick={() => exportFilteredEvents(3, "json")}>
              Export Next 3 Months (JSON)
            </Button>
            <Button onClick={() => exportFilteredEvents(3, "csv")}>
              Export Next 3 Months (CSV)
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => exportFilteredEvents(6, "json")}>
              Export Next 6 Months (JSON)
            </Button>
            <Button onClick={() => exportFilteredEvents(6, "csv")}>
              Export Next 6 Months (CSV)
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => exportFilteredEvents("all", "json")}>
              Export All Events (JSON)
            </Button>
            <Button onClick={() => exportFilteredEvents("all", "csv")}>
              Export All Events (CSV)
            </Button>
          </div>
        </div>

        {/* Import Input */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Import Events (JSON or CSV):
          </label>
          <FileUpload onChange={handleFileUpload} />
        </div>

        {/* Import Feedback */}
        {importMessage && (
          <p className="text-green-500 mt-4">{importMessage}</p>
        )}
      </div>
    </div>
  );
}
