export function getStrapiEndpoint(kind: 'events' | 'poojas') {
  if (kind === 'events') return process.env.STRAPI_EVENTS_ENDPOINT || 'events';
  return process.env.STRAPI_POOJAS_ENDPOINT || 'poojas';
}

export async function fetchFromStrapi(endpoint: string) {
  const base = process.env.STRAPI_URL?.replace(/\/$/, '');
  if (!base) throw new Error('STRAPI_URL not set');
  const url = `${base}/api/${endpoint}`;
  const token = process.env.STRAPI_API_TOKEN;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    let detail = '';
    try {
      const text = await res.text();
      detail = text?.slice(0, 300) || '';
    } catch {}
    throw new Error(`Strapi request failed (${res.status} ${res.statusText}) ${detail}`.trim());
  }

  return res.json();
}
