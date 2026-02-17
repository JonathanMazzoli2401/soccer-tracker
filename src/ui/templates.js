export function homeTemplate() {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <div class="logo">⚽</div>
          <div>Soccer Tracker</div>
        </div>

        <div class="top-actions">
          <button class="icon-btn" type="button" title="Favorites" aria-label="Favorites">★</button>
          <button class="icon-btn" type="button" title="Menu" aria-label="Menu">☰</button>
        </div>
      </div>
    </header>

    <main class="home-shell">
      <section class="search-row">
        <div class="tabs" role="tablist" aria-label="Search type">
          <button class="tab" id="tabTeams" type="button" role="tab" aria-selected="true" data-tab="teams">Teams</button>
          <button class="tab" id="tabPlayers" type="button" role="tab" aria-selected="false" data-tab="players">Players</button>
        </div>

        <form id="searchForm" class="searchbar" autocomplete="off">
          <input id="searchQuery" type="text" placeholder="Search teams or players..." required />
          <button type="submit" aria-label="Search">🔍</button>

          <!-- Hidden select kept for JS compatibility if you want it -->
          <select id="searchType" style="display:none;">
            <option value="teams" selected>Teams</option>
            <option value="players">Players</option>
          </select>
        </form>

        <div id="status" class="status" aria-live="polite"></div>
      </section>

      <section class="panels">
        <section class="panel">
          <div class="panel-header">Search results</div>
          <div class="panel-body">
            <div id="results" class="results"></div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">Recent Matches</div>
          <div class="panel-body">
            <div class="muted small">This area will show match blocks / summaries.</div>
          </div>
        </section>
      </section>
    </main>
  `;
}

export function resultsTemplate(items, type) {
  if (!items?.length) return `<p class="muted">No results.</p>`;

  return `
    <ul class="list" role="list">
      ${items.map((it) => {
        const img = it.badge
          ? `<img class="badge" src="${it.badge}" alt="${it.name} badge">`
          : `<div class="badge" aria-hidden="true"></div>`;

        if (type === "teams") {
          return `
            <li class="list-item">
              ${img}
              <div>
                <div class="item-title" data-team-id="${it.id}">${it.name}</div>
                <div class="item-sub">${it.country || ""}</div>
              </div>
              <div class="chev">›</div>
            </li>
          `;
        }

        return `
          <li class="list-item">
            ${it.thumb ? `<img class="badge" src="${it.thumb}" alt="${it.name} photo">` : `<div class="badge" aria-hidden="true"></div>`}
            <div>
              <div class="item-title" data-player-id="${it.id}">${it.name}</div>
              <div class="item-sub">${it.nationality || ""}${it.team ? ` • ${it.team}` : ""}</div>
            </div>
            <div class="chev">›</div>
          </li>
        `;
      }).join("")}
    </ul>
  `;
}


export function matchBlockTemplate() {
  return `
    <section class="card mt">
      <h3>Matches</h3>
      <p class="muted">
        Match data is shown in Team Details (upcoming matches and recent results).
      </p>
    </section>
  `;
}

export function teamDetailTemplate(team, matchesUpcoming, matchesRecent) {
  return `
    <section class="card">
      <a href="#/" class="muted small">← Back</a>

      <div class="row" style="margin-top:.75rem;">
        ${team.badge ? `<img class="badge" src="${team.badge}" alt="${team.name} badge">` : ""}
        <div>
          <h2 style="margin:0;">${team.name}</h2>
          <div class="muted">${team.country || ""}</div>
        </div>

        <div style="margin-left:auto;">
          <button class="btn-outline"
            data-action="fav"
            data-type="team"
            data-id="${team.id}"
            data-name="${team.name}">
            ☆
          </button>
        </div>
      </div>
    </section>

    <section class="card mt">
      <h3>Upcoming Matches</h3>
      ${matchesTemplate(matchesUpcoming)}
    </section>

    <section class="card mt">
      <h3>Recent Results</h3>
      ${matchesTemplate(matchesRecent, true)}
    </section>
  `;
}

export function playerDetailTemplate(player) {
  return `
    <section class="panel">
      <div class="panel-body">

        <a href="#/" class="back">← Back</a>

        <div class="player-hero">
          <div class="player-photo">
            ${
              player.photo
                ? `<img src="${player.photo}" alt="${player.name} photo">`
                : `<div class="player-photo-placeholder" aria-hidden="true"></div>`
            }
          </div>

          <div class="player-meta">
            <h2 class="player-name">${player.name}</h2>

            <div class="muted">
              ${player.nationality || "—"}
              ${player.team ? ` • ${player.team}` : ""}
            </div>

            <div class="player-facts">
              ${player.position ? `<div><strong>Position:</strong> ${player.position}</div>` : ""}
              ${player.birthDate ? `<div><strong>Born:</strong> ${player.birthDate}</div>` : ""}
              ${player.birthLocation ? `<div><strong>Birthplace:</strong> ${player.birthLocation}</div>` : ""}
              ${player.height ? `<div><strong>Height:</strong> ${player.height}</div>` : ""}
              ${player.weight ? `<div><strong>Weight:</strong> ${player.weight}</div>` : ""}
            </div>

            <button class="btn-fav mt"
              data-action="fav"
              data-type="player"
              data-id="${player.id}"
              data-name="${player.name}">
              ☆
            </button>

            <p class="muted mt">
              ${player.description ? player.description : "No description available."}
            </p>
          </div>
        </div>

      </div>
    </section>
  `;
}


function matchesTemplate(matches, showScore = false) {
  if (!matches?.length) return `<p class="muted">No matches available for this team yet.</p>`;

  return `
    <ul class="list" role="list">
      ${matches
        .map((m) => {
          const date = m.utcDate ? new Date(m.utcDate).toLocaleString() : "";
          const home = m.homeTeam?.name || "Home";
          const away = m.awayTeam?.name || "Away";
          const score = showScore ? formatScore(m) : "";
          return `
            <li class="list-item">
              <div>
                <strong>${home} vs ${away}</strong>
                <div class="muted small">${date} ${score}</div>
              </div>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function formatScore(m) {
  const ft = m.score?.fullTime;
  if (!ft) return "";
  const hs = ft.home ?? "-";
  const as = ft.away ?? "-";
  return `• FT: ${hs}-${as}`;
}
