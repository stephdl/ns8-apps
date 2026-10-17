"use strict";

const UI = {
  en: {
    search: "Search apps, developers, categories…",
    tagline: "Every NethServer 8 app you can install from a software repository, official and community, in one place.",
    apps: "apps", developers: "developers", repositories: "repositories", updated: "updated",
    byCategory: "Browse by category", byRepo: "Browse by repository", byDev: "Browse by developer",
    recent: "Recently updated", popular: "Most starred", seeAll: "See all",
    all: "All apps", category: "Category", repository: "Repository", developer: "Developer",
    filters: "Filters", official: "Official only", showTesting: "Show testing versions", clear: "Clear filters",
    sort: { stars: "Most stars", name: "Name", updated: "Last update" , quality: "Best quality" },
    noResult: "No app matches these filters.", back: "← All apps",
    variants: (n) => `${n} variants`, versionsCol: "Stable", testingCol: "Testing",
    devCol: "Developer", repoCol: "Repository", updatedCol: "Updated",
 officialBadge: "Official",
    code: "Source code", docs: "Documentation", bugs: "Report a bug",
    history: "Stable", install: "Install on NS8", noVersion: "no release yet",
    stepOfficial: (n) => `Available by default: open the Software Center, search ${n} and click Install.`,
    stepEnableForge: "Open Software Center › Settings › Software repositories and enable NethForge.",
    stepAddRepo: "Open Software Center › Settings › Software repositories and click Add repository.",
    repoName: "Name:", repoUrl: "URL:",
    stepTesting: "Tick “Enable testing”: this app has no stable release yet.",
    stepInstall: (n) => `Back in the Software Center, search ${n} and click Install.`,
    quality: "Quality", howTo: "How to improve", checks: {"repository": "Published in a software repository", "topic": "GitHub topic “ns8”", "categories": "Standard categories", "logo": "Logo", "screenshots": "Screenshots", "description": "Description of 60+ characters", "translations": "Translated description", "docs": "Documentation and bug links", "min_core": "Minimum core label", "license": "License file"},
    copy: "Copy", copied: "Copied", minCore: "Needs core", sortLabel: "Sort", archived: "archived",
    footer: (d) => `Data crawled from GitHub on ${d}. Stars are the stars of each app's source repository.`,
  },
  fr: {
    search: "Chercher une app, un développeur, une catégorie…",
    tagline: "Toutes les applications NethServer 8 installables depuis un dépôt logiciel, officielles et communautaires, au même endroit.",
    apps: "apps", developers: "développeurs", repositories: "dépôts", updated: "mis à jour",
    byCategory: "Parcourir par catégorie", byRepo: "Parcourir par dépôt", byDev: "Parcourir par développeur",
    recent: "Mises à jour récentes", popular: "Les plus étoilées", seeAll: "Tout voir",
    all: "Toutes les apps", category: "Catégorie", repository: "Dépôt", developer: "Développeur",
    filters: "Filtres", official: "Officielles seulement", showTesting: "Afficher les versions testing", clear: "Effacer les filtres",
    sort: { stars: "Plus d'étoiles", name: "Nom", updated: "Dernière mise à jour" , quality: "Meilleure qualité" },
    noResult: "Aucune app ne correspond à ces filtres.", back: "← Toutes les apps",
    variants: (n) => `${n} variantes`, versionsCol: "Stable", testingCol: "Testing",
    devCol: "Développeur", repoCol: "Dépôt", updatedCol: "Mise à jour",
 officialBadge: "Officiel",
    code: "Code source", docs: "Documentation", bugs: "Signaler un bug",
    history: "Stable", install: "Installer sur NS8", noVersion: "pas encore de release",
    stepOfficial: (n) => `Disponible par défaut : ouvrir le Software Center, chercher ${n} et cliquer sur Installer.`,
    stepEnableForge: "Ouvrir Software Center › Paramètres › Dépôts logiciels et activer NethForge.",
    stepAddRepo: "Ouvrir Software Center › Paramètres › Dépôts logiciels et cliquer sur Ajouter un dépôt.",
    repoName: "Nom :", repoUrl: "URL :",
    stepTesting: "Cocher « Activer testing » : cette app n'a pas encore de version stable.",
    stepInstall: (n) => `De retour dans le Software Center, chercher ${n} et cliquer sur Installer.`,
    quality: "Qualité", howTo: "Comment améliorer", checks: {"repository": "Publiée dans un dépôt logiciel", "topic": "Topic GitHub « ns8 »", "categories": "Catégories standard", "logo": "Logo", "screenshots": "Captures d'écran", "description": "Description de 60 caractères ou plus", "translations": "Description traduite", "docs": "Liens documentation et bugs", "min_core": "Label core minimum", "license": "Fichier de licence"},
    copy: "Copier", copied: "Copié", minCore: "Core requis", sortLabel: "Trier", archived: "archivé",
    footer: (d) => `Données collectées sur GitHub le ${d}. Les étoiles sont celles du dépôt de code de chaque app.`,
  },
  it: {
    search: "Cerca app, sviluppatori, categorie…",
    tagline: "Tutte le applicazioni NethServer 8 installabili da un repository software, ufficiali e della community, in un unico posto.",
    apps: "app", developers: "sviluppatori", repositories: "repository", updated: "aggiornato",
    byCategory: "Sfoglia per categoria", byRepo: "Sfoglia per repository", byDev: "Sfoglia per sviluppatore",
    recent: "Aggiornate di recente", popular: "Le più stellate", seeAll: "Vedi tutte",
    all: "Tutte le app", category: "Categoria", repository: "Repository", developer: "Sviluppatore",
    filters: "Filtri", official: "Solo ufficiali", showTesting: "Mostra versioni testing", clear: "Azzera filtri",
    sort: { stars: "Più stelle", name: "Nome", updated: "Ultimo aggiornamento" , quality: "Qualità migliore" },
    noResult: "Nessuna app corrisponde a questi filtri.", back: "← Tutte le app",
    variants: (n) => `${n} varianti`, versionsCol: "Stabile", testingCol: "Testing",
    devCol: "Sviluppatore", repoCol: "Repository", updatedCol: "Aggiornato",
 officialBadge: "Ufficiale", archived: "archiviato",
    code: "Codice sorgente", docs: "Documentazione", bugs: "Segnala un bug",
    history: "Stabile", install: "Installa su NS8", noVersion: "nessuna release",
    stepOfficial: (n) => `Disponibile di default: apri il Software Center, cerca ${n} e clicca Installa.`,
    stepEnableForge: "Apri Software Center › Impostazioni › Repository software e attiva NethForge.",
    stepAddRepo: "Apri Software Center › Impostazioni › Repository software e clicca Aggiungi repository.",
    repoName: "Nome:", repoUrl: "URL:",
    stepTesting: "Spunta “Abilita testing”: questa app non ha ancora una versione stabile.",
    stepInstall: (n) => `Torna al Software Center, cerca ${n} e clicca Installa.`,
    quality: "Qualità", howTo: "Come migliorare", checks: {"repository": "Pubblicata in un repository software", "topic": "Topic GitHub “ns8”", "categories": "Categorie standard", "logo": "Logo", "screenshots": "Screenshot", "description": "Descrizione di almeno 60 caratteri", "translations": "Descrizione tradotta", "docs": "Link a documentazione e bug", "min_core": "Label core minimo", "license": "File di licenza"},
    copy: "Copia", copied: "Copiato", minCore: "Core richiesto", sortLabel: "Ordina",
    footer: (d) => `Dati raccolti da GitHub il ${d}. Le stelle sono quelle del repository sorgente di ogni app.`,
  },
  de: {
    search: "Apps, Entwickler, Kategorien suchen…",
    tagline: "Alle NethServer-8-Anwendungen, die sich aus einem Software-Repository installieren lassen, offiziell und aus der Community, an einem Ort.",
    apps: "Apps", developers: "Entwickler", repositories: "Repositorys", updated: "aktualisiert",
    byCategory: "Nach Kategorie stöbern", byRepo: "Nach Repository stöbern", byDev: "Nach Entwickler stöbern",
    recent: "Kürzlich aktualisiert", popular: "Meiste Sterne", seeAll: "Alle anzeigen",
    all: "Alle Apps", category: "Kategorie", repository: "Repository", developer: "Entwickler",
    filters: "Filter", official: "Nur offizielle", showTesting: "Testing-Versionen anzeigen", clear: "Filter zurücksetzen",
    sort: { stars: "Meiste Sterne", name: "Name", updated: "Letzte Aktualisierung" , quality: "Beste Qualität" },
    noResult: "Keine App passt zu diesen Filtern.", back: "← Alle Apps",
    variants: (n) => `${n} Varianten`, versionsCol: "Stabil", testingCol: "Testing",
    devCol: "Entwickler", repoCol: "Repository", updatedCol: "Aktualisiert",
 officialBadge: "Offiziell", archived: "archiviert",
    code: "Quellcode", docs: "Dokumentation", bugs: "Fehler melden",
    history: "Stabil", install: "Auf NS8 installieren", noVersion: "noch kein Release",
    stepOfficial: (n) => `Standardmäßig verfügbar: Software Center öffnen, nach ${n} suchen und auf Installieren klicken.`,
    stepEnableForge: "Software Center › Einstellungen › Software-Repositorys öffnen und NethForge aktivieren.",
    stepAddRepo: "Software Center › Einstellungen › Software-Repositorys öffnen und auf Repository hinzufügen klicken.",
    repoName: "Name:", repoUrl: "URL:",
    stepTesting: "„Testing aktivieren“ ankreuzen: diese App hat noch kein stabiles Release.",
    stepInstall: (n) => `Zurück im Software Center nach ${n} suchen und auf Installieren klicken.`,
    quality: "Qualität", howTo: "So verbessern", checks: {"repository": "In einem Software-Repository veröffentlicht", "topic": "GitHub-Topic „ns8“", "categories": "Standardkategorien", "logo": "Logo", "screenshots": "Screenshots", "description": "Beschreibung mit 60+ Zeichen", "translations": "Übersetzte Beschreibung", "docs": "Links zu Doku und Fehlermeldung", "min_core": "Label für Mindest-Core", "license": "Lizenzdatei"},
    copy: "Kopieren", copied: "Kopiert", minCore: "Benötigt Core", sortLabel: "Sortieren",
    footer: (d) => `Daten am ${d} von GitHub gesammelt. Die Sterne sind die des Quell-Repositorys jeder App.`,
  },
  es: {
    search: "Buscar apps, desarrolladores, categorías…",
    tagline: "Todas las aplicaciones de NethServer 8 instalables desde un repositorio de software, oficiales y de la comunidad, en un solo lugar.",
    apps: "apps", developers: "desarrolladores", repositories: "repositorios", updated: "actualizado",
    byCategory: "Explorar por categoría", byRepo: "Explorar por repositorio", byDev: "Explorar por desarrollador",
    recent: "Actualizadas recientemente", popular: "Más estrellas", seeAll: "Ver todas",
    all: "Todas las apps", category: "Categoría", repository: "Repositorio", developer: "Desarrollador",
    filters: "Filtros", official: "Solo oficiales", showTesting: "Mostrar versiones testing", clear: "Borrar filtros",
    sort: { stars: "Más estrellas", name: "Nombre", updated: "Última actualización" , quality: "Mejor calidad" },
    noResult: "Ninguna app coincide con estos filtros.", back: "← Todas las apps",
    variants: (n) => `${n} variantes`, versionsCol: "Estable", testingCol: "Testing",
    devCol: "Desarrollador", repoCol: "Repositorio", updatedCol: "Actualizado",
 officialBadge: "Oficial", archived: "archivado",
    code: "Código fuente", docs: "Documentación", bugs: "Reportar un error",
    history: "Estable", install: "Instalar en NS8", noVersion: "sin release todavía",
    stepOfficial: (n) => `Disponible por defecto: abre el Software Center, busca ${n} y haz clic en Instalar.`,
    stepEnableForge: "Abre Software Center › Ajustes › Repositorios de software y activa NethForge.",
    stepAddRepo: "Abre Software Center › Ajustes › Repositorios de software y haz clic en Añadir repositorio.",
    repoName: "Nombre:", repoUrl: "URL:",
    stepTesting: "Marca “Activar testing”: esta app aún no tiene versión estable.",
    stepInstall: (n) => `De vuelta en el Software Center, busca ${n} y haz clic en Instalar.`,
    quality: "Calidad", howTo: "Cómo mejorar", checks: {"repository": "Publicada en un repositorio de software", "topic": "Topic de GitHub “ns8”", "categories": "Categorías estándar", "logo": "Logo", "screenshots": "Capturas de pantalla", "description": "Descripción de 60+ caracteres", "translations": "Descripción traducida", "docs": "Enlaces a documentación y errores", "min_core": "Label de core mínimo", "license": "Archivo de licencia"},
    copy: "Copiar", copied: "Copiado", minCore: "Requiere core", sortLabel: "Ordenar",
    footer: (d) => `Datos recopilados de GitHub el ${d}. Las estrellas son las del repositorio de código de cada app.`,
  },
};

