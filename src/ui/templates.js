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
      ${items
        .map((it) => {
          const name = it.name || "Unknown";
          const hasBadge = Boolean(it.badge);
          const img = hasBadge
            ? `<img class="badge" src="${it.badge}" alt="${name} badge" loading="lazy">`
            : `<div class="badge badge--placeholder" aria-hidden="true">⚽</div>`;

          if (type === "teams") {
            const country = it.country?.trim() ? it.country : "Country: N/A";
            const league = it.league?.trim() ? it.league : "";
            const sub = league ? `${country} • ${league}` : country;

            return `
              <li class="list-item">
                ${img}
                <div>
                  <button class="item-title link" type="button" data-team-id="${it.id}">
                    ${name}
                  </button>
                  <div class="item-sub">${sub}</div>
                </div>
                <div class="chev" aria-hidden="true">›</div>
              </li>
            `;
          }

          const nationality = it.nationality?.trim() ? it.nationality : "Nationality: N/A";
          const team = it.team?.trim() ? it.team : "";
          const sub = team ? `${nationality} • ${team}` : nationality;

          return `
            <li class="list-item">
              ${
                it.thumb
                  ? `<img class="badge" src="${it.thumb}" alt="${name} photo" loading="lazy">`
                  : `<div class="badge badge--placeholder" aria-hidden="true">👤</div>`
              }
              <div>
                <button class="item-title link" type="button" data-player-id="${it.id}">
                  ${name}
                </button>
                <div class="item-sub">${sub}</div>
              </div>
              <div class="chev" aria-hidden="true">›</div>
            </li>
          `;
        })
        .join("")}
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
  const country = team.country?.trim() ? team.country : "N/A";
  const league = team.league?.trim() ? team.league : "N/A";

  const badge = team.badge
    ? `<img class="team-badge" src="${team.badge}" alt="${team.name} badge" loading="lazy">`
    : `<div class="team-badge team-badge--placeholder" aria-hidden="true">⚽</div>`;

  return `
    <section class="panel">
      <div class="panel-body">

        <a href="#/" class="back">← Back</a>

        <div class="team-head">
          ${badge}

          <div class="team-meta">
            <h2 class="team-name">${team.name}</h2>
            <div class="muted small">${country}</div>
          </div>

          <div class="team-actions">
            <button class="btn-fav"
              data-action="fav"
              data-type="team"
              data-id="${team.id}"
              data-name="${team.name}"
              aria-label="Favorite team">
              ☆
            </button>
          </div>
        </div>

        <div class="info-grid mt" role="list">
          <div class="info-item" role="listitem">
            <div class="muted small">Country</div>
            <div>${country}</div>
          </div>
          <div class="info-item" role="listitem">
            <div class="muted small">League</div>
            <div>${league}</div>
          </div>
        </div>

      </div>
    </section>

    <section class="panel mt">
      <div class="panel-header">Upcoming Matches</div>
      <div class="panel-body">
        ${matchesTemplate(matchesUpcoming, false)}
      </div>
    </section>

    <section class="panel mt">
      <div class="panel-header">Recent Matches</div>
      <div class="panel-body">
        ${matchesTemplate(matchesRecent, true)}
      </div>
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
                ? `<img src="${player.photo}" alt="${player.name} photo" loading="lazy">`
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
              data-name="${player.name}"
              aria-label="Favorite player">
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
    <ul class="match-list" role="list">
      ${matches
        .map((m) => {
          const date = m.utcDate ? new Date(m.utcDate).toLocaleString() : "Date: N/A";
          const home = m.homeTeam?.name || "Home";
          const away = m.awayTeam?.name || "Away";
          const score = showScore ? formatScore(m) : "";

          return `
            <li class="match-item">
              <div class="match-main">
                <span class="match-team">${home}</span>
                <span class="match-vs">vs</span>
                <span class="match-team">${away}</span>
              </div>

              <div class="match-meta">
                <span class="match-date">${date}</span>
                ${showScore && score ? `<span class="match-score">${score}</span>` : ""}
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
  return `FT ${hs}-${as}`;
}