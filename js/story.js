import { stories } from "./stories.js";
const params = new URLSearchParams(location.search);
const id = params.get("id") || "message";
const s = stories[id] || stories.message;
document.title = `${s.title} — Hidden Frame AI`;
const root = document.querySelector("#story-root");
const parts = s.parts.map((paras, i) => `
  <section class="story-part">
    ${paras.map(p => `<p>${p}</p>`).join("")}
  </section>
  ${i === 0 ? `<aside class="ad-slot"><small>РЕКЛАМА</small><div>Место для рекламного блока</div></aside>` : ""}
`).join("");
root.innerHTML = `
  <a class="story-back" href="./">← Все истории</a>
  <span class="story-kicker">${s.kicker}</span>
  <h1>${s.title}</h1>
  <p class="story-intro">${s.intro}</p>
  <img class="story-cover" src="${s.image}" alt="${s.title}">
  <article class="story-copy">${parts}</article>
  <aside class="story-support">
    <span>❤️ ПОНРАВИЛАСЬ ИСТОРИЯ?</span>
    <h2>Помоги нам выпускать новые истории чаще.</h2>
    <a class="btn primary" href="https://donatello.to/hiddenframeai" target="_blank" rel="noopener">Поддержать Hidden Frame AI</a>
  </aside>
  <div class="story-end"><h2>Хочешь ещё?</h2><a class="btn secondary" href="./">Смотреть все истории →</a></div>
`;