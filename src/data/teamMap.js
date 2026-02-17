// football-data.org team IDs 
export const TEAM_ID_MAP = {
  "arsenal": 57,
  "chelsea": 61,
  "liverpool": 64,
  "manchester city": 65,
  "manchester united": 66,
  "tottenham": 73,
  "barcelona": 81,
  "real madrid": 86,
};

export function getTeamIdByName(name) {
  return TEAM_ID_MAP[name.trim().toLowerCase()] || null;
}