const CATEGORY_NAMES = {
  en: {
    collaboration: "Collaboration", communication: "Communication", office: "Office", monitoring: "Monitoring",
    security: "Security", database: "Database", development: "Development", system_administration: "System administration",
    core: "Core", storage: "Storage", multimedia: "Multimedia", web: "Web", ai: "AI", productivity: "Productivity",
    documentation: "Documentation", accounting: "Accounting", business: "Business", integration: "Integration", mail: "Mail",
  },
  fr: {
    collaboration: "Collaboration", communication: "Communication", office: "Bureautique", monitoring: "Supervision",
    security: "Sécurité", database: "Base de données", development: "Développement", system_administration: "Administration système",
    core: "Cœur", storage: "Stockage", multimedia: "Multimédia", web: "Web", ai: "IA", productivity: "Productivité",
    documentation: "Documentation", accounting: "Comptabilité", business: "Entreprise", integration: "Intégration", mail: "Messagerie",
  },
  it: {
    collaboration: "Collaborazione", communication: "Comunicazione", office: "Ufficio", monitoring: "Monitoraggio",
    security: "Sicurezza", database: "Database", development: "Sviluppo", system_administration: "Amministrazione di sistema",
    core: "Core", storage: "Archiviazione", multimedia: "Multimedia", web: "Web", ai: "IA", productivity: "Produttività",
    documentation: "Documentazione", accounting: "Contabilità", business: "Business", integration: "Integrazione", mail: "Posta",
  },
  de: {
    collaboration: "Zusammenarbeit", communication: "Kommunikation", office: "Büro", monitoring: "Überwachung",
    security: "Sicherheit", database: "Datenbank", development: "Entwicklung", system_administration: "Systemverwaltung",
    core: "Kern", storage: "Speicher", multimedia: "Multimedia", web: "Web", ai: "KI", productivity: "Produktivität",
    documentation: "Dokumentation", accounting: "Buchhaltung", business: "Geschäft", integration: "Integration", mail: "E-Mail",
  },
  es: {
    collaboration: "Colaboración", communication: "Comunicación", office: "Ofimática", monitoring: "Monitorización",
    security: "Seguridad", database: "Base de datos", development: "Desarrollo", system_administration: "Administración de sistemas",
    core: "Núcleo", storage: "Almacenamiento", multimedia: "Multimedia", web: "Web", ai: "IA", productivity: "Productividad",
    documentation: "Documentación", accounting: "Contabilidad", business: "Negocios", integration: "Integración", mail: "Correo",
  },
};

