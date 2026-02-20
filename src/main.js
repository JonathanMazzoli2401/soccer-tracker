import { render, setText } from "./ui/render.js";
import {
  homeTemplate,
  resultsTemplate,
  matchBlockTemplate,
  teamDetailTemplate,
  playerDetailTemplate,
} from "./ui/templates.js";

import { toggleFavorite } from "./data/storage.js";
import { searchTeamsDB, searchPlayersDB, lookupPlayerDB } from "./api/sportsDb.js";
import { getTeamMatches } from "./api/footballData.js";
import { getTeamIdByName } from "./data/teamMap.js";

let lastTeamResults = [];   // Cache of last searched teams
let lastPlayerResults = []; // Cache of last searched players

function parseRoute() {
  const hash = window.location.hash || "#/";
  const parts = hash.replace("#/", "").split("/").filter(Boolean);
  return { route: parts[0] || "", id: parts[1] || "" };
}

async function searchTeamsSmart(query) {
  // Try normal search first
  let items = await searchTeamsDB(query);
  if (items.length) return items;

  // If user typed multiple words, try the longest one (e.g., "real madrid" -> "madrid")
  const parts = query.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    const longest = parts.sort((a, b) => b.length - a.length)[0];
    items = await searchTeamsDB(longest);
    if (items.length) return items;
  }

  return [];
}

function mountHome() {
  const app = document.querySelector("#app");
  render(app, homeTemplate());
  app.insertAdjacentHTML("beforeend", matchBlockTemplate());

  // Reset nodes to avoid duplicated listeners when returning to Home
  const formOld = document.querySelector("#searchForm");
  const resultsOld = document.querySelector("#results");

  const form = formOld.cloneNode(true);
  const resultsEl = resultsOld.cloneNode(true);

  formOld.replaceWith(form);
  resultsOld.replaceWith(resultsEl);

  // Tabs UI -> sync with the hidden select used by current JS
  const tabTeams = document.querySelector("#tabTeams");
  const tabPlayers = document.querySelector("#tabPlayers");
  const searchType = document.querySelector("#searchType");

  function setTab(type) {
    searchType.value = type;
    tabTeams.setAttribute("aria-selected", type === "teams" ? "true" : "false");
    tabPlayers.setAttribute("aria-selected", type === "players" ? "true" : "false");
  }

  tabTeams.addEventListener("click", () => setTab("teams"));
  tabPlayers.addEventListener("click", () => setTab("players"));

  // Submit handler (search)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = document.querySelector("#searchType").value;
    const query = document.querySelector("#searchQuery").value.trim();

    const statusEl = document.querySelector("#status");

    resultsEl.innerHTML = "";

    if (!query) {
      statusEl.classList.remove("loading");
      setText("#status", "Please type a search.");
      resultsEl.innerHTML = `<p class="muted">Type something to search.</p>`;
      return;
    }

    statusEl.classList.add("loading");
    setText("#status", "Loading...");

    try {
      let items = [];

      if (type === "teams") {
        items = await searchTeamsSmart(query);
        lastTeamResults = items;
      } else {
        items = await searchPlayersDB(query);
        lastPlayerResults = items;
      }

      resultsEl.innerHTML = resultsTemplate(items, type);
      setText("#status", `Results: ${items.length}`);
    } catch (err) {
      console.error(err);
      setText("#status", "Error loading results.");
      resultsEl.innerHTML = `<p class="error">${err.message}</p>`;
    } finally {
      statusEl.classList.remove("loading");
    }
  });

  // Click on a result to open detail view (teams or players)
  resultsEl.addEventListener("click", (e) => {
    const teamEl = e.target.closest("[data-team-id]");
    if (teamEl) {
      window.location.hash = `#/team/${teamEl.dataset.teamId}`;
      return;
    }

    const playerEl = e.target.closest("[data-player-id]");
    if (playerEl) {
      window.location.hash = `#/player/${playerEl.dataset.playerId}`;
    }
  });
}

async function mountTeamDetail(teamId) {
  const app = document.querySelector("#app");

  const team = lastTeamResults.find((t) => String(t.id) === String(teamId));
  if (!team) {
    render(
      app,
      `<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="muted">Team not found. Search again.</p>
      </section>`
    );
    return;
  }

  render(app, `<section class="card"><p class="muted">Loading team details...</p></section>`);

  try {
    const fdTeamId = getTeamIdByName(team.name);

    let upcoming = [];
    let recent = [];

    if (fdTeamId) {
      upcoming = await getTeamMatches(fdTeamId, { status: "SCHEDULED", limit: 5 });
      recent = await getTeamMatches(fdTeamId, { status: "FINISHED", limit: 5 });
    }

    render(app, teamDetailTemplate(team, upcoming, recent));
  } catch (err) {
    console.error(err);
    render(
      app,
      `<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="error">${err.message}</p>
      </section>`
    );
  }
}

async function mountPlayerDetail(playerId) {
  const app = document.querySelector("#app");

  const cached = lastPlayerResults.find((p) => String(p.id) === String(playerId));

  render(
    app,
    `<section class="panel">
      <div class="panel-body">
        <a href="#/" class="back">← Back</a>
        <p class="muted">Loading player details...</p>
      </div>
    </section>`
  );

  try {
    const full = await lookupPlayerDB(playerId);

    const merged = {
      ...full,
      team: full.team || cached?.team || "",
      nationality: full.nationality || cached?.nationality || "",
      photo: full.photo || cached?.thumb || "",
    };

    render(app, playerDetailTemplate(merged));
  } catch (err) {
    console.error(err);
    render(
      app,
      `<section class="panel">
        <div class="panel-body">
          <a href="#/" class="back">← Back</a>
          <p class="error">${err.message}</p>
        </div>
      </section>`
    );
  }
}

// Favorites (event delegation) - added once globally
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action='fav']");
  if (!btn) return;

  toggleFavorite({
    type: btn.dataset.type,
    id: btn.dataset.id,
    name: btn.dataset.name,
  });

  btn.textContent = btn.textContent === "☆" ? "★" : "☆";
});

function router() {
  const { route, id } = parseRoute();

  if (route === "team" && id) {
    mountTeamDetail(id);
    return;
  }

  if (route === "player" && id) {
    mountPlayerDetail(id);
    return;
  }

  mountHome();
}

window.addEventListener("hashchange", router);
router();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();