/* 渲染逻辑：读取 window.SITE（assets/content.js）生成页面。改文字请去 content.js。 */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  /* ---------- 工具函数 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function isPend(s) { return typeof s === "string" && s.trim().indexOf("待补充") === 0; }
  // 文本：待补充 → 占位样式；\n → 换行
  function t(s) {
    if (s == null || s === "") return "";
    return String(s).split("\n").map(function (line) {
      return isPend(line) ? '<span class="pend">' + esc(line) + "</span>" : esc(line);
    }).join("<br>");
  }
  function link(href, label, cls) {
    if (!href || isPend(href)) return '<span class="pend">' + esc(label || "待补充") + "</span>";
    var ext = /^https?:/.test(href);
    return '<a class="' + (cls || "") + '" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(label) + "</a>";
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.title = S.meta.title;
  var md = $('meta[name="description"]'); if (md) md.setAttribute("content", S.meta.description);

  var sections = S.sections.filter(function (s) { return s.visible !== false; });

  /* ---------- 导航 ---------- */
  var nav = $("#nav");
  nav.innerHTML = '<div class="wrap">' +
    '<a class="brand" href="#top"><i aria-hidden="true">j</i>' + esc(S.brand) + "</a>" +
    '<button class="menu-btn" aria-expanded="false" aria-controls="navlinks">菜单</button>' +
    '<ul class="links" id="navlinks">' +
    sections.map(function (s) { return '<li><a href="#' + s.type + '">' + esc(s.nav) + "</a></li>"; }).join("") +
    '<li><a href="#contact">联系</a></li></ul></div>';
  var menuBtn = $(".menu-btn", nav), links = $(".links", nav);
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "关闭" : "菜单";
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { links.classList.remove("show"); menuBtn.setAttribute("aria-expanded", "false"); menuBtn.textContent = "菜单"; }
  });
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- 首屏 ---------- */
  var H = S.hero;
  var chart =
    '<svg class="chart" viewBox="0 0 560 300" aria-hidden="true">' +
    '<defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2340FF" stop-opacity=".16"/><stop offset="1" stop-color="#2340FF" stop-opacity="0"/></linearGradient></defs>' +
    '<line class="axis" x1="20" y1="270" x2="540" y2="270"/>' +
    '<path class="area" d="M20 238 C70 236 95 226 130 222 S190 214 220 196 S280 176 310 160 S370 140 400 112 S470 72 540 44 L540 270 L20 270Z"/>' +
    '<path class="line" d="M20 238 C70 236 95 226 130 222 S190 214 220 196 S280 176 310 160 S370 140 400 112 S470 72 540 44"/>' +
    '<circle class="dot" cx="20" cy="238" r="6" style="animation-delay:.5s"/>' +
    '<circle class="dot end" cx="540" cy="44" r="8" style="animation-delay:1.3s"/>' +
    '<text x="20" y="220" style="animation-delay:.6s">200万</text>' +
    '<text x="540" y="24" text-anchor="end" style="animation-delay:1.35s">700万</text>' +
    '<text x="20" y="292" style="animation-delay:.6s;fill:#6B6A63;font-weight:500">2025.03</text>' +
    '<text x="540" y="292" text-anchor="end" style="animation-delay:1.35s;fill:#6B6A63;font-weight:500">2026.10</text>' +
    "</svg>";
  var resumeBtn = (H.resume.href && !isPend(H.resume.href))
    ? '<a class="btn ghost" href="' + esc(H.resume.href) + '" download>' + esc(H.resume.text) + "</a>"
    : '<span class="btn" aria-disabled="true" title="简历 PDF 待上传">' + esc(H.resume.text) + " <small>（简历 PDF 待上传）</small></span>";
  $("#top").innerHTML = '<div class="wrap">' +
    '<div class="h-top"><b>' + esc(H.name) + "</b><span>" + esc(H.eyebrow) + "</span></div>" +
    '<div class="h-stage"><div class="wordmark" aria-hidden="true">' + esc(H.wordmark) + "</div>" + chart + "</div>" +
    '<div class="h-body">' +
      '<div><h1 class="h-head">' + H.headline.map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("") + "</h1>" +
      '<div class="h-cta"><a class="btn solid" href="' + esc(H.primary.href) + '">' + esc(H.primary.text) + "</a>" + resumeBtn + "</div></div>" +
      '<dl class="h-meta">' + H.meta.map(function (m) { return "<dt>" + esc(m.label) + "</dt><dd>" + t(m.value) + "</dd>"; }).join("") + "</dl>" +
    "</div></div>";

  /* ---------- 各板块 ---------- */
  function head(s) {
    return '<div class="b-head"><div class="tag">' + esc(s.nav) + "</div><div><h2>" + esc(s.title) + "</h2>" +
      (s.subtitle ? "<p>" + t(s.subtitle) + "</p>" : "") + "</div></div>";
  }

  var R = {
    overview: function () {
      var O = S.overview, cols = "ABCD";
      return '<div class="sheet"><div class="stats">' + O.stats.map(function (st, i) {
        var v = st.num != null
          ? '<span class="hlbg"><span data-count="' + st.num + '">' + (reduce ? esc(st.value) : "0") + "</span></span><em>" + esc(st.unit || "") + "</em>"
          : '<span class="hlbg">' + esc(st.value) + "</span>";
        return '<div class="stat' + (st.highlight ? " hl" : "") + '"><span class="ref">' + cols[i] + '1</span><div class="v">' + v + '</div><div class="l">' + t(st.label) + "</div></div>";
      }).join("") + "</div></div>" +
      '<div class="why">' + O.why.map(function (w) { return '<div><h3><i aria-hidden="true"></i>' + esc(w.title) + "</h3><p>" + t(w.text) + "</p></div>"; }).join("") + "</div>";
    },
    cases: function () {
      return '<div class="cases">' + S.cases.map(function (c, i) {
        return '<button class="case" type="button" data-case="' + i + '" aria-haspopup="dialog">' +
          '<div class="when">' + esc(c.period) + "<b>" + esc(c.company) + "</b>" + esc(c.role) + "</div>" +
          "<div><h3>" + esc(c.title) + "</h3><p>" + t(c.oneLiner) + '</p><div class="chips">' +
          c.tags.map(function (g, j) { return '<span class="chip' + (i === 0 ? " k" : "") + '">' + esc(g) + "</span>"; }).join("") +
          '</div></div><span class="open">查看详情</span></button>';
      }).join("") + "</div>";
    },
    ai: function () {
      var A = S.ai;
      return '<div class="tools">' + A.tools.map(function (x) { return '<div class="tool"><h3>' + esc(x.name) + "</h3><p>" + t(x.use) + "</p></div>"; }).join("") + "</div>" +
        '<div class="story"><div class="flow"><span class="me">Jerry · 需求</span><i>→</i><span>Claude · 策划</span><i>→</i><span>Codex · 审查</span><i>→</i><span>上线</span></div>' +
        "<div><h3>" + esc(A.story.title) + "</h3><p>" + t(A.story.text) + "</p></div></div>";
    },
    lab: function () {
      var L = S.lab;
      return '<div class="lab"><form class="lab-in" onsubmit="return false"><h3>' + esc(L.title) + "<small>黄色格子可编辑</small></h3>" +
        L.params.map(function (p) {
          var id = "p-" + p.key;
          return '<div class="param"><label for="' + id + '">' + esc(p.label) + "</label>" +
            '<div class="box"><input type="number" id="' + id + '" data-k="' + p.key + '" value="' + p.value + '" min="' + p.min + '" max="' + p.max + '" step="' + p.step + '" inputmode="decimal"><span>' + esc(p.unit) + "</span></div>" +
            '<input type="range" aria-label="' + esc(p.label) + '" data-r="' + p.key + '" value="' + p.value + '" min="' + p.min + '" max="' + p.max + '" step="' + p.step + '"></div>';
        }).join("") +
        '<button class="reset" type="button">重置为默认值</button></form>' +
        '<div class="lab-out" aria-live="polite"><h3>每日结果<small>实时计算</small></h3><ul class="out">' +
        '<li><span>每日抽奖总次数<span class="f">DAU × 参与率 × 人均次数</span></span><b data-o="draws"></b></li>' +
        '<li><span>每日积分回收量<span class="f">抽奖次数 × 每次消耗积分</span></span><b data-o="points"></b></li>' +
        '<li><span>每日奖品成本<span class="f">抽奖次数 × 每次奖品成本</span></span><b data-o="cost"></b></li>' +
        '<li><span>每日广告收入<span class="f">抽奖次数 × 广告概率 × eCPM ÷ 1000</span></span><b data-o="ad"></b></li>' +
        '<li class="big"><span>每日毛利<span class="f">广告收入 − 奖品成本</span></span><b data-o="profit"></b></li>' +
        '<li><span>投入产出比<span class="f">广告收入 ÷ 奖品成本</span></span><b data-o="roi"></b></li>' +
        '</ul><p class="verdict"></p></div></div>' +
        '<div class="lab-next"><b>' + esc(L.next.title) + "</b><span>" + t(L.next.text) + "</span></div>";
    },
    writing: function () {
      var W = S.writing;
      return '<ul class="posts">' + W.articles.map(function (a) {
        return '<li class="post"><time>' + t(a.date) + "</time><div><h3>" + t(a.title) + "</h3><p>" + t(a.summary) + "</p></div>" +
          (isPend(a.link) ? '<span class="pend">链接待补充</span>' : link(a.link, "阅读全文", "go")) + "</li>";
      }).join("") + "</ul>" +
      '<div class="account"><span>' + esc(W.account.label) + "</span><b>" + t(W.account.name) + "</b></div>";
    },
    timeline: function () {
      return '<ol class="tl">' + S.timeline.map(function (x) {
        return "<li><time>" + esc(x.date) + '</time><span class="dot" aria-hidden="true"></span><div><h3>' + esc(x.title) + "</h3>" + (x.desc ? "<p>" + t(x.desc) + "</p>" : "") + "</div></li>";
      }).join("") + "</ol>";
    }
  };

  $("#main").innerHTML = sections.map(function (s, i) {
    if (!R[s.type]) return "";
    return '<section class="blk' + (i % 2 ? " alt" : "") + '" id="' + s.type + '" aria-labelledby="h-' + s.type + '"><div class="wrap">' +
      head(s).replace("<h2>", '<h2 id="h-' + s.type + '">') + R[s.type]() + "</div></section>";
  }).join("");

  /* ---------- 联系 ---------- */
  var C = S.contact;
  function mail(v) { return isPend(v) ? t(v) : '<a href="mailto:' + esc(v) + '">' + esc(v) + "</a>"; }
  $("#contact").innerHTML = '<div class="c-card"><h2>' + esc(C.headline) + "</h2>" +
    '<dl class="c-list"><div><dt>邮箱</dt><dd>' + mail(C.email) + "</dd></div><div><dt>微信</dt><dd>" + t(C.wechat) + "</dd></div><div><dt>公众号</dt><dd>" + t(C.account) + "</dd></div></dl>" +
    '<p class="c-foot">' + esc(C.copyright) + "</p></div>";

  /* ---------- 计数动画 ---------- */
  var counters = $$("[data-count]");
  function runCount(el) {
    var target = +el.getAttribute("data-count"), start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); io.unobserve(e.target); } });
    }, { threshold: .6 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute("data-count"); });
  }

  /* ---------- 导航高亮 ---------- */
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) $$(".links a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("section.blk, #contact").forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- 案例弹层 ---------- */
  var modal = $("#modal"), lastFocus = null;
  var STEPS = [["background", "背景"], ["responsibility", "我负责什么"], ["actions", "关键动作"], ["result", "结果"], ["review", "复盘"]];
  function openCase(i) {
    var c = S.cases[i]; lastFocus = document.activeElement;
    modal.innerHTML = '<div class="m-box" role="document"><button class="m-close" type="button">关闭</button>' +
      '<div class="when">' + esc(c.period) + " ｜ " + esc(c.company) + " ｜ " + esc(c.role) + "</div>" +
      '<h3 id="m-title">' + esc(c.title) + '</h3><p class="sub">' + t(c.oneLiner) + "</p>" +
      '<ol class="steps">' + STEPS.map(function (s) { return "<li><b>" + s[1] + "</b><p>" + t(c[s[0]]) + "</p></li>"; }).join("") + "</ol></div>";
    modal.setAttribute("aria-labelledby", "m-title");
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    ["nav", "top", "main", "contact"].forEach(function (id) { var el = document.getElementById(id); if (el) el.setAttribute("inert", ""); });
    $(".m-close", modal).focus();
  }
  function closeCase() {
    modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    ["nav", "top", "main", "contact"].forEach(function (id) { var el = document.getElementById(id); if (el) el.removeAttribute("inert"); });
    if (lastFocus) lastFocus.focus();
  }
  $$("[data-case]").forEach(function (b) { b.addEventListener("click", function () { openCase(+b.getAttribute("data-case")); }); });
  modal.addEventListener("click", function (e) { if (e.target === modal || e.target.classList.contains("m-close")) closeCase(); });
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") { closeCase(); return; }
    if (e.key === "Tab") { // 焦点限制在弹层内
      var f = $$("button, a[href], input, [tabindex]:not([tabindex='-1'])", modal);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- 数值沙盘 ---------- */
  var lab = $(".lab");
  if (lab) {
    var P = {};
    S.lab.params.forEach(function (p) { P[p.key] = p; });
    var fmt = function (n, d) { return n.toLocaleString("zh-CN", { maximumFractionDigits: d == null ? 0 : d, minimumFractionDigits: d == null ? 0 : d }); };
    function read(k) {
      var v = parseFloat($('[data-k="' + k + '"]', lab).value);
      if (isNaN(v)) v = P[k].value;
      return Math.min(P[k].max, Math.max(P[k].min, v));
    }
    function calc() {
      var draws = read("dau") * read("join") / 100 * read("draws");
      var points = draws * read("points");
      var cost = draws * read("cost");
      var ad = draws * read("adRate") / 100 * read("ecpm") / 1000;
      var profit = ad - cost;
      var roi = cost > 0 ? ad / cost : Infinity;
      return { draws: draws, points: points, cost: cost, ad: ad, profit: profit, roi: roi };
    }
    function render() {
      var r = calc(), o = function (k) { return $('[data-o="' + k + '"]', lab); };
      o("draws").textContent = fmt(r.draws) + " 次";
      o("points").textContent = fmt(r.points);
      o("cost").textContent = "¥ " + fmt(r.cost, 2);
      o("ad").textContent = "¥ " + fmt(r.ad, 2);
      o("profit").textContent = (r.profit < 0 ? "−¥ " : "¥ ") + fmt(Math.abs(r.profit), 2);
      o("profit").className = r.profit >= 0 ? "pos" : "neg";
      o("roi").textContent = isFinite(r.roi) ? fmt(r.roi, 2) : "∞";
      var v = $(".verdict", lab);
      v.textContent = r.profit >= 0 ? S.lab.positive : S.lab.negative;
      v.classList.toggle("neg", r.profit < 0);
    }
    lab.addEventListener("input", function (e) {
      var k = e.target.getAttribute("data-k") || e.target.getAttribute("data-r");
      if (!k) return;
      var other = e.target.hasAttribute("data-k") ? $('[data-r="' + k + '"]', lab) : $('[data-k="' + k + '"]', lab);
      other.value = e.target.value;
      render();
    });
    lab.addEventListener("change", function (e) {
      var k = e.target.getAttribute("data-k");
      if (k) { var v = read(k); e.target.value = v; $('[data-r="' + k + '"]', lab).value = v; render(); }
    });
    $(".reset", lab).addEventListener("click", function () {
      S.lab.params.forEach(function (p) { $('[data-k="' + p.key + '"]', lab).value = p.value; $('[data-r="' + p.key + '"]', lab).value = p.value; });
      render();
    });
    render();
  }
})();
