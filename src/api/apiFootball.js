const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

const headers = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
};

async function apiFetch(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`API-Football error: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

export async function searchTeams(query) {
  return apiFetch("/teams", { search: query });
}

export async function searchPlayers(query, season = new Date().getFullYear()) {
  return apiFetch("/players", { search: query, season });
}
