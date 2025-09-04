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
    throw new Error('Failed to fetch');
  }

  return res.json();
}
