const API_KEY = "f74233c6-4e65-438a-a4c7-740c1423eba9";
const BASE_URL = "https://api.cricketdata.org/v1";

export const matchService = {
  getUpcomingMatches: async () => {
    try {
      const response = await fetch(`${BASE_URL}/matches`, {
        headers: {
          apikey: API_KEY,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.log("API ERROR 👉", error);
      throw error;
    }
  },
};
