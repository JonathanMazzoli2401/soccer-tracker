(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function l(t,a){t.innerHTML=a}function h(t,a){const e=document.querySelector(t);e&&(e.textContent=a)}function S(){return`
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
  `}function L(t,a){return t!=null&&t.length?`
    <ul class="list" role="list">
      ${t.map(e=>{const n=e.badge?`<img class="badge" src="${e.badge}" alt="${e.name} badge">`:'<div class="badge" aria-hidden="true"></div>';return a==="teams"?`
            <li class="list-item">
              ${n}
              <div>
                <div class="item-title" data-team-id="${e.id}">${e.name}</div>
                <div class="item-sub">${e.country||""}</div>
              </div>
              <div class="chev">›</div>
            </li>
          `:`
          <li class="list-item">
            ${e.thumb?`<img class="badge" src="${e.thumb}" alt="${e.name} photo">`:'<div class="badge" aria-hidden="true"></div>'}
            <div>
              <div class="item-title" data-player-id="${e.id}">${e.name}</div>
              <div class="item-sub">${e.nationality||""}${e.team?` • ${e.team}`:""}</div>
            </div>
            <div class="chev">›</div>
          </li>
        `}).join("")}
    </ul>
  `:'<p class="muted">No results.</p>'}function E(t,a,e){return`
    <section class="card">
      <a href="#/" class="muted small">← Back</a>

      <div class="row" style="margin-top:.75rem;">
        ${t.badge?`<img class="badge" src="${t.badge}" alt="${t.name} badge">`:""}
        <div>
          <h2 style="margin:0;">${t.name}</h2>
          <div class="muted">${t.country||""}</div>
        </div>

        <div style="margin-left:auto;">
          <button class="btn-outline"
            data-action="fav"
            data-type="team"
            data-id="${t.id}"
            data-name="${t.name}">
            ☆
          </button>
        </div>
      </div>
    </section>

    <section class="card mt">
      <h3>Upcoming Matches</h3>
      ${y(a)}
    </section>

    <section class="card mt">
      <h3>Recent Results</h3>
      ${y(e,!0)}
    </section>
  `}function D(t){return`
    <section class="panel">
      <div class="panel-body">

        <a href="#/" class="back">← Back</a>

        <div class="player-hero">
          <div class="player-photo">
            ${t.photo?`<img src="${t.photo}" alt="${t.name} photo">`:'<div class="player-photo-placeholder" aria-hidden="true"></div>'}
          </div>

          <div class="player-meta">
            <h2 class="player-name">${t.name}</h2>

            <div class="muted">
              ${t.nationality||"—"}
              ${t.team?` • ${t.team}`:""}
            </div>

            <div class="player-facts">
              ${t.position?`<div><strong>Position:</strong> ${t.position}</div>`:""}
              ${t.birthDate?`<div><strong>Born:</strong> ${t.birthDate}</div>`:""}
              ${t.birthLocation?`<div><strong>Birthplace:</strong> ${t.birthLocation}</div>`:""}
              ${t.height?`<div><strong>Height:</strong> ${t.height}</div>`:""}
              ${t.weight?`<div><strong>Weight:</strong> ${t.weight}</div>`:""}
            </div>

            <button class="btn-fav mt"
              data-action="fav"
              data-type="player"
              data-id="${t.id}"
              data-name="${t.name}">
              ☆
            </button>

            <p class="muted mt">
              ${t.description?t.description:"No description available."}
            </p>
          </div>
        </div>

      </div>
    </section>
  `}function y(t,a=!1){return t!=null&&t.length?`
    <ul class="list" role="list">
      ${t.map(e=>{var p,u;const n=e.utcDate?new Date(e.utcDate).toLocaleString():"",s=((p=e.homeTeam)==null?void 0:p.name)||"Home",r=((u=e.awayTeam)==null?void 0:u.name)||"Away",i=a?P(e):"";return`
            <li class="list-item">
              <div>
                <strong>${s} vs ${r}</strong>
                <div class="muted small">${n} ${i}</div>
              </div>
            </li>
          `}).join("")}
    </ul>
  `:'<p class="muted">No matches available for this team yet.</p>'}function P(t){var s;const a=(s=t.score)==null?void 0:s.fullTime;if(!a)return"";const e=a.home??"-",n=a.away??"-";return`• FT: ${e}-${n}`}const g="soccer-tracker:favorites";function B(){try{return JSON.parse(localStorage.getItem(g))||[]}catch{return[]}}function k(t){const a=B(),n=a.some(s=>s.type===t.type&&String(s.id)===String(t.id))?a.filter(s=>!(s.type===t.type&&String(s.id)===String(t.id))):[...a,t];return localStorage.setItem(g,JSON.stringify(n)),n}const R="https://www.thesportsdb.com/api/v1/json/123";async function f(t){const a=`${R}${t}`,e=await fetch(a);if(!e.ok){const n=await e.text();throw new Error(`TheSportsDB error ${e.status}: ${n}`)}return e.json()}function q(t){return{id:t.idTeam,name:t.strTeam,country:t.strCountry||"",league:t.strLeague||"",badge:t.strTeamBadge||""}}function N(t){return{id:t.idPlayer,name:t.strPlayer,nationality:t.strNationality||"",team:t.strTeam||"",thumb:t.strThumb||t.strCutout||""}}function H(t){return{id:t.idPlayer,name:t.strPlayer,nationality:t.strNationality||"",team:t.strTeam||"",position:t.strPosition||"",birthDate:t.dateBorn||"",birthLocation:t.strBirthLocation||"",height:t.strHeight||"",weight:t.strWeight||"",photo:t.strThumb||t.strCutout||t.strRender||"",description:t.strDescriptionEN||t.strDescriptionES||t.strDescriptionIT||t.strDescriptionFR||""}}async function I(t){return((await f(`/searchteams.php?t=${encodeURIComponent(t)}`)).teams||[]).map(q)}async function M(t){return((await f(`/searchplayers.php?p=${encodeURIComponent(t)}`)).player||[]).map(N)}async function C(t){var n;const e=(n=(await f(`/lookupplayer.php?id=${encodeURIComponent(t)}`)).players)==null?void 0:n[0];if(!e)throw new Error("Player not found (lookup).");return H(e)}const F="https://ancient-paper-fac2.jonathanmazzoli25.workers.dev";function O(){return F.replace(/\/$/,"")+"/v4"}function x(t,a={}){const e=O(),n=e.startsWith("http")?new URL(e+t):new URL(e+t,window.location.origin);return Object.entries(a).forEach(([s,r])=>{r!=null&&r!==""&&n.searchParams.set(s,r)}),n.toString()}async function U(t,a={}){const e=x(t,a),s=await fetch(e,{});if(!s.ok){const r=await s.text();throw new Error(`football-data error ${s.status}: ${r}`)}return s.json()}async function b(t,{status:a="SCHEDULED",limit:e=10}={}){return(await U(`/teams/${t}/matches`,{status:a,limit:e})).matches||[]}const A={arsenal:57,chelsea:61,liverpool:64,"manchester city":65,"manchester united":66,tottenham:73,barcelona:81,"real madrid":86};function j(t){return A[t.trim().toLowerCase()]||null}let $=[],w=[];function W(){const a=(window.location.hash||"#/").replace("#/","").split("/").filter(Boolean);return{route:a[0]||"",id:a[1]||""}}function z(){const t=document.querySelector("#app");l(t,S());const a=document.querySelector("#searchForm"),e=document.querySelector("#results"),n=a.cloneNode(!0),s=e.cloneNode(!0);a.replaceWith(n),e.replaceWith(s);const r=document.querySelector("#tabTeams"),i=document.querySelector("#tabPlayers"),p=document.querySelector("#searchType");function u(c){p.value=c,r.setAttribute("aria-selected",c==="teams"?"true":"false"),i.setAttribute("aria-selected",c==="players"?"true":"false")}r.addEventListener("click",()=>u("teams")),i.addEventListener("click",()=>u("players")),n.addEventListener("submit",async c=>{c.preventDefault();const m=document.querySelector("#searchType").value,d=document.querySelector("#searchQuery").value.trim(),v=document.querySelector("#status");if(s.innerHTML="",!d){v.classList.remove("loading"),h("#status","Please type a search."),s.innerHTML='<p class="muted">Type something to search.</p>';return}v.classList.add("loading"),h("#status","Loading...");try{let o=[];m==="teams"?(o=await I(d),$=o):(o=await M(d),w=o),s.innerHTML=L(o,m),h("#status",`Results: ${o.length}`)}catch(o){console.error(o),h("#status","Error loading results."),s.innerHTML=`<p class="error">${o.message}</p>`}finally{v.classList.remove("loading")}}),s.addEventListener("click",c=>{const m=c.target.closest("[data-team-id]");if(m){window.location.hash=`#/team/${m.dataset.teamId}`;return}const d=c.target.closest("[data-player-id]");d&&(window.location.hash=`#/player/${d.dataset.playerId}`)})}async function _(t){const a=document.querySelector("#app"),e=$.find(n=>String(n.id)===String(t));if(!e){l(a,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="muted">Team not found. Search again.</p>
      </section>`);return}l(a,'<section class="card"><p class="muted">Loading team details...</p></section>');try{const n=j(e.name);let s=[],r=[];n&&(s=await b(n,{status:"SCHEDULED",limit:5}),r=await b(n,{status:"FINISHED",limit:5})),l(a,E(e,s,r))}catch(n){console.error(n),l(a,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="error">${n.message}</p>
      </section>`)}}async function J(t){const a=document.querySelector("#app"),e=w.find(n=>String(n.id)===String(t));l(a,'<section class="panel"><div class="panel-body"><a href="#/" class="back">← Back</a><p class="muted">Loading player details...</p></div></section>');try{const n=await C(t),s={...n,team:n.team||(e==null?void 0:e.team)||"",nationality:n.nationality||(e==null?void 0:e.nationality)||"",photo:n.photo||(e==null?void 0:e.thumb)||""};l(a,D(s))}catch(n){console.error(n),l(a,`<section class="panel">
        <div class="panel-body">
          <a href="#/" class="back">← Back</a>
          <p class="error">${n.message}</p>
        </div>
      </section>`)}}document.addEventListener("click",t=>{const a=t.target.closest("button[data-action='fav']");a&&(k({type:a.dataset.type,id:a.dataset.id,name:a.dataset.name}),a.textContent=a.textContent==="☆"?"★":"☆")});function T(){const{route:t,id:a}=W();if(t==="team"&&a){_(a);return}if(t==="player"&&a){J(a);return}z()}window.addEventListener("hashchange",T);T();
