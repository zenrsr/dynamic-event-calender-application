"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Event {
  id: string;
  name: string;
  date: Date;
  description?: string;
  recurrence?: "daily" | "weekly" | "monthly" | "yearly" | "no";
}

interface EventDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  selectedDate?: Date;
  event?: Event;
}

export default function EventDrawer({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  event,
}: EventDrawerProps) {
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [recurrence, setRecurrence] = useState<
    "daily" | "weekly" | "monthly" | "yearly" | "no"
  >("no");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setEventDescription(event.description || "");
      setRecurrence(event.recurrence || "no");
    } else {
      setEventName("");
      setEventDescription("");
      setRecurrence("no");
    }
    setIsModified(false);
  }, [event]);

  useEffect(() => {
    if (
      event &&
      (eventName !== event.name ||
        eventDescription !== event.description ||
        recurrence !== (event.recurrence || ""))
    ) {
      setIsModified(true);
    } else if (!event && (eventName || eventDescription || recurrence)) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [eventName, eventDescription, recurrence, event]);

  const handleSave = () => {
    if (eventName && (selectedDate || event?.date)) {
      const newEvent: Event = {
        id: event?.id || crypto.randomUUID(),
        name: eventName,
        description: eventDescription,
        date: selectedDate || event?.date || new Date(),
        recurrence,
      };
      if (event) {
        onSave({ ...newEvent, id: event.id });
      } else {
        onSave(newEvent);
      }
      setEventName("");
      setEventDescription("");
      setRecurrence("no");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{event ? "Edit Event" : "Create a New Event"}</SheetTitle>
          <SheetDescription>
            {event
              ? "Update the details for your event."
              : "Enter the details for your event."}
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name..."
            className="w-full p-2 border rounded mb-4"
          />
          <Input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Description for the event..."
            className="w-full p-2 border rounded mb-4"
          />
          <Select
            value={recurrence}
            onValueChange={(value) =>
              setRecurrence(
                value as "daily" | "weekly" | "monthly" | "yearly" | "no"
              )
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Does not repeat" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="no">Does not repeat</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SheetFooter className="flex flex-row justify-between w-full">
          <Button onClick={handleSave} className="w-2/3" disabled={!isModified}>
            {event ? "Update" : "Save"}
          </Button>
          <SheetClose className="w-1/2" asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
