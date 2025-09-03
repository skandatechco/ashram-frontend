'use client';

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookingWidget({ eventType }: { eventType: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#000000",
          },
        },
      });
    })();
  }, []);

  return (
    <div className="w-full h-full overflow-auto">
      <Cal calLink={eventType} />
    </div>
  );
}
