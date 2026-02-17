const BASE_URL = "https://www.thesportsdb.com/api/v1/json/123";

/**
 * Safely fetch JSON from TheSportsDB.
 */
async function dbFetch(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`TheSportsDB error ${res.status}: ${txt}`);
  }

  return res.json();
}

/**
 * Normalize a team object for the UI.
 */
function normalizeTeam(t) {
  return {
    id: t.idTeam,
    name: t.strTeam,
    country: t.strCountry || "",
    league: t.strLeague || "",
    badge: t.strTeamBadge || "",
  };
}

/**
 * Normalize a player object for list view.
 * Search results are often incomplete -> keep it minimal here.
 */
function normalizePlayerList(p) {
  return {
    id: p.idPlayer,
    name: p.strPlayer,
    nationality: p.strNationality || "",
    team: p.strTeam || "",
    // Use thumb if available, otherwise cutout (some players have one but not the other)
    thumb: p.strThumb || p.strCutout || "",
  };
}

/**
 * Normalize a player object for detail view (lookup endpoint).
 */
function normalizePlayerDetail(p) {
  return {
    id: p.idPlayer,
    name: p.strPlayer,
    nationality: p.strNationality || "",
    team: p.strTeam || "",
    position: p.strPosition || "",
    birthDate: p.dateBorn || "",
    birthLocation: p.strBirthLocation || "",
    height: p.strHeight || "",
    weight: p.strWeight || "",
    // Better image priority for detail view
    photo: p.strThumb || p.strCutout || p.strRender || "",
    description:
      p.strDescriptionEN ||
      p.strDescriptionES ||
      p.strDescriptionIT ||
      p.strDescriptionFR ||
      "",
  };
}

// --- Public API --------------------------------------------------

/**
 * Search teams by name.
 */
export async function searchTeamsDB(query) {
  const data = await dbFetch(`/searchteams.php?t=${encodeURIComponent(query)}`);
  const teams = data.teams || [];
  return teams.map(normalizeTeam);
}

/**
 * Search players by name (returns limited data).
 */
export async function searchPlayersDB(query) {
  const data = await dbFetch(`/searchplayers.php?p=${encodeURIComponent(query)}`);
  const players = data.player || [];
  return players.map(normalizePlayerList);
}

/**
 * Lookup player by id (returns full detail).
 */
export async function lookupPlayerDB(playerId) {
  const data = await dbFetch(`/lookupplayer.php?id=${encodeURIComponent(playerId)}`);
  const player = data.players?.[0];
  if (!player) throw new Error("Player not found (lookup).");
  return normalizePlayerDetail(player);
}
