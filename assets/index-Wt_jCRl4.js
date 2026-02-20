(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();function p(t,a){t.innerHTML=a}function f(t,a){const e=document.querySelector(t);e&&(e.textContent=a)}function C(){return`
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
  `}function N(t,a){return t!=null&&t.length?`
    <ul class="list" role="list">
      ${t.map(e=>{var l,m,u,h;const s=e.name||"Unknown",o=!!e.badge?`<img class="badge" src="${e.badge}" alt="${s} badge" loading="lazy">`:'<div class="badge badge--placeholder" aria-hidden="true">⚽</div>';if(a==="teams"){const d=(l=e.country)!=null&&l.trim()?e.country:"Country: N/A",y=(m=e.league)!=null&&m.trim()?e.league:"",B=y?`${d} • ${y}`:d;return`
              <li class="list-item">
                ${o}
                <div>
                  <button class="item-title link" type="button" data-team-id="${e.id}">
                    ${s}
                  </button>
                  <div class="item-sub">${B}</div>
                </div>
                <div class="chev" aria-hidden="true">›</div>
              </li>
            `}const i=(u=e.nationality)!=null&&u.trim()?e.nationality:"Nationality: N/A",r=(h=e.team)!=null&&h.trim()?e.team:"",c=r?`${i} • ${r}`:i;return`
            <li class="list-item">
              ${e.thumb?`<img class="badge" src="${e.thumb}" alt="${s} photo" loading="lazy">`:'<div class="badge badge--placeholder" aria-hidden="true">👤</div>'}
              <div>
                <button class="item-title link" type="button" data-player-id="${e.id}">
                  ${s}
                </button>
                <div class="item-sub">${c}</div>
              </div>
              <div class="chev" aria-hidden="true">›</div>
            </li>
          `}).join("")}
    </ul>
  `:'<p class="muted">No results.</p>'}function P(){return`
    <section class="card mt">
      <h3>Matches</h3>
      <p class="muted">
        Match data is shown in Team Details (upcoming matches and recent results).
      </p>
    </section>
  `}function k(t,a,e){var i,r;const s=(i=t.country)!=null&&i.trim()?t.country:"N/A",n=(r=t.league)!=null&&r.trim()?t.league:"N/A";return`
    <section class="panel">
      <div class="panel-body">

        <a href="#/" class="back">← Back</a>

        <div class="team-head">
          ${t.badge?`<img class="team-badge" src="${t.badge}" alt="${t.name} badge" loading="lazy">`:'<div class="team-badge team-badge--placeholder" aria-hidden="true">⚽</div>'}

          <div class="team-meta">
            <h2 class="team-name">${t.name}</h2>
            <div class="muted small">${s}</div>
          </div>

          <div class="team-actions">
            <button class="btn-fav"
              data-action="fav"
              data-type="team"
              data-id="${t.id}"
              data-name="${t.name}"
              aria-label="Favorite team">
              ☆
            </button>
          </div>
        </div>

        <div class="info-grid mt" role="list">
          <div class="info-item" role="listitem">
            <div class="muted small">Country</div>
            <div>${s}</div>
          </div>
          <div class="info-item" role="listitem">
            <div class="muted small">League</div>
            <div>${n}</div>
          </div>
        </div>

      </div>
    </section>

    <section class="panel mt">
      <div class="panel-header">Upcoming Matches</div>
      <div class="panel-body">
        ${b(a,!1)}
      </div>
    </section>

    <section class="panel mt">
      <div class="panel-header">Recent Matches</div>
      <div class="panel-body">
        ${b(e,!0)}
      </div>
    </section>
  `}function q(t){return`
    <section class="panel">
      <div class="panel-body">

        <a href="#/" class="back">← Back</a>

        <div class="player-hero">
          <div class="player-photo">
            ${t.photo?`<img src="${t.photo}" alt="${t.name} photo" loading="lazy">`:'<div class="player-photo-placeholder" aria-hidden="true"></div>'}
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
              data-name="${t.name}"
              aria-label="Favorite player">
              ☆
            </button>

            <p class="muted mt">
              ${t.description?t.description:"No description available."}
            </p>
          </div>
        </div>

      </div>
    </section>
  `}function b(t,a=!1){return t!=null&&t.length?`
    <ul class="match-list" role="list">
      ${t.map(e=>{var r,c;const s=e.utcDate?new Date(e.utcDate).toLocaleString():"Date: N/A",n=((r=e.homeTeam)==null?void 0:r.name)||"Home",o=((c=e.awayTeam)==null?void 0:c.name)||"Away",i=a?F(e):"";return`
            <li class="match-item">
              <div class="match-main">
                <span class="match-team">${n}</span>
                <span class="match-vs">vs</span>
                <span class="match-team">${o}</span>
              </div>

              <div class="match-meta">
                <span class="match-date">${s}</span>
                ${a&&i?`<span class="match-score">${i}</span>`:""}
              </div>
            </li>
          `}).join("")}
    </ul>
  `:'<p class="muted">No matches available for this team yet.</p>'}function F(t){var n;const a=(n=t.score)==null?void 0:n.fullTime;if(!a)return"";const e=a.home??"-",s=a.away??"-";return`FT ${e}-${s}`}const T="soccer-tracker:favorites";function M(){try{return JSON.parse(localStorage.getItem(T))||[]}catch{return[]}}function R(t){const a=M(),s=a.some(n=>n.type===t.type&&String(n.id)===String(t.id))?a.filter(n=>!(n.type===t.type&&String(n.id)===String(t.id))):[...a,t];return localStorage.setItem(T,JSON.stringify(s)),s}const I="https://www.thesportsdb.com/api/v1/json/123";async function v(t){const a=`${I}${t}`,e=await fetch(a);if(!e.ok){const s=await e.text();throw new Error(`TheSportsDB error ${e.status}: ${s}`)}return e.json()}function A(t){return{id:t.idTeam,name:t.strTeam,country:t.strCountry||"",league:t.strLeague||"",badge:t.strTeamBadge||"",formedYear:t.intFormedYear||"",stadium:t.strStadium||"",website:t.strWebsite||"",description:t.strDescriptionEN||"",sport:t.strSport||""}}function H(t){return{id:t.idPlayer,name:t.strPlayer,nationality:t.strNationality||"",team:t.strTeam||"",thumb:t.strThumb||t.strCutout||"",sport:t.strSport||""}}function x(t){return{id:t.idPlayer,name:t.strPlayer,nationality:t.strNationality||"",team:t.strTeam||"",position:t.strPosition||"",birthDate:t.dateBorn||"",birthLocation:t.strBirthLocation||"",height:t.strHeight||"",weight:t.strWeight||"",photo:t.strThumb||t.strCutout||t.strRender||"",description:t.strDescriptionEN||t.strDescriptionES||t.strDescriptionIT||t.strDescriptionFR||""}}function O(t){const a=new Map;for(const e of t)a.set(String(e.id),e);return[...a.values()]}function S(t,a){const e=(a||"").toLowerCase();return t.sort((s,n)=>{const o=(s.name||"").toLowerCase(),i=(n.name||"").toLowerCase(),r=c=>c===e?30:c.startsWith(e)?20:c.includes(e)?10:0;return r(i)-r(o)})}async function g(t){const a=(t||"").trim();if(a.length<2)return[];const e=[a];a.toLowerCase()==="nacional"&&(e.unshift("Club Nacional de Football"),e.unshift("Club Nacional"),e.push("Nacional de Football"));const s=a.split(/\s+/).filter(Boolean);s.length>=2?(e.push(s[0]),e.push(s[s.length-1])):(e.push(`${a} FC`),e.push(`Club ${a}`));const n=[];for(const c of e){const m=((await v(`/searchteams.php?t=${encodeURIComponent(c)}`)).teams||[]).map(A).filter(u=>(u.sport||"")==="Soccer");if(n.push(...m),n.length>=10)break}const o=O(n),i=o.filter(c=>(c.name||"").toLowerCase().includes(a.toLowerCase())),r=i.length?i:o;return S(r,a).slice(0,12)}async function U(t){const a=(t||"").trim();if(a.length<2)return[];const s=((await v(`/searchplayers.php?p=${encodeURIComponent(a)}`)).player||[]).map(H).filter(n=>!n.sport||n.sport==="Soccer");return S(s,a).slice(0,12)}async function z(t){var s;const e=(s=(await v(`/lookupplayer.php?id=${encodeURIComponent(t)}`)).players)==null?void 0:s[0];if(!e)throw new Error("Player not found (lookup).");return x(e)}const j="https://ancient-paper-fac2.jonathanmazzoli25.workers.dev";function W(){return j.replace(/\/$/,"")+"/v4"}function Y(t,a={}){const e=W(),s=e.startsWith("http")?new URL(e+t):new URL(e+t,window.location.origin);return Object.entries(a).forEach(([n,o])=>{o!=null&&o!==""&&s.searchParams.set(n,o)}),s.toString()}async function _(t,a={}){const e=Y(t,a),n=await fetch(e,{});if(!n.ok){const o=await n.text();throw new Error(`football-data error ${n.status}: ${o}`)}return n.json()}async function $(t,{status:a="SCHEDULED",limit:e=10}={}){return(await _(`/teams/${t}/matches`,{status:a,limit:e})).matches||[]}const K={arsenal:57,chelsea:61,liverpool:64,"manchester city":65,"manchester united":66,tottenham:73,barcelona:81,"real madrid":86};function Q(t){return K[t.trim().toLowerCase()]||null}let L=[],E=[];function J(){const a=(window.location.hash||"#/").replace("#/","").split("/").filter(Boolean);return{route:a[0]||"",id:a[1]||""}}async function G(t){let a=await g(t);if(a.length)return a;const e=t.split(/\s+/).filter(Boolean);if(e.length>1){const s=e.sort((n,o)=>o.length-n.length)[0];if(a=await g(s),a.length)return a}return[]}function V(){const t=document.querySelector("#app");p(t,C()),t.insertAdjacentHTML("beforeend",P());const a=document.querySelector("#searchForm"),e=document.querySelector("#results"),s=a.cloneNode(!0),n=e.cloneNode(!0);a.replaceWith(s),e.replaceWith(n);const o=document.querySelector("#tabTeams"),i=document.querySelector("#tabPlayers"),r=document.querySelector("#searchType");function c(l){r.value=l,o.setAttribute("aria-selected",l==="teams"?"true":"false"),i.setAttribute("aria-selected",l==="players"?"true":"false")}o.addEventListener("click",()=>c("teams")),i.addEventListener("click",()=>c("players")),s.addEventListener("submit",async l=>{l.preventDefault();const m=document.querySelector("#searchType").value,u=document.querySelector("#searchQuery").value.trim(),h=document.querySelector("#status");if(n.innerHTML="",!u){h.classList.remove("loading"),f("#status","Please type a search."),n.innerHTML='<p class="muted">Type something to search.</p>';return}h.classList.add("loading"),f("#status","Loading...");try{let d=[];m==="teams"?(d=await G(u),L=d):(d=await U(u),E=d),n.innerHTML=N(d,m),f("#status",`Results: ${d.length}`)}catch(d){console.error(d),f("#status","Error loading results."),n.innerHTML=`<p class="error">${d.message}</p>`}finally{h.classList.remove("loading")}}),n.addEventListener("click",l=>{const m=l.target.closest("[data-team-id]");if(m){window.location.hash=`#/team/${m.dataset.teamId}`;return}const u=l.target.closest("[data-player-id]");u&&(window.location.hash=`#/player/${u.dataset.playerId}`)})}async function X(t){const a=document.querySelector("#app"),e=L.find(s=>String(s.id)===String(t));if(!e){p(a,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="muted">Team not found. Search again.</p>
      </section>`);return}p(a,'<section class="card"><p class="muted">Loading team details...</p></section>');try{const s=Q(e.name);let n=[],o=[];s&&(n=await $(s,{status:"SCHEDULED",limit:5}),o=await $(s,{status:"FINISHED",limit:5})),p(a,k(e,n,o))}catch(s){console.error(s),p(a,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="error">${s.message}</p>
      </section>`)}}async function Z(t){const a=document.querySelector("#app"),e=E.find(s=>String(s.id)===String(t));p(a,`<section class="panel">
      <div class="panel-body">
        <a href="#/" class="back">← Back</a>
        <p class="muted">Loading player details...</p>
      </div>
    </section>`);try{const s=await z(t),n={...s,team:s.team||(e==null?void 0:e.team)||"",nationality:s.nationality||(e==null?void 0:e.nationality)||"",photo:s.photo||(e==null?void 0:e.thumb)||""};p(a,q(n))}catch(s){console.error(s),p(a,`<section class="panel">
        <div class="panel-body">
          <a href="#/" class="back">← Back</a>
          <p class="error">${s.message}</p>
        </div>
      </section>`)}}document.addEventListener("click",t=>{const a=t.target.closest("button[data-action='fav']");a&&(R({type:a.dataset.type,id:a.dataset.id,name:a.dataset.name}),a.textContent=a.textContent==="☆"?"★":"☆")});function D(){const{route:t,id:a}=J();if(t==="team"&&a){X(a);return}if(t==="player"&&a){Z(a);return}V()}window.addEventListener("hashchange",D);D();const w=document.getElementById("year");w&&(w.textContent=new Date().getFullYear());
