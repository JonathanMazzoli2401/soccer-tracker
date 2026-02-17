// Local dev uses Vite proxy
const DEV_BASE = "/fd/v4";

// Production uses Cloudflare Worker
const WORKER_BASE = import.meta.env.VITE_FD_WORKER_BASE; // e.g. https://ancient-paper-fac2.jonathanmazzoli25.workers.dev

function getBase() {
  if (import.meta.env.DEV) return DEV_BASE;

  if (!WORKER_BASE) {
    throw new Error("Missing VITE_FD_WORKER_BASE in production.");
  }

  // Always normalize to: https://...workers.dev/v4
  return WORKER_BASE.replace(/\/$/, "") + "/v4";
}

function buildUrl(endpoint, params = {}) {
  const base = getBase();

  // base is absolute in production, relative in dev
  const url = base.startsWith("http")
    ? new URL(base + endpoint)
    : new URL(base + endpoint, window.location.origin);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  return url.toString();
}

async function fdFetch(endpoint, params = {}) {
  const url = buildUrl(endpoint, params);

  const options = import.meta.env.DEV
    ? {
        headers: { "X-Auth-Token": import.meta.env.VITE_FD_TOKEN },
      }
    : {}; // production: Worker injects token

  if (import.meta.env.DEV && !import.meta.env.VITE_FD_TOKEN) {
    throw new Error("Missing VITE_FD_TOKEN in .env (local dev).");
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`football-data error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function getTeamMatches(teamId, { status = "SCHEDULED", limit = 10 } = {}) {
  const data = await fdFetch(`/teams/${teamId}/matches`, { status, limit });
  return data.matches || [];
}
