const BASE_URL = "https://www.thesportsdb.com/api/v1/json/123";

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

    // extra info for detail view
    formedYear: t.intFormedYear || "",
    stadium: t.strStadium || "",
    website: t.strWebsite || "",
    description: t.strDescriptionEN || "",

    // used for filtering
    sport: t.strSport || "",
  };
}

function normalizePlayerList(p) {
  return {
    id: p.idPlayer,
    name: p.strPlayer,
    nationality: p.strNationality || "",
    team: p.strTeam || "",
    thumb: p.strThumb || p.strCutout || "",
    sport: p.strSport || "",
  };
}

/**
 * Normalize a player object for detail view.
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
    photo: p.strThumb || p.strCutout || p.strRender || "",
    description:
      p.strDescriptionEN ||
      p.strDescriptionES ||
      p.strDescriptionIT ||
      p.strDescriptionFR ||
      "",
  };
}

/**
 * Remove duplicates by id.
 */
function uniqById(items) {
  const map = new Map();
  for (const it of items) map.set(String(it.id), it);
  return [...map.values()];
}

/**
 * Sort results so the most relevant matches appear first.
 */
function rankByQuery(items, query) {
  const q = (query || "").toLowerCase();
  return items.sort((a, b) => {
    const an = (a.name || "").toLowerCase();
    const bn = (b.name || "").toLowerCase();

    const score = (n) => {
      if (n === q) return 30;         
      if (n.startsWith(q)) return 20; 
      if (n.includes(q)) return 10;   
      return 0;
    };

    return score(bn) - score(an);
  });
}

// --- Public API --------------------------------------------------

/**
 * Search teams by name.
 * TheSportsDB team search can be strict, so we try fallbacks and filter only Soccer.
 */
export async function searchTeamsDB(query) {
  const q = (query || "").trim();
  if (q.length < 2) return [];

  const tries = [q];

  if (q.toLowerCase() === "nacional") {
    tries.unshift("Club Nacional de Football");
    tries.unshift("Club Nacional");
    tries.push("Nacional de Football");
  }

  const parts = q.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    tries.push(parts[0]);
    tries.push(parts[parts.length - 1]);
  } else {
    tries.push(`${q} FC`);
    tries.push(`Club ${q}`);
  }

  const all = [];

  for (const t of tries) {
    const data = await dbFetch(`/searchteams.php?t=${encodeURIComponent(t)}`);
    const teams = (data.teams || [])
      .map(normalizeTeam)
      .filter((x) => (x.sport || "") === "Soccer"); // keep only soccer

    all.push(...teams);

    // Stop early if we already have enough options.
    if (all.length >= 10) break;
  }

  const unique = uniqById(all);

  // Extra filter: keep teams whose name contains the original query.
  const contains = unique.filter((t) =>
    (t.name || "").toLowerCase().includes(q.toLowerCase())
  );

  const finalList = contains.length ? contains : unique;
  return rankByQuery(finalList, q).slice(0, 12);
}

/**
 * Search players by name.
 * Filter only Soccer when possible.
 */
export async function searchPlayersDB(query) {
  const q = (query || "").trim();
  if (q.length < 2) return [];

  const data = await dbFetch(`/searchplayers.php?p=${encodeURIComponent(q)}`);
  const players = (data.player || [])
    .map(normalizePlayerList)
    .filter((p) => !p.sport || p.sport === "Soccer"); // some entries have empty sport

  return rankByQuery(players, q).slice(0, 12);
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