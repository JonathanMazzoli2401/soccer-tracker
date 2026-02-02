import { render, setText } from "./ui/render.js";
import { homeTemplate, resultsTemplate, matchBlockTemplate } from "./ui/templates.js";
import { toggleFavorite } from "./data/storage.js";
import { searchTeamsDB } from "./api/sportsDb.js";

// Players mock (API-Football pending approval)
const MOCK_PLAYERS = [
  { id: 1, name: "Luis Suárez", nationality: "Uruguay" },
  { id: 2, name: "Cristiano Ronaldo", nationality: "Portugal" },
  { id: 3, name: "Lionel Messi", nationality: "Argentina" },
  { id: 4, name: "Kylian Mbappé", nationality: "France" },
];

function filterPlayersMock(query) {
  const q = query.toLowerCase();
  return MOCK_PLAYERS.filter((p) => p.name.toLowerCase().includes(q));
}

function mountHome() {
  const app = document.querySelector("#app");
  render(app, homeTemplate());
  app.insertAdjacentHTML("beforeend", matchBlockTemplate());

  const form = document.querySelector("#searchForm");
  const resultsEl = document.querySelector("#results");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = document.querySelector("#searchType").value;
    const query = document.querySelector("#searchQuery").value.trim();

    resultsEl.innerHTML = "";
    setText("#status", "Loading...");

    try {
      let items = [];
      if (type === "teams") {
        items = await searchTeamsDB(query);
      } else {
        items = filterPlayersMock(query);
      }

      resultsEl.innerHTML = resultsTemplate(items, type);
      setText("#status", `Results: ${items.length}`);
    } catch (err) {
      console.error(err);
      setText("#status", "Error loading results.");
      resultsEl.innerHTML = `<p class="error">${err.message}</p>`;
    }
  });

  // Favorites (event delegation)
  app.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action='fav']");
    if (!btn) return;

    const type = btn.dataset.type;
    const id = btn.dataset.id;
    const name = btn.dataset.name;

    toggleFavorite({ type, id, name });
    btn.textContent = btn.textContent === "☆" ? "★" : "☆";
  });
}

mountHome();
