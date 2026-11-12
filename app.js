/* ══════════════════════════════════════════════════════════════
   app.js — single-page personal homepage logic.
   Reads window.SITE (data.js), renders every section, drives the
   bilingual switch, light/dark theme, six accent schemes, mobile
   drawer, and the shell.
   Zero dependencies, works from file:// (no fetch, no modules).
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var D = window.SITE;
  if (!D) { return; }

  /* ── helpers ─────────────────────────────────────────────────── */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function isObj(v) { return v && typeof v === "object" && !Array.isArray(v); }

  /* language & theme state */
  var lang = "zh";
  try { lang = localStorage.getItem("wy:lang") || "zh"; } catch (e) {}
  if (lang !== "zh" && lang !== "en") { lang = "zh"; }

  function L(v) {
    if (isObj(v)) { return v[lang] != null ? v[lang] : (v.zh != null ? v.zh : v.en); }
    return v == null ? "" : v;
  }
  function t(key) {
    var table = D.i18n[lang] || D.i18n.zh;
    if (table[key] != null) { return table[key]; }
    if (D.i18n.zh[key] != null) { return D.i18n.zh[key]; }
    return key;
  }

  /* ── accent scheme ──────────────────────────────────────────── */
  var SCHEMES = ["red", "blue", "green", "violet", "amber", "graphite"];
  var SCHEME_COLORS = {
    red: "d81e28", blue: "1a43c4", green: "0d7350",
    violet: "6334c4", amber: "945400", graphite: "2f353d"
  };
  var scheme = "red";
  try { scheme = localStorage.getItem("wy:scheme") || "red"; } catch (e) {}
  if (SCHEMES.indexOf(scheme) < 0) { scheme = "red"; }

  function setFavicon(v) {
    var l = document.querySelector('link[rel="icon"]');
    if (!l) { return; }
    var c = SCHEME_COLORS[v] || SCHEME_COLORS.red;
    l.setAttribute("href", "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23" + c + "'/><text x='32' y='47' font-size='40' font-family='Helvetica,Arial' font-weight='700' fill='white' text-anchor='middle'>W</text></svg>");
  }
  function setScheme(v) {
    var val = SCHEMES.indexOf(v) >= 0 ? v : "red";
    scheme = val;
    document.documentElement.setAttribute("data-scheme", val);
    $$("#schemeSwitch .scheme-dot").forEach(function (b) {
      var on = b.getAttribute("data-scheme") === val;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var name = t("scheme." + b.getAttribute("data-scheme"));
      b.setAttribute("aria-label", name);
      b.setAttribute("title", name);
    });
    var sw = $("#schemeSwitch");
    if (sw) { sw.setAttribute("aria-label", t("scheme.label")); }
    setFavicon(val);
    try { localStorage.setItem("wy:scheme", val); } catch (e) {}
  }

  /* ── static UI translations ─────────────────────────────────── */
  function applyI18n() {
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key) { el.innerHTML = t(key); }
    });
    var lb = $("#langToggle");
    if (lb) { lb.textContent = lang === "zh" ? "EN" : "中"; }
    var tt = $("#themeToggle");
    if (tt) { tt.setAttribute("aria-label", lang === "zh" ? "切换亮暗主题" : "Toggle theme"); }
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = t("site.title");
    $$("#schemeSwitch .scheme-dot").forEach(function (b) {
      var name = t("scheme." + b.getAttribute("data-scheme"));
      b.setAttribute("aria-label", name);
      b.setAttribute("title", name);
    });
    var sw = $("#schemeSwitch");
    if (sw) { sw.setAttribute("aria-label", t("scheme.label")); }
  }

  /* ── identity column: tag chips & milestones ────────────────── */
  var TAGS = {
    zh: ["CS 硕士", "算法研究", "AI for Science", "时序预测", "电池 SOH", "PyTorch", "表征学习", "Linux"],
    en: ["M.S. CS", "Algorithm Research", "AI for Science", "Time Series", "Battery SOH", "PyTorch", "Representation", "Linux"],
  };
  var MILESTONES = [
    { date: "2025.07", zh: "加入宁德时代 21C 创新实验室", en: "Joined CATL 21C Innovation Lab" },
    { date: "2025.06", zh: "上海科技大学硕士毕业", en: "M.S. from ShanghaiTech University" },
    { date: "2025", zh: "两篇第一作者论文发表", en: "Two first-author papers published" },
    { date: "2022.09", zh: "开始硕士学业", en: "Started M.S. program" },
    { date: "2018.09", zh: "开始本科学习", en: "Started B.S. program" },
  ];

  function renderChips() {
    var el = $("#tagChips"); if (!el) { return; }
    var list = TAGS[lang] || TAGS.zh;
    el.innerHTML = list.map(function (x, i) {
      return '<span class="chip' + (i < 3 ? " chip--hl" : "") + '">' + esc(x) + "</span>";
    }).join("");
  }

  function renderMilestones() {
    var el = $("#milestones"); if (!el) { return; }
    el.innerHTML = MILESTONES.map(function (m) {
      return '<li><span class="ms__date">' + esc(m.date) + '</span><br><span class="ms__txt">' +
        esc(m[lang] || m.zh) + "</span></li>";
    }).join("");
  }

  /* ── research ───────────────────────────────────────────────── */
  function renderResearch() {
    var el = $("#researchGrid"); if (!el) { return; }
    el.innerHTML = D.research.map(function (r) {
      var tags = (r.tags || []).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("");
      return '<article class="card rcard">' +
        '<span class="rcard__idx">' + esc(r.idx) + "</span>" +
        '<h3 class="rcard__title">' + esc(L(r.title)) + "</h3>" +
        '<p class="rcard__en">' + esc(r.en) + "</p>" +
        '<p class="rcard__body">' + esc(L(r.body)) + "</p>" +
        '<div class="rcard__tags">' + tags + "</div>" +
        '<p class="rcard__metric">▸ ' + esc(L(r.metric)) + "</p>" +
        "</article>";
    }).join("");
  }

  /* ── publications + filters + patents ──────────────────────── */
  var FILTERS = [
    { k: "all", label: "pub.filter.all", test: function () { return true; } },
    { k: "journal", label: "pub.filter.journal", test: function (p) { return p.type === "journal"; } },
    { k: "conf", label: "pub.filter.conf", test: function (p) { return p.type === "conf"; } },
    { k: "first", label: "pub.filter.first", test: function (p) { return !!p.first; } },
  ];
  var activeFilter = "all";

  function renderPublications() {
    var filters = $("#pubFilters");
    var list = $("#pubList");
    if (filters) {
      filters.innerHTML = FILTERS.map(function (f) {
        var n = D.publications.filter(f.test).length;
        return '<button type="button" class="filter' + (activeFilter === f.k ? " active" : "") +
          '" data-f="' + f.k + '">' + esc(t(f.label)) +
          '<span class="filter__count">' + n + "</span></button>";
      }).join("");
      $$(".filter", filters).forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeFilter = btn.getAttribute("data-f") || "all";
          $$(".filter", filters).forEach(function (b) {
            b.classList.toggle("active", b === btn);
          });
          applyFilter();
        });
      });
    }
    if (list) {
      list.innerHTML = D.publications.map(function (p, i) {
        var badges = (p.badges || []).map(function (b) {
          return '<span class="badge' + (b.c ? " badge--" + b.c : "") + '">' + esc(b.t) + "</span>";
        }).join("");
        if (p.pdf) {
          badges += '<a class="badge badge--link" href="' + esc(p.pdf) +
            '" target="_blank" rel="noopener">[PDF]</a>';
        }
        return '<li class="pub" data-i="' + i + '">' +
          '<div class="pub__main">' +
          '<div class="pub__title">' + esc(p.title) + ' <span class="pub__year">(' + esc(p.year) + ")</span></div>" +
          '<div class="pub__authors">' + p.authors + "</div>" +
          '<div class="pub__venue">' + esc(p.venue) + "</div>" +
          "</div>" +
          '<div class="pub__badges">' + badges + "</div>" +
          "</li>";
      }).join("");
    }
    var pat = $("#patents");
    if (pat) {
      pat.innerHTML = D.patents.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    }
    applyFilter();
  }

  function applyFilter() {
    var f = FILTERS.filter(function (x) { return x.k === activeFilter; })[0] || FILTERS[0];
    $$("#pubList .pub").forEach(function (li) {
      var p = D.publications[Number(li.getAttribute("data-i"))];
      li.classList.toggle("hide", !f.test(p));
    });
  }

  /* ── experience timeline ────────────────────────────────────── */
  function renderExperience() {
    var el = $("#timeline"); if (!el) { return; }
    el.innerHTML = D.experience.map(function (e) {
      return '<div class="tl-item tl-item--' + esc(e.type) + '">' +
        '<div class="tl-item__date">' + esc(L(e.date)) + "</div>" +
        '<div class="card tl-item__card">' +
        '<h3 class="tl-item__title">' + esc(L(e.title)) + "</h3>" +
        '<p class="tl-item__org">' + esc(L(e.org)) + "</p>" +
        '<div class="tl-body">' + L(e.body) + "</div>" +
        "</div></div>";
    }).join("");
  }

  /* ── awards ─────────────────────────────────────────────────── */
  function renderAwards() {
    var el = $("#awardsGrid"); if (!el) { return; }
    el.innerHTML = D.awards.map(function (a) {
      return '<div class="card award">' +
        '<div class="award__icon">' + a.icon + "</div>" +
        '<div class="award__title">' + esc(L(a.title)) + "</div>" +
        '<div class="award__sub">' + esc(L(a.sub)) + "</div>" +
        "</div>";
    }).join("");
  }

  /* ── skills + languages ─────────────────────────────────────── */
  function renderSkills() {
    var el = $("#skillsList");
    if (el) {
      el.innerHTML = D.skills.map(function (g) {
        var chips = g.chips.map(function (c) {
          return '<span class="chip' + (c.hl ? " chip--hl" : "") + '">' + esc(c.t) + "</span>";
        }).join("");
        return '<div class="skill-row"><div class="skill-row__k">' + esc(L(g.k)) +
          '</div><div class="skill-row__v">' + chips + "</div></div>";
      }).join("");
    }
    var lb = $("#langbar");
    if (lb) {
      lb.innerHTML = D.langs.map(function (x) {
        return '<div class="langbar__row"><span>' + esc(x.l) + "</span><span>" + esc(x.v) + "</span></div>";
      }).join("");
    }
  }

  /* ── news ───────────────────────────────────────────────────── */
  function renderNews() {
    var el = $("#newsList"); if (!el) { return; }
    el.innerHTML = D.news.map(function (n) {
      return '<div class="news__item">' +
        '<span class="news__date">' + esc(n.date) + "</span>" +
        '<span class="news__tag">' + esc(L(n.tag)) + "</span>" +
        '<span class="news__txt">' + L(n.text) + "</span>" +
        "</div>";
    }).join("");
  }

  function renderAll() {
    renderChips();
    renderMilestones();
    renderResearch();
    renderPublications();
    renderExperience();
    renderAwards();
    renderSkills();
    renderNews();
  }

  /* ── theme ──────────────────────────────────────────────────── */
  function setThemeLabel(v) {
    var b = $("#themeToggle");
    if (b) { b.textContent = v === "dark" ? "☀" : "☾"; }
  }
  function setTheme(v) {
    var val = v === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", val);
    setThemeLabel(val);
    try { localStorage.setItem("wy:theme", val); } catch (e) {}
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(cur === "dark" ? "light" : "dark");
  }

  /* ── language ───────────────────────────────────────────────── */
  function setLang(v) {
    lang = (v === "en") ? "en" : "zh";
    try { localStorage.setItem("wy:lang", lang); } catch (e) {}
    applyI18n();
    renderAll();
    printWelcome();
  }

  /* ── interactive terminal ───────────────────────────────────── */
  var termOut = $("#termOut");
  var termIn = $("#termIn");
  var termForm = $("#termForm");

  function PROMPT() { return "<b>wenjin@homepage</b>:~$"; }
  function line(html, cls) {
    if (!termOut) { return; }
    var d = document.createElement("div");
    d.className = "tline" + (cls ? " tline--" + cls : "");
    d.innerHTML = html;
    termOut.appendChild(d);
    termOut.scrollTop = termOut.scrollHeight;
  }
  function shortcutsHtml() {
    return '<div>' + D.shortcuts.map(function (c) {
      return '<button type="button" class="tchip" data-cmd="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("") + "</div>";
  }
  function printWelcome() {
    if (!termOut) { return; }
    termOut.innerHTML = "";
    line(esc(t("term.welcome")), "ok");
    line(esc(t("term.help")), "dim");
    line(shortcutsHtml());
  }

  var COMMANDS = {
    help: function () {
      line("<b>available commands</b>", "ok");
      line("about · pubs · research · skills · contact · neofetch", "dim");
      line("date · lang [zh|en] · theme · color [name] · whoami · ls · echo · clear · sudo", "dim");
      line(esc(t("term.tip")), "dim");
      line(shortcutsHtml());
    },
    "?": function () { COMMANDS.help(); },
    about: function () {
      line(esc(t("hero.lead")));
      line(esc(t("hero.body")), "dim");
      line('<a href="mailto:' + esc(D.contact.email) + '">' + esc(D.contact.email) + "</a>");
    },
    pubs: function () {
      line("<b>" + esc(t("sec.publications")) + " (" + D.publications.length + ")</b>", "ok");
      D.publications.forEach(function (p) {
        line("[" + esc(p.year) + "] " + esc(p.title) + " — " + esc(p.venue.split(",")[0]), "dim");
      });
    },
    research: function () {
      line("<b>" + esc(t("sec.research")) + "</b>", "ok");
      D.research.forEach(function (r) { line("· " + esc(r.idx) + " — " + esc(L(r.title))); });
    },
    skills: function () {
      D.skills.forEach(function (g) {
        line("<b>" + esc(L(g.k)) + "</b> " + g.chips.map(function (c) { return esc(c.t); }).join(" · "), "dim");
      });
    },
    contact: function () {
      line("✉  <a href=\"mailto:" + esc(D.contact.email) + '">' + esc(D.contact.email) + "</a>");
      line("☎  " + esc(D.contact.phone), "dim");
      line("⌖  " + esc(D.contact.location), "dim");
    },
    neofetch: function () {
      line("<b>wenjin@homepage</b>", "ok");
      line("─────────────────────────────", "dim");
      line("OS      : personal homepage (static)", "dim");
      line("Host    : HTML / CSS / JS, zero deps", "dim");
      line("Role    : " + esc(t("tagline")), "dim");
      line("Papers  : " + D.publications.length + " · Patents: " + D.patents.length, "dim");
      line("Uptime  : " + esc(uptimeStr()), "dim");
      line("Accent  : " + scheme + " · Theme: " + document.documentElement.getAttribute("data-theme"), "dim");
    },
    date: function () {
      line(esc(new Date().toLocaleString(lang === "zh" ? "zh-CN" : "en-US")));
    },
    lang: function (args) {
      var a = (args[0] || "").toLowerCase();
      if (a === "zh" || a === "en") { setLang(a); line("lang → " + a, "ok"); }
      else { setLang(lang === "zh" ? "en" : "zh"); line("lang → " + lang, "ok"); }
    },
    theme: function () { toggleTheme(); line("theme → " + document.documentElement.getAttribute("data-theme"), "ok"); },
    color: function (args) {
      var a = (args[0] || "").toLowerCase();
      if (a) {
        if (SCHEMES.indexOf(a) < 0) {
          line("unknown accent: " + esc(a) + " — try " + SCHEMES.join(" / "), "err");
        } else { setScheme(a); line("color → " + a, "ok"); }
      } else {
        var next = SCHEMES[(SCHEMES.indexOf(scheme) + 1) % SCHEMES.length];
        setScheme(next); line("color → " + next, "ok");
      }
    },
    scheme: function (args) { COMMANDS.color(args); },
    clear: function () { if (termOut) { termOut.innerHTML = ""; } },
    sudo: function () { line(esc(t("term.sudo")), "err"); },
    whoami: function () { line("wenjin — " + esc(t("tagline"))); },
    ls: function () {
      line("about/  research/  publications/  experience/  awards/  skills/  news/  terminal/", "dim");
    },
    echo: function (args) { line(esc(args.join(" "))); },
  };

  function runCommand(raw) {
    var s = String(raw || "").trim();
    if (!s) { return; }
    line(PROMPT() + " " + esc(s), "cmd");
    var parts = s.split(/\s+/);
    var cmd = parts.shift().toLowerCase();
    var fn = COMMANDS[cmd];
    if (fn) { fn(parts); }
    else { line(esc(t("term.unknown")) + " " + esc(cmd), "err"); }
  }

  function initTerminal() {
    if (!termOut || !termIn || !termForm || !$("#terminalBox")) { return; }
    printWelcome();
    termForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = termIn.value;
      termIn.value = "";
      runCommand(v);
    });
    termOut.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest(".tchip") : null;
      if (b && b.getAttribute("data-cmd")) {
        runCommand(b.getAttribute("data-cmd"));
        termIn.focus();
      }
    });
    termIn.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var v = termIn.value.trim().toLowerCase();
        var hit = Object.keys(COMMANDS).filter(function (k) { return k.indexOf(v) === 0; })[0];
        if (hit) { termIn.value = hit + " "; }
      }
    });
  }

  /* ── quick-nav highlight & mobile drawer ────────────────────── */
  function initNav() {
    var links = $$("#quicknav a");
    links.forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
    if (typeof IntersectionObserver === "undefined") { return; }
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) { return; }
          var id = en.target && en.target.id;
          links.forEach(function (a) {
            var on = a.getAttribute("href") === "#" + id;
            a.style.background = on ? "var(--accent)" : "";
            a.style.color = on ? "var(--bg)" : "";
          });
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      ["about", "research", "publications", "experience", "awards", "skills", "news", "terminal"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) { io.observe(el); }
      });
    } catch (e) {}
  }

  /* ── misc: clock, toggles, drawer, to-top, uptime ───────────── */
  function uptimeStr() {
    var s = Math.floor((Date.now() - START) / 1000);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    function pad(x) { return x < 10 ? "0" + x : "" + x; }
    return "up " + pad(h) + ":" + pad(m) + ":" + pad(ss);
  }
  var START = Date.now();

  function initMisc() {
    var year = $("#year");
    if (year) { year.textContent = String(new Date().getFullYear()); }

    var lb = $("#langToggle");
    if (lb) { lb.addEventListener("click", function () { setLang(lang === "zh" ? "en" : "zh"); }); }
    var tb = $("#themeToggle");
    if (tb) { tb.addEventListener("click", toggleTheme); }

    var sw = $("#schemeSwitch");
    if (sw) {
      sw.addEventListener("click", function (e) {
        var b = e.target.closest ? e.target.closest(".scheme-dot") : null;
        if (b && sw.contains(b)) { setScheme(b.getAttribute("data-scheme")); }
      });
    }

    var mb = $("#menuBtn"), mask = $("#drawerMask");
    if (mb) { mb.addEventListener("click", function () { document.body.classList.toggle("nav-open"); }); }
    if (mask) { mask.addEventListener("click", function () { document.body.classList.remove("nav-open"); }); }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { document.body.classList.remove("nav-open"); }
    });

    var up = $("#uptime");
    if (up) {
      var fmt = function () { up.textContent = uptimeStr(); };
      fmt();
      if (typeof document.hidden === "undefined" || !document.hidden) {
        try { setInterval(function () { if (!document.hidden) { fmt(); } }, 1000); } catch (e) {}
      }
    }

    var toTop = $("#toTop");
    if (toTop) {
      var onScroll = function () {
        try { toTop.classList.toggle("show", (window.pageYOffset || 0) > 420); } catch (e) {}
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      toTop.addEventListener("click", function () {
        try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
      });
    }
  }

  /* ── boot ───────────────────────────────────────────────────── */
  var savedTheme = "light";
  try { savedTheme = localStorage.getItem("wy:theme") || "light"; } catch (e) {}
  setTheme(savedTheme);
  setScheme(scheme);
  applyI18n();
  renderAll();
  initTerminal();
  initNav();
  initMisc();
})();
