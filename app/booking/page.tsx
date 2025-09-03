import BookingWidget from "@/src/components/BookingWidget";

function getCalLink() {
  return process.env.NEXT_PUBLIC_CAL_LINK || "";
}

export default function BookingPage() {
  const calLink = getCalLink();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Booking</h1>
      {!calLink ? (
        <div className="rounded-md border border-black/[.08] dark:border-white/[.145] p-4 text-sm">
          Configure NEXT_PUBLIC_CAL_LINK to enable the booking widget.
        </div>
      ) : (
        <div className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-2 sm:p-4 min-h-[60vh]" id="booking">
          <div className="booking-embed w-full h-[70vh] overflow-auto">
            <BookingWidget eventType={calLink} />
          </div>
        </div>
      )}
    </div>
  );
}
