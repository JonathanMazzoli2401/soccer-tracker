(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();function c(t,s){t.innerHTML=s}function i(t,s){const e=document.querySelector(t);e&&(e.textContent=s)}function g(){return`
    <section class="card">
      <h2>Soccer Tracker</h2>
      <p class="muted">Search teams or players.</p>

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
  `}function v(t,s){return t!=null&&t.length?`
    <ul class="list" role="list">
      ${t.map(e=>{const n=e.badge?`<img class="badge" src="${e.badge}" alt="${e.name} badge">`:"",a=e.thumb?`<img class="badge" src="${e.thumb}" alt="${e.name} photo">`:"";return s==="teams"?`<li class="list-item">
              <div class="row">
                ${n}
                <div>
                  <strong class="link" data-team-id="${e.id}">${e.name}</strong>
                  <div class="muted small">${e.country||""}</div>
                </div>
              </div>

              <button class="btn-outline"
                data-action="fav"
                data-type="team"
                data-id="${e.id}"
                data-name="${e.name}">
                ☆
              </button>
            </li>`:`<li class="list-item">
            <div class="row">
              ${a}
              <div>
                <strong class="link" data-player-id="${e.id}">${e.name}</strong>
                <div class="muted small">${e.nationality||""}${e.team?` • ${e.team}`:""}</div>
              </div>
            </div>

            <button class="btn-outline"
              data-action="fav"
              data-type="player"
              data-id="${e.id}"
              data-name="${e.name}">
              ☆
            </button>
          </li>`}).join("")}
    </ul>
  `:'<p class="muted">No results.</p>'}function $(){return`
    <section class="card mt">
      <h3>Matches</h3>
      <p class="muted">
        Match data is shown in Team Details (upcoming matches and recent results).
      </p>
    </section>
  `}function b(t,s,e){return`
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
      ${u(s)}
    </section>

    <section class="card mt">
      <h3>Recent Results</h3>
      ${u(e,!0)}
    </section>
  `}function w(t){return`
    <section class="card">
      <a href="#/" class="muted small">← Back</a>

      <div class="row" style="margin-top:.75rem;">
        ${t.thumb?`<img class="badge" src="${t.thumb}" alt="${t.name} photo">`:""}
        <div>
          <h2 style="margin:0;">${t.name}</h2>
          <div class="muted small">${t.nationality||""}</div>
          ${t.team?`<div class="muted small">${t.team}</div>`:""}
        </div>

        <div style="margin-left:auto;">
          <button class="btn-outline"
            data-action="fav"
            data-type="player"
            data-id="${t.id}"
            data-name="${t.name}">
            ☆
          </button>
        </div>
      </div>

      ${t.description?`<p class="mt">${t.description}</p>`:'<p class="mt muted">No description available.</p>'}
    </section>
  `}function u(t,s=!1){return t!=null&&t.length?`
    <ul class="list" role="list">
      ${t.map(e=>{var l,d;const n=e.utcDate?new Date(e.utcDate).toLocaleString():"",a=((l=e.homeTeam)==null?void 0:l.name)||"Home",r=((d=e.awayTeam)==null?void 0:d.name)||"Away",o=s?S(e):"";return`
            <li class="list-item">
              <div>
                <strong>${a} vs ${r}</strong>
                <div class="muted small">${n} ${o}</div>
              </div>
            </li>
          `}).join("")}
    </ul>
  `:'<p class="muted">No matches available for this team yet.</p>'}function S(t){var a;const s=(a=t.score)==null?void 0:a.fullTime;if(!s)return"";const e=s.home??"-",n=s.away??"-";return`• FT: ${e}-${n}`}const p="soccer-tracker:favorites";function T(){try{return JSON.parse(localStorage.getItem(p))||[]}catch{return[]}}function E(t){const s=T(),n=s.some(a=>a.type===t.type&&String(a.id)===String(t.id))?s.filter(a=>!(a.type===t.type&&String(a.id)===String(t.id))):[...s,t];return localStorage.setItem(p,JSON.stringify(n)),n}const L="https://www.thesportsdb.com/api/v1/json",D="123";async function B(t,s={}){const e=new URL(`${L}/${D}${t}`);Object.entries(s).forEach(([a,r])=>{r!=null&&r!==""&&e.searchParams.set(a,r)});const n=await fetch(e.toString());if(!n.ok){const a=await n.text();throw new Error(`TheSportsDB error ${n.status}: ${a}`)}return n.json()}async function P(t){return((await B("/searchteams.php",{t})).teams||[]).map(n=>({id:n.idTeam,name:n.strTeam,country:n.strCountry,badge:n.strTeamBadge}))}async function k(t){const e=`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(t)}`,n=await fetch(e);if(!n.ok)throw new Error("TheSportsDB player search failed");return((await n.json()).player||[]).map(r=>({id:r.idPlayer,name:r.strPlayer,nationality:r.strNationality,team:r.strTeam,thumb:r.strThumb,description:r.strDescriptionEN}))}const R="https://ancient-paper-fac2.jonathanmazzoli25.workers.dev";function M(){return R.replace(/\/$/,"")+"/v4"}function N(t,s={}){const e=M(),n=e.startsWith("http")?new URL(e+t):new URL(e+t,window.location.origin);return Object.entries(s).forEach(([a,r])=>{r!=null&&r!==""&&n.searchParams.set(a,r)}),n.toString()}async function j(t,s={}){const e=N(t,s),a=await fetch(e,{});if(!a.ok){const r=await a.text();throw new Error(`football-data error ${a.status}: ${r}`)}return a.json()}async function m(t,{status:s="SCHEDULED",limit:e=10}={}){return(await j(`/teams/${t}/matches`,{status:s,limit:e})).matches||[]}const q={arsenal:57,chelsea:61,liverpool:64,"manchester city":65,"manchester united":66,tottenham:73,barcelona:81,"real madrid":86};function x(t){return q[t.trim().toLowerCase()]||null}let f=[],h=[];function I(){const s=(window.location.hash||"#/").replace("#/","").split("/").filter(Boolean);return{route:s[0]||"",id:s[1]||""}}function O(){const t=document.querySelector("#app");c(t,g()),t.insertAdjacentHTML("beforeend",$());const s=document.querySelector("#searchForm"),e=document.querySelector("#results");s.addEventListener("submit",async n=>{n.preventDefault();const a=document.querySelector("#searchType").value,r=document.querySelector("#searchQuery").value.trim();e.innerHTML="",i("#status","Loading...");try{let o=[];a==="teams"?(o=await P(r),f=o):(o=await k(r),h=o),e.innerHTML=v(o,a),i("#status",`Results: ${o.length}`)}catch(o){console.error(o),i("#status","Error loading results."),e.innerHTML=`<p class="error">${o.message}</p>`}}),e.addEventListener("click",n=>{const a=n.target.closest("[data-team-id]");if(a){window.location.hash=`#/team/${a.dataset.teamId}`;return}const r=n.target.closest("[data-player-id]");r&&(window.location.hash=`#/player/${r.dataset.playerId}`)}),t.addEventListener("click",n=>{const a=n.target.closest("button[data-action='fav']");a&&(E({type:a.dataset.type,id:a.dataset.id,name:a.dataset.name}),a.textContent=a.textContent==="☆"?"★":"☆")})}async function H(t){const s=document.querySelector("#app"),e=f.find(n=>String(n.id)===String(t));if(!e){c(s,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="muted">Team not found. Search again.</p>
      </section>`);return}c(s,'<section class="card"><p class="muted">Loading team details...</p></section>');try{const n=x(e.name);let a=[],r=[];n&&(a=await m(n,{status:"SCHEDULED",limit:5}),r=await m(n,{status:"FINISHED",limit:5})),c(s,b(e,a,r))}catch(n){console.error(n),c(s,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="error">${n.message}</p>
      </section>`)}}function F(t){const s=document.querySelector("#app"),e=h.find(n=>String(n.id)===String(t));if(!e){c(s,`<section class="card">
        <a href="#/" class="muted small">← Back</a>
        <p class="muted">Player not found. Search again.</p>
      </section>`);return}c(s,w(e))}function y(){const{route:t,id:s}=I();if(t==="team"&&s){H(s);return}if(t==="player"&&s){F(s);return}O()}window.addEventListener("hashchange",y);y();
