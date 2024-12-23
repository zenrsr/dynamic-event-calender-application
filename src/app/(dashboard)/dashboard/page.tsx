"use client";
import EventDrawer from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

interface Event {
  id: string;
  name: string;
  date: Date;
  description?: string;
  tag: string;
  recurrence?: "daily" | "weekly" | "monthly" | "yearly" | "no";
}
const DashboardContent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useLocalStorage<Event[]>("calendar-events", []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const lastNotificationTimes = JSON.parse(
      localStorage.getItem("last-notifications") || "{}"
    );

    const now = new Date();
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      if (now.toDateString() === eventDate.toDateString()) {
        const eventKey = `${event.id}-${event.date}`;
        const lastNotificationTime = lastNotificationTimes[eventKey];

        if (
          !lastNotificationTime ||
          now.getTime() - new Date(lastNotificationTime).getTime() >
            60 * 60 * 1000
        ) {
          new Notification(`Reminder: ${event.name}`, {
            body: `Your event "${event.name}" is happening today!`,
          });

          lastNotificationTimes[eventKey] = now.toISOString();
          localStorage.setItem(
            "last-notifications",
            JSON.stringify(lastNotificationTimes)
          );
        }
      }
    });
  }, [events]);

  const handleSaveEvent = (newEvent: Event) => {
    setEvents((prev) => {
      const updatedEvents = [...prev, newEvent].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return updatedEvents;
    });
  };

  const eventsForSelectedDate = events.filter((event) => {
    const eventDate = new Date(event.date);
    const selectedDate = date ? new Date(date) : new Date();

    switch (event.recurrence) {
      case "yearly":
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth()
        );
      case "monthly":
        return eventDate.getDate() === selectedDate.getDate();
      case "weekly":
        return (
          Math.abs(eventDate.getTime() - selectedDate.getTime()) %
            (7 * 24 * 60 * 60 * 1000) ===
            0 && eventDate.getTime() <= selectedDate.getTime()
        );
      default:
        return eventDate.toDateString() === selectedDate.toDateString();
    }
  });

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const selectedDate = date ? new Date(date) : new Date();

    switch (event.recurrence) {
      case "yearly":
        const nextYearly = new Date(selectedDate);
        nextYearly.setFullYear(selectedDate.getFullYear());
        nextYearly.setMonth(eventDate.getMonth());
        nextYearly.setDate(eventDate.getDate());
        return nextYearly.getTime() > selectedDate.getTime();
      case "monthly":
        const nextMonthly = new Date(selectedDate);
        nextMonthly.setDate(eventDate.getDate());
        return nextMonthly.getTime() > selectedDate.getTime();
      case "weekly":
        return (
          Math.abs(eventDate.getTime() - selectedDate.getTime()) %
            (7 * 24 * 60 * 60 * 1000) ===
            0 && eventDate.getTime() > selectedDate.getTime()
        );
      default:
        return eventDate.getTime() > selectedDate.getTime();
    }
  });

  const markedDates = useMemo(() => {
    return events.flatMap((event) => {
      const eventDate = new Date(event.date);
      switch (event.recurrence) {
        case "yearly":
          return [2024, 2025, 2026].map((year) =>
            new Date(
              year,
              eventDate.getMonth(),
              eventDate.getDate()
            ).toDateString()
          );
        case "monthly":
          return Array.from({ length: 31 }, (_, i) =>
            new Date(new Date().setDate(i + 1)).toDateString()
          ).filter((day) => new Date(day).getDate() === eventDate.getDate());
        case "weekly":
          return Array.from({ length: 8 }, (_, i) =>
            new Date(
              eventDate.getTime() + i * 7 * 24 * 60 * 60 * 1000
            ).toDateString()
          );
        default:
          return eventDate.toDateString();
      }
    });
  }, [events]);

  return (
    <div className="h-screen flex flex-col bg-white/50">
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-4 text-muted-foreground">
          Use the navigation to access your calendar and manage events.
        </p>
        <div className="mt-8 flex items-start h-fit gap-8 p-8 rounded-lg">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
            }}
            modifiers={{
              hasEvent: (date) => markedDates.includes(date.toDateString()),
            }}
            className="rounded-md border shadow"
            renderDay={(day) => (
              <div className="relative">
                {markedDates.includes(day.toDateString()) && (
                  <span className="absolute w-2 h-2 bg-purple-600 rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2" />
                )}
                <span>{day.getDate()}</span>
              </div>
            )}
          />
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">
              Event(s) on:{" "}
              {date?.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
            <div className="mt-4 space-y-2">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event) => (
                  <Card
                    key={event.id}
                    className="p-4 rounded shadow-sm hover:opacity-55"
                  >
                    <p className="font-medium">{event.name}</p>
                    {event.description && (
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                  </Card>
                ))
              ) : (
                <p className="">No events for this day.</p>
              )}
              <Button onClick={() => setIsDrawerOpen(true)}>
                <PlusCircleIcon className="mr-2" />
                Create Event
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <ul className="mt-4 space-y-2">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <li key={event.id} className="p-4 rounded border shadow-sm">
                      <p className="font-medium">{event.name}</p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "long",
                          day: "numeric",
                        }).format(new Date(event.date))}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground">No upcoming events.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <EventDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={date}
        existingEvents={events}
      />
    </div>
  );
};

export default DashboardContent;
