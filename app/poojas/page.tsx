import { fetchFromStrapi } from "@/src/lib/api";
import { hasSanityEnv } from "@/src/lib/sanity";
import { fetchPoojasFromSanity } from "@/src/lib/fetchers";

export const revalidate = 60;

function hasStrapi() {
  return typeof process.env.STRAPI_URL === "string" && process.env.STRAPI_URL.length > 0;
}

export default async function PoojasPage() {
  let poojas: any[] = [];
  let error: string | null = null;

  if (hasStrapi()) {
    try {
      const { data } = await fetchFromStrapi("poojas?populate=*");
      poojas = Array.isArray(data) ? data : [];
    } catch (e: any) {
      error = e?.message || "Unable to load poojas from Strapi. Please verify STRAPI_URL.";
    }
  } else if (hasSanityEnv()) {
    try {
      const sanityPoojas = await fetchPoojasFromSanity();
      poojas = sanityPoojas.map((p) => ({
        attributes: {
          Text: p.title ?? "Pooja",
          Number: p.number ?? "",
        },
      }));
    } catch (e: any) {
      error = e?.message || "Unable to load poojas from Sanity. Please verify Sanity config.";
    }
  } else {
    error = "No content source configured. Add Sanity or set STRAPI_URL.";
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Poojas</h1>
      {error && (
        <div className="rounded-md border border-black/[.08] dark:border-white/[.145] p-4 text-sm">
          {error}
        </div>
      )}
      {poojas.length > 0 && (
        <ul className="rounded-lg border border-black/[.08] dark:border-white/[.145] divide-y divide-black/[.08] dark:divide-white/[.145]">
          {poojas.map((pooja: any, idx: number) => (
            <li key={pooja.id ?? idx} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{pooja?.attributes?.Text ?? "Pooja"}</p>
                  <p className="text-sm opacity-80">{pooja?.attributes?.Number}</p>
                </div>
                <a
                  href="/booking"
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors px-3 py-1.5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm"
                >
                  Sponsor / Book
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
