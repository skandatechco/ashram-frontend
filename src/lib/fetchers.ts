import { getSanityClient, type SanityEvent, type SanityPooja } from './sanity';
import { eventsQuery, poojasQuery } from './queries';

export const REVALIDATE_SECONDS = 60;

export async function fetchEventsFromSanity(params?: { eventType?: string }) {
  const client = getSanityClient();
  const eventType = params?.eventType || process.env.SANITY_EVENT_TYPE || 'event';
  const data = await client.fetch<SanityEvent[]>(eventsQuery, { eventType });
  return data;
}

export async function fetchPoojasFromSanity(params?: { poojaType?: string }) {
  const client = getSanityClient();
  const poojaType = params?.poojaType || process.env.SANITY_POOJA_TYPE || 'pooja';
  const data = await client.fetch<SanityPooja[]>(poojasQuery, { poojaType });
  return data;
}
