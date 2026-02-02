import { render, setText } from "./ui/render.js";
import { homeTemplate, resultsTemplate } from "./ui/templates.js";
import { toggleFavorite } from "./data/storage.js";

// Mock data (W05). Later we will replace this with real API calls.
const MOCK_TEAMS = [
  { id: 33, name: "Barcelona", country: "Spain" },
  { id: 34, name: "Real Madrid", country: "Spain" },
  { id: 50, name: "Manchester City", country: "England" },
  { id: 231, name: "Nacional", country: "Uruguay" },
  { id: 232, name: "Peñarol", country: "Uruguay" },
];

const MOCK_PLAYERS = [
  { id: 1, name: "Luis Suárez", nationality: "Uruguay" },
  { id: 2, name: "Lionel Messi", nationality: "Argentina" },
  { id: 3, name: "Kylian Mbappé", nationality: "France" },
  { id: 4, name: "Cristiano Ronaldo", nationality: "Portugal" },
];

function filterMock(type, query) {
  const q = query.toLowerCase();
  const source = type === "teams" ? MOCK_TEAMS : MOCK_PLAYERS;
  return source.filter((x) => x.name.toLowerCase().includes(q));
}

function mountHome() {
  const app = document.querySelector("#app");
  render(app, homeTemplate());

  const form = document.querySelector("#searchForm");
  const resultsEl = document.querySelector("#results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.querySelector("#searchType").value;
    const query = document.querySelector("#searchQuery").value.trim();

    setText("#status", "Searching...");
    const items = filterMock(type, query);

    resultsEl.innerHTML = resultsTemplate(items, type);
    setText("#status", `Results: ${items.length}`);
  });

  // Favorite button (event delegation)
  app.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action='fav']");
    if (!btn) return;

    const type = btn.dataset.type;
    const id = btn.dataset.id;

    const item =
      type === "team"
        ? MOCK_TEAMS.find((t) => String(t.id) === String(id))
        : MOCK_PLAYERS.find((p) => String(p.id) === String(id));

    if (!item) return;

    toggleFavorite({ type, id: item.id, name: item.name });
    btn.textContent = btn.textContent === "☆" ? "★" : "☆";
  });
}

mountHome();