const state = { catalog: null, lang: "en" };
const $ = (sel, root = document) => root.querySelector(sel);

function t(key) {
  return (UI[state.lang] || UI.en)[key] ?? UI.en[key];
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function catName(c) {
  return CATEGORY_NAMES[state.lang]?.[c] || CATEGORY_NAMES.en[c] || c.replace(/[_-]/g, " ").replace(/^./, (x) => x.toUpperCase());
}

function describe(v) {
  const d = v.description || {};
  const text = d[state.lang] || d.en || Object.values(d)[0] || "";
  // Many metadata files carry a one-line blurb; the crawler keeps a longer text for those.
  return text.length < 60 && v.about ? v.about : text;
}

function repoOf(v) {
  return v.forges[0];
}

function repoLabel(id) {
  const f = state.catalog.forges.find((x) => x.id === id);
  return f ? (f.kind === "community" ? f.id : f.name) : id;
}

function relDate(iso) {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  const rtf = new Intl.RelativeTimeFormat(state.lang, { numeric: "auto" });
  if (days < 1) return rtf.format(0, "day");
  if (days < 30) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.round(days / 30), "month");
  return rtf.format(-Math.round(days / 365), "year");
}

function logo(v, cls = "") {
  const letter = esc((v.name || "?")[0].toUpperCase());
  if (!v.logo) return `<span class="logo fallback ${cls}">${letter}</span>`;
  return `<img class="logo ${cls}" src="${esc(v.logo)}" alt="" loading="lazy"
    onerror="this.outerHTML='<span class=&quot;logo fallback ${cls}&quot;>${letter}</span>'">`;
}

