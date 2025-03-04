import { error } from '@functions';

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

export default async (req, res) => {
  // You can add authentication or other checks here if needed
  if (!HEYGEN_API_KEY) {
    throw error(500, 'API key is missing from .env');
  }

  try {
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'x-api-key': HEYGEN_API_KEY,
      },
    });

    if (!response.ok) {
      throw error(response.status, 'Error from Heygen API');
    }

    const data = await response.json();

    // Return the token as JSON
    return res.status(200).json({ token: data.data.token });
  } catch (err) {
    console.error('Error retrieving access token:', err);
    throw error(500, 'Failed to retrieve access token');
  }
};
