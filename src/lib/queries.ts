import groq from 'groq';

export const eventFields = `
  _id,
  title,
  start_date,
  end_date,
`;

export const poojaFields = `
  _id,
  title,
  number,
  description,
`;

export const eventsQuery = groq`*[_type == $eventType] | order(start_date asc)[0...200]{ ${eventFields} }`;
export const poojasQuery = groq`*[_type == $poojaType] | order(title asc)[0...200]{ ${poojaFields} }`;