/* Data helpers */

function score(v) {
  return Object.values(v.checks || {}).filter(Boolean).length;
}

function lastPush(app) {
  return app.variants.map((v) => v.pushed_at || "").sort().pop();
}

function bestVariant(app) {
  return app.variants[0];
}

function count(list, keyFn) {
  const out = new Map();
  for (const item of list) for (const k of keyFn(item)) out.set(k, (out.get(k) || 0) + 1);
  return [...out].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(b[0]));
}

function searchText(app) {
  if (!app._search) {
    app._search = [
      app.id, ...app.categories.map(catName),
      ...app.variants.flatMap((v) => [v.name, v.developer, ...v.authors, ...v.forges, ...Object.values(v.description), v.about]),
    ].join(" ").toLowerCase();
  }
  return app._search;
}

function filterApps(q) {
  const words = (q.q || "").toLowerCase().split(/\s+/).filter(Boolean);
  return state.catalog.apps.filter((app) =>
    words.every((w) => searchText(app).includes(w)) &&
    (!q.cat || app.categories.includes(q.cat)) &&
    (!q.repo || app.variants.some((v) => repoOf(v) === q.repo)) &&
    (!q.dev || app.variants.some((v) => v.developer === q.dev)) &&
    (!q.official || app.official) &&
    (q.testing || app.variants.some((v) => v.stable) || !app.variants.some((v) => v.testing))
  );
}

