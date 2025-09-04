import { createClient, type ClientConfig } from '@sanity/client';

export function hasSanityEnv() {
  return (
    typeof process.env.SANITY_PROJECT_ID === 'string' && process.env.SANITY_PROJECT_ID.length > 0 &&
    typeof process.env.SANITY_DATASET === 'string' && process.env.SANITY_DATASET.length > 0
  );
}

export function getSanityClient() {
  if (!hasSanityEnv()) {
    throw new Error('Sanity is not configured');
  }

  const projectId = process.env.SANITY_PROJECT_ID!;
  const dataset = process.env.SANITY_DATASET!;
  const apiVersion = process.env.SANITY_API_VERSION || '2023-10-01';
  const token = process.env.SANITY_READ_TOKEN;

  const useCdn = !token && process.env.NODE_ENV === 'production';

  const config: ClientConfig = {
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
    perspective: 'published',
  };

  return createClient(config);
}

export type SanityEvent = {
  _id: string;
  title?: string;
  start_date?: string;
  end_date?: string;
};

export type SanityPooja = {
  _id: string;
  title?: string;
  number?: string | number;
  description?: string;
};
