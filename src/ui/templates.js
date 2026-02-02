export function homeTemplate() {
  return `
    <section class="card">
      <h2>Soccer Tracker</h2>
      <p class="muted">Search teams or players (mock data for now).</p>

      <form id="searchForm" class="form">
        <label>
          Type
          <select id="searchType">
            <option value="teams">Teams</option>
            <option value="players">Players</option>
          </select>
        </label>

        <label>
          Query
          <input id="searchQuery" type="text" placeholder="e.g., Barcelona, Suarez..." required />
        </label>

        <button type="submit">Search</button>
      </form>

      <div id="status" class="status muted" aria-live="polite"></div>
      <div id="results" class="results"></div>
    </section>
  `;
}

export function resultsTemplate(items, type) {
  if (!items?.length) return `<p class="muted">No results.</p>`;

  return `
    <ul class="list" role="list">
      ${items.map((it) => {
        if (type === "teams") {
          return `<li class="list-item">
            <div>
              <strong>${it.name}</strong>
              <div class="muted small">${it.country || ""}</div>
            </div>
            <button class="btn-outline" data-action="fav" data-type="team" data-id="${it.id}">
              ☆
            </button>
          </li>`;
        }

        return `<li class="list-item">
          <div>
            <strong>${it.name}</strong>
            <div class="muted small">${it.nationality || ""}</div>
          </div>
          <button class="btn-outline" data-action="fav" data-type="player" data-id="${it.id}">
            ☆
          </button>
        </li>`;
      }).join("")}
    </ul>
  `;
}