function sortApps(apps, by) {
  const cmp = {
    stars: (a, b) => b.stars - a.stars || a.id.localeCompare(b.id),
    name: (a, b) => bestVariant(a).name.localeCompare(bestVariant(b).name),
    updated: (a, b) => (lastPush(b) || "").localeCompare(lastPush(a) || ""),
    quality: (a, b) => score(bestVariant(b)) - score(bestVariant(a)) || b.stars - a.stars,
  }[by] || ((a, b) => b.stars - a.stars);
  return [...apps].sort(cmp);
}

/* Routing: #/, #/apps?cat=office&repo=stephdl, #/app/<id> */

function parseHash() {
  const [path, query = ""] = location.hash.replace(/^#/, "").split("?");
  return { path: path || "/", q: Object.fromEntries(new URLSearchParams(query)) };
}

function link(q) {
  const params = new URLSearchParams(Object.entries(q).filter(([, v]) => v));
  const s = params.toString();
  return `#/apps${s ? "?" + s : ""}`;
}

function renderFooter() {
  const date = new Date(state.catalog.generated_at).toLocaleString(state.lang);
  $("#footer").innerHTML = `${esc(t("footer")(date))} <a href="https://github.com/stephdl/ns8-app-index">GitHub</a>`;
}

function render() {
  const { path, q } = parseHash();
  renderFooter();
  $("#search").value = q.q || "";
  if (path.startsWith("/app/")) renderApp(decodeURIComponent(path.slice(5)));
  else if (path === "/apps") renderBrowse(q);
  else renderHome();
  document.title = path.startsWith("/app/") ? `${$("h1")?.textContent} · NS8 App Index` : "NS8 App Index";
}

/* Views */

function card(app) {
  const v = bestVariant(app);
  const others = app.variants.length > 1 ? `<span class="badge variants">${t("variants")(app.variants.length)}</span>` : "";
  return `<a class="card" href="#/app/${encodeURIComponent(app.id)}">
    <div class="card-head">${logo(v)}<div><h3>${esc(v.name)}</h3>
      <div class="by">${esc(app.variants.map((x) => x.developer).join(", "))}</div></div></div>
    <p>${esc(describe(v))}</p>
    <div class="card-foot">
      ${app.official ? `<span class="badge official">${t("officialBadge")}</span>` : ""}${others}
      ${app.variants.every((x) => x.archived) ? `<span class="badge archived">${t("archived")}</span>` : ""}
      ${v.stable ? `<span class="version">${esc(v.stable)}</span>`
        : v.testing ? `<span class="badge testing">${esc(v.testing)}</span>` : ""}
      <span class="spacer"></span>
      <span class="stars">★ ${app.stars}</span>
    </div></a>`;
}

function tiles(items, hrefFn, labelFn, subFn) {
  return `<div class="tiles">${items.map(([id, n]) => `<a class="tile" href="${hrefFn(id)}">
    <span>${esc(labelFn(id))}${subFn ? `<small>${esc(subFn(id))}</small>` : ""}</span>
    <span class="count">${n}</span></a>`).join("")}</div>`;
}

function renderHome() {
  const { apps, forges, generated_at } = state.catalog;
  const devs = count(apps, (a) => new Set(a.variants.map((v) => v.developer)));
  const cats = count(apps, (a) => a.categories);
  const repos = count(apps, (a) => new Set(a.variants.map(repoOf)));
  const repoSub = (id) => forges.find((f) => f.id === id)?.url.replace(/^https:\/\//, "").replace(/\/ns8\/updates\/$/, "") || "";

  $("#view").innerHTML = `
    <section class="hero">
      <h1>NS8 App Index</h1>
      <p>${t("tagline")}</p>
      <div class="stats">
        <div class="stat"><b>${apps.length}</b><span>${t("apps")}</span></div>
        <div class="stat"><b>${devs.length}</b><span>${t("developers")}</span></div>
        <div class="stat"><b>${forges.length}</b><span>${t("repositories")}</span></div>
        <div class="stat"><b>${relDate(generated_at)}</b><span>${t("updated")}</span></div>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><h2>${t("byCategory")}</h2><a href="#/apps">${t("seeAll")}</a></div>
      ${tiles(cats, (c) => link({ cat: c }), catName)}
    </section>
    <section class="section">
      <div class="section-head"><h2>${t("byRepo")}</h2></div>
      ${tiles(repos, (r) => link({ repo: r }), repoLabel, repoSub)}
    </section>
    <section class="section">
      <div class="section-head"><h2>${t("recent")}</h2><a href="${link({ sort: "updated" })}">${t("seeAll")}</a></div>
      <div class="grid">${sortApps(apps, "updated").slice(0, 6).map(card).join("")}</div>
    </section>
    <section class="section">
      <div class="section-head"><h2>${t("popular")}</h2><a href="${link({ sort: "stars" })}">${t("seeAll")}</a></div>
      <div class="grid">${sortApps(apps, "stars").slice(0, 6).map(card).join("")}</div>
    </section>
    <section class="section">
      <div class="section-head"><h2>${t("byDev")}</h2></div>
      ${tiles(devs, (d) => link({ dev: d }), (d) => d)}
    </section>`;
}

function facet(title, items, key, q, labelFn) {
  return `<div><h4>${title}</h4><div class="facet">${items.map(([id, n]) => {
    const on = q[key] === id;
    return `<a class="${on ? "on" : ""}" href="${link({ ...q, [key]: on ? "" : id })}">
      <span>${esc(labelFn(id))}</span><span>${n}</span></a>`;
  }).join("")}</div></div>`;
}

function renderBrowse(q) {
  const apps = sortApps(filterApps(q), q.sort || "stars");
  // Facet counts follow the other active filters, so each choice shows what it would return.
  const without = (key) => filterApps({ ...q, [key]: "" });
  const chips = [
    q.q && `“${esc(q.q)}”`, q.cat && catName(q.cat), q.repo && repoLabel(q.repo), q.dev,
  ].filter(Boolean);

  const wide = matchMedia("(min-width: 901px)").matches;
  $("#view").innerHTML = `<div class="browse">
    <details class="filters-box" ${wide || q.open ? "open" : ""}><summary>${t("filters")}</summary><aside class="filters">
      ${facet(t("category"), count(without("cat"), (a) => a.categories), "cat", q, catName)}
      ${facet(t("repository"), count(without("repo"), (a) => new Set(a.variants.map(repoOf))), "repo", q, repoLabel)}
      ${facet(t("developer"), count(without("dev"), (a) => new Set(a.variants.map((v) => v.developer))), "dev", q, (d) => d)}
      <div>
        <label><input type="checkbox" id="f-official" ${q.official ? "checked" : ""}> ${t("official")}</label>
        <label><input type="checkbox" id="f-testing" ${q.testing ? "checked" : ""}> ${t("showTesting")}</label>
      </div>
    </aside></details>
    <section>
      <div class="result-bar">
        <div><h2>${apps.length} ${t("apps")}</h2>
          ${chips.length ? `<div class="chips">${chips.map((c) => `<span class="chip">${c}</span>`).join("")}
            <a href="#/apps">${t("clear")}</a></div>` : ""}</div>
        <select id="f-sort" aria-label="${t("sortLabel")}">${Object.entries(t("sort")).map(([k, label]) =>
          `<option value="${k}" ${(q.sort || "stars") === k ? "selected" : ""}>${label}</option>`).join("")}</select>
      </div>
      ${apps.length ? `<div class="grid">${apps.map(card).join("")}</div>` : `<div class="empty">${t("noResult")}</div>`}
    </section></div>`;

  $("#f-official").onchange = (e) => (location.hash = link({ ...q, official: e.target.checked ? "1" : "" }));
  $("#f-testing").onchange = (e) => (location.hash = link({ ...q, testing: e.target.checked ? "1" : "" }));
  $("#f-sort").onchange = (e) => (location.hash = link({ ...q, sort: e.target.value }));
}

function installBlock(v) {
  const steps = (items) => `<ol class="steps">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
  const name = `<b>${esc(v.name)}</b>`;
  const forge = state.catalog.forges.find((f) => f.id === v.forges[0]);
  if (!forge || forge.kind === "official") return steps([t("stepOfficial")(name)]);
  if (forge.kind === "nethforge") return steps([t("stepEnableForge"), t("stepInstall")(name)]);
  const testing = !v.stable && v.testing ? [t("stepTesting")] : [];
  return steps([
    t("stepAddRepo"),
    `${t("repoName")} <code>${esc(forge.id)}</code>`,
    `${t("repoUrl")} ${code(forge.url)}`,
    ...testing,
    t("stepInstall")(name),
  ]);
}

function code(text) {
  return `<pre><button class="copy" type="button">${t("copy")}</button>${esc(text)}</pre>`;
}

function qualityBlock(v) {
  if (!v.checks) return "";
  const guide = "https://github.com/stephdl/ns8-app-index#get-your-app-listed";
  return `<div class="install"><h4>${t("quality")} · ${score(v)}/${Object.keys(v.checks).length}
    <a href="${guide}" target="_blank" rel="noopener">${t("howTo")}</a></h4></div>`;
}

function renderApp(id) {
  const app = state.catalog.apps.find((a) => a.id === id);
  if (!app) {
    $("#view").innerHTML = `<a class="back" href="#/apps">${t("back")}</a><div class="empty">${t("noResult")}</div>`;
    return;
  }
  const main = bestVariant(app);
  const rows = app.variants.map((v) => {
    const docs = v.docs || {};
    const links = [
      v.code_url && `<a href="${esc(v.code_url)}" target="_blank" rel="noopener">${t("code")}</a>`,
      docs.documentation_url && `<a href="${esc(docs.documentation_url)}" target="_blank" rel="noopener">${t("docs")}</a>`,
      docs.bug_url && `<a href="${esc(docs.bug_url)}" target="_blank" rel="noopener">${t("bugs")}</a>`,
    ].filter(Boolean).join("");
    const history = v.stable
      ? `<span class="version">${esc(v.stable)}</span>`
      : `<span class="badge">${t("noVersion")}</span>`;
    const shots = v.screenshots.length
      ? `<div class="shots">${v.screenshots.map((s) => `<a href="${esc(s)}" target="_blank" rel="noopener"><img src="${esc(s)}" alt="" loading="lazy"></a>`).join("")}</div>` : "";
    const sameText = describe(v) === describe(main);

    return `<details class="variant" ${app.variants.length === 1 ? "open" : ""}>
      <summary>
        <span class="dev"><b>${esc(v.developer)}</b><small>${esc(v.authors.join(", ") || v.name)}</small></span>
        <span class="col-hide">${esc(repoLabel(repoOf(v)))}${v.kind === "official" ? ` <span class="badge official">${t("officialBadge")}</span>` : ""}</span>
        <span class="version">${esc(v.stable || "–")}</span>
        <span class="col-hide">${v.testing ? `<span class="badge testing">${esc(v.testing)}</span>` : ""}</span>
        <span class="stars">${v.stars == null ? "" : "★ " + v.stars}</span>
        <span class="col-hide" title="${esc(v.pushed_at || "")}">${relDate(v.pushed_at)}</span>
      </summary>
      <div class="variant-body">
        ${sameText ? "" : `<p>${esc(describe(v))}</p>`}
        ${v.archived ? `<span class="badge archived">${t("archived")}</span>` : ""}
        <div class="links">${links}${v.min_core ? `<span>${t("minCore")} ≥ ${esc(v.min_core)}</span>` : ""}</div>
        <div><div class="install"><h4>${t("history")}</h4></div><div class="history">${history}</div></div>
        <div class="install"><h4>${t("install")}</h4>${installBlock(v)}</div>
        ${qualityBlock(v)}
        ${shots}
      </div></details>`;
  }).join("");

  $("#view").innerHTML = `<a class="back" href="#/apps">${t("back")}</a>
    <div class="app-head">${logo(main, "big")}<div>
      <h1>${esc(main.name)}</h1>
      <div class="meta">
        ${app.official ? `<span class="badge official">${t("officialBadge")}</span>` : ""}
        ${app.categories.map((c) => `<a class="badge" href="${link({ cat: c })}">${esc(catName(c))}</a>`).join("")}
        <span class="stars">★ ${app.stars}</span>
      </div></div></div>
    <p class="lead">${esc(describe(main))}</p>
    <div class="variants">
      <div class="variants-head"><span>${t("devCol")}</span><span>${t("repoCol")}</span><span>${t("versionsCol")}</span>
        <span>${t("testingCol")}</span><span>★</span><span>${t("updatedCol")}</span><span></span></div>
      ${rows}
    </div>`;
}

/* Startup */

function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  $("#lang").value = lang;
  $("#search").placeholder = t("search");
  try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
}

function storedLang() {
  try { return localStorage.getItem("lang"); } catch (e) { return null; }
}

async function init() {
  const browser = (navigator.language || "en").slice(0, 2);
  setLang(storedLang() || ($("#lang").querySelector(`option[value="${browser}"]`) ? browser : "en"));
  const res = await fetch("catalog.json", { cache: "no-cache" });
  state.catalog = await res.json();

  $("#lang").onchange = (e) => { setLang(e.target.value); render(); };
  let timer;
  $("#search").oninput = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const { path, q } = parseHash();
      const base = path === "/apps" ? q : {};
      history.replaceState(null, "", link({ ...base, q: e.target.value }));
      render();
      $("#search").focus();
    }, 150);
  };
  $("#search-form").onsubmit = (e) => e.preventDefault();
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy");
    if (!btn) return;
    navigator.clipboard.writeText(btn.parentElement.textContent.replace(btn.textContent, "").trim());
    btn.textContent = t("copied");
    setTimeout(() => (btn.textContent = t("copy")), 1500);
  });
  window.addEventListener("hashchange", render);
  render();
}

init().catch((err) => {
  $("#view").innerHTML = `<div class="empty">Could not load catalog.json: ${esc(err.message)}</div>`;
});
