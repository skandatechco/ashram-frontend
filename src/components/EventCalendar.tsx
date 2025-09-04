'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface EventAttributes {
  title: string;
  start_date: string;
  end_date: string;
}

interface Props {
  events: { attributes: EventAttributes }[];
}

export default function EventCalendar({ events }: Props) {
  const calendarEvents = events.map((event) => ({
    title: event.attributes.title,
    start: event.attributes.start_date,
    end: event.attributes.end_date,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
    />
  );
}
