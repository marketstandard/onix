import { getJson } from 'serpapi';

const API_KEY = process.env['GOOGLE_LENSE_API_KEY'];

export const getResults = async ({ imageUrl }: { imageUrl: string }) => {
  const results = await getJson({
    engine: 'google_lens',
    api_key: API_KEY,
    url: imageUrl,
  });

  return results;
};
