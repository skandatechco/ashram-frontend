import { fetchFromStrapi } from "@/src/lib/api";

function hasEnv() {
  return typeof process.env.STRAPI_URL === "string" && process.env.STRAPI_URL.length > 0;
}

export default async function PoojasPage() {
  let poojas: any[] = [];
  let error: string | null = null;

  if (hasEnv()) {
    try {
      const { data } = await fetchFromStrapi("poojas?populate=*");
      poojas = Array.isArray(data) ? data : [];
    } catch (e) {
      error = "Unable to load poojas. Please verify STRAPI_URL.";
    }
  } else {
    error = "STRAPI_URL is not configured yet.";
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
          {poojas.map((pooja: any) => (
            <li key={pooja.id} className="p-4">
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
