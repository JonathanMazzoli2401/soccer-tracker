(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();function u(r,n){r.innerHTML=n}function i(r,n){const t=document.querySelector(r);t&&(t.textContent=n)}function d(){return`
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
  `}function m(r,n){return r!=null&&r.length?`
    <ul class="list" role="list">
      ${r.map(t=>{const s=t.badge?`<img class="badge" src="${t.badge}" alt="${t.name} badge">`:"";return n==="teams"?`<li class="list-item">
            <div class="row">
              ${s}
              <div>
                <strong>${t.name}</strong>
                <div class="muted small">${t.country||""}</div>
              </div>
            </div>
            <button class="btn-outline" data-action="fav" data-type="team" data-id="${t.id}" data-name="${t.name}">
              ☆
            </button>
          </li>`:`<li class="list-item">
          <div>
            <strong>${t.name}</strong>
            <div class="muted small">${t.nationality||""}</div>
          </div>
          <button class="btn-outline" data-action="fav" data-type="player" data-id="${t.id}" data-name="${t.name}">
            ☆
          </button>
        </li>`}).join("")}
    </ul>
  `:'<p class="muted">No results.</p>'}function p(){return`
    <section class="card mt">
      <h3>Matches</h3>
      <p class="muted">Match data will be added in W06 using API-Football (fixtures/head-to-head).</p>
    </section>
  `}const c="soccer-tracker:favorites";function f(){try{return JSON.parse(localStorage.getItem(c))||[]}catch{return[]}}function y(r){const n=f(),s=n.some(e=>e.type===r.type&&String(e.id)===String(r.id))?n.filter(e=>!(e.type===r.type&&String(e.id)===String(r.id))):[...n,r];return localStorage.setItem(c,JSON.stringify(s)),s}const g="https://www.thesportsdb.com/api/v1/json",h="123";async function b(r,n={}){const t=new URL(`${g}/${h}${r}`);Object.entries(n).forEach(([e,a])=>{a!=null&&a!==""&&t.searchParams.set(e,a)});const s=await fetch(t.toString());if(!s.ok){const e=await s.text();throw new Error(`TheSportsDB error ${s.status}: ${e}`)}return s.json()}async function v(r){return((await b("/searchteams.php",{t:r})).teams||[]).map(s=>({id:s.idTeam,name:s.strTeam,country:s.strCountry,badge:s.strTeamBadge}))}const S=[{id:1,name:"Luis Suárez",nationality:"Uruguay"},{id:2,name:"Cristiano Ronaldo",nationality:"Portugal"},{id:3,name:"Lionel Messi",nationality:"Argentina"},{id:4,name:"Kylian Mbappé",nationality:"France"}];function L(r){const n=r.toLowerCase();return S.filter(t=>t.name.toLowerCase().includes(n))}function $(){const r=document.querySelector("#app");u(r,d()),r.insertAdjacentHTML("beforeend",p());const n=document.querySelector("#searchForm"),t=document.querySelector("#results");n.addEventListener("submit",async s=>{s.preventDefault();const e=document.querySelector("#searchType").value,a=document.querySelector("#searchQuery").value.trim();t.innerHTML="",i("#status","Loading...");try{let o=[];e==="teams"?o=await v(a):o=L(a),t.innerHTML=m(o,e),i("#status",`Results: ${o.length}`)}catch(o){console.error(o),i("#status","Error loading results."),t.innerHTML=`<p class="error">${o.message}</p>`}}),r.addEventListener("click",s=>{const e=s.target.closest("button[data-action='fav']");if(!e)return;const a=e.dataset.type,o=e.dataset.id,l=e.dataset.name;y({type:a,id:o,name:l}),e.textContent=e.textContent==="☆"?"★":"☆"})}$();
