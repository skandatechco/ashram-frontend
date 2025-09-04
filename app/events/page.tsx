import EventCalendar from "@/src/components/EventCalendar";
import { fetchFromStrapi } from "@/src/lib/api";
import { hasSanityEnv } from "@/src/lib/sanity";
import { fetchEventsFromSanity } from "@/src/lib/fetchers";

export const revalidate = 60;

function hasStrapi() {
  return typeof process.env.STRAPI_URL === "string" && process.env.STRAPI_URL.length > 0;
}

export default async function EventsPage() {
  let events: any[] = [];
  let error: string | null = null;

  if (hasStrapi()) {
    try {
      const { data } = await fetchFromStrapi("events?populate=*");
      events = Array.isArray(data) ? data : [];
    } catch (e) {
      error = "Unable to load events from Strapi. Please verify STRAPI_URL.";
    }
  } else if (hasSanityEnv()) {
    try {
      const sanityEvents = await fetchEventsFromSanity();
      events = sanityEvents.map((e) => ({
        attributes: {
          title: e.title ?? "Untitled Event",
          start_date: e.start_date ?? "",
          end_date: e.end_date ?? "",
        },
      }));
    } catch (e) {
      error = "Unable to load events from Sanity. Please verify Sanity config.";
    }
  } else {
    error = "No content source configured. Add Sanity or set STRAPI_URL.";
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Events</h1>
      {error && (
        <div className="rounded-md border border-black/[.08] dark:border-white/[.145] p-4 text-sm">
          {error}
        </div>
      )}
      {events.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          <section className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4">
            <h2 className="mb-3 font-medium">Calendar</h2>
            <EventCalendar events={events} />
          </section>
          <section className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4">
            <h2 className="mb-3 font-medium">Upcoming Events</h2>
            <ul className="divide-y divide-black/[.08] dark:divide-white/[.145]">
              {events.map((ev: any, idx: number) => (
                <li key={ev.id ?? idx} className="py-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-medium">{ev?.attributes?.title ?? "Untitled Event"}</p>
                      <p className="text-sm opacity-80">
                        {ev?.attributes?.start_date} → {ev?.attributes?.end_date}
                      </p>
                    </div>
                    <a
                      href="/booking#booking"
                      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors px-3 py-1.5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm"
                    >
                      Book
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
