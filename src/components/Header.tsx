import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-black/[.08] dark:border-white/[.145] bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg sm:text-xl hover:opacity-90">
          Skandasramam
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link href="/" className="hover:underline hover:underline-offset-4">Home</Link>
          <Link href="/events" className="hover:underline hover:underline-offset-4">Events</Link>
          <Link href="/poojas" className="hover:underline hover:underline-offset-4">Poojas</Link>
          <Link href="/booking" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]">Booking</Link>
        </nav>
      </div>
    </header>
  );
}
