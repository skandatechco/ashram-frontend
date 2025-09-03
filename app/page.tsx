export default function Home() {
  return (
    <div className="font-sans">
      <section className="flex flex-col gap-6 sm:gap-8 items-start">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Skandasramam</h1>
        <p className="text-base sm:text-lg max-w-2xl opacity-90">
          A digital spiritual hub connecting devotees worldwide with timeless traditions. Discover events, sponsor poojas, and book your visit.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/events"
          >
            Explore Events
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/booking"
          >
            Book Now
          </a>
        </div>
      </section>
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a href="/events" className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors">
          <h2 className="font-medium mb-2">Events</h2>
          <p className="text-sm opacity-80">Browse the ashram calendar and upcoming festivals.</p>
        </a>
        <a href="/poojas" className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors">
          <h2 className="font-medium mb-2">Poojas</h2>
          <p className="text-sm opacity-80">Explore daily and special poojas and their significance.</p>
        </a>
        <a href="/booking" className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors">
          <h2 className="font-medium mb-2">Booking</h2>
          <p className="text-sm opacity-80">Reserve your visit or sponsor a pooja.</p>
        </a>
      </section>
    </div>
  );
}
