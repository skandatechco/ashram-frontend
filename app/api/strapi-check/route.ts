import { NextResponse } from 'next/server';
import { fetchFromStrapi } from '@/src/lib/api';

export async function GET() {
  try {
    const base = process.env.STRAPI_URL;
    const token = Boolean(process.env.STRAPI_API_TOKEN);

    // minimal ping
    const events = await fetchFromStrapi('events?pagination[pageSize]=1');
    const poojas = await fetchFromStrapi('poojas?pagination[pageSize]=1');

    return NextResponse.json({ ok: true, base, token, eventsSample: events?.data?.length ?? null, poojasSample: poojas?.data?.length ?? null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}
