"use client";

import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableDemo } from ".";
import EventDrawer from "@/components/modal";

interface Event {
  id: string;
  name: string;
  date: Date;
  description?: string;
  recurrence?: "daily" | "weekly" | "monthly" | "yearly" | "no";
}

export default function EventsPage() {
  const [events, setEvents] = useLocalStorage<Event[]>("calendar-events", []);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const generateRecurringEvents = (event: Event, endDate: Date): Event[] => {
    const events: Event[] = [];
    // eslint-disable-next-line prefer-const
    let currentDate = new Date(event.date);
    const maxDays = event.recurrence === "daily" ? 14 : Infinity; // Limit daily recurrence to 14 days
    let dayCount = 0;

    while (currentDate <= endDate && dayCount < maxDays) {
      events.push({
        ...event,
        id: crypto.randomUUID(),
        date: new Date(currentDate),
      });

      if (event.recurrence === "daily") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (event.recurrence === "weekly") {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (event.recurrence === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (event.recurrence === "yearly") {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      } else {
        break;
      }

      dayCount++;
    }

    return events;
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.date).getTime() >= new Date().getTime()
  );

  const filteredEvents = upcomingEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (event: Event) => {
    setEditEvent(event);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const handleSave = (newEvent: Event) => {
    if (newEvent.recurrence) {
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      const recurringEvents = generateRecurringEvents(newEvent, endDate);
      setEvents((prev) => [...prev, ...recurringEvents]);
    } else {
      setEvents((prev) => [...prev, newEvent]);
    }

    setIsDrawerOpen(false);
    setEditEvent(null);
  };

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "name",
      header: "Event Name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(new Date(row.getValue("date")))}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description")}</span>,
    },
    {
      accessorKey: "recurrence",
      header: "Recurrence",
      cell: ({ row }) => (
        <span>{row.getValue("recurrence") || "No Repeat"}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const event: Event = row.original;

        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(event)}
              className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter events..."
          className="w-fit p-2 border rounded"
        />
      </div>
      {filteredEvents.length > 0 ? (
        <div>
          <DataTableDemo data={filteredEvents} columns={columns} />
          {isDrawerOpen && editEvent && (
            <EventDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onSave={handleSave}
              event={editEvent}
            />
          )}
        </div>
      ) : (
        <div className="text-gray-500">No matching events found.</div>
      )}
    </div>
  );
}
