const BASE_URL = "https://www.thesportsdb.com/api/v1/json";
const KEY = import.meta.env.VITE_SPORTSDB_KEY || "123";

/**
 * Generic fetch helper for TheSportsDB
 */
async function dbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${KEY}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TheSportsDB error ${response.status}: ${text}`);
  }

  return response.json();
}

/**
 * Search teams by name
 */
export async function searchTeamsDB(query) {
  const data = await dbFetch("/searchteams.php", { t: query });

  const teams = data.teams || [];

  // Normalize data for UI usage
  return teams.map((team) => ({
    id: team.idTeam,
    name: team.strTeam,
    country: team.strCountry,
    badge: team.strTeamBadge,
  }));
}
