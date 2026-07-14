/* ==========================================================================
   PICODAVI · main.js
   --------------------------------------------------------------------------
   El JS solo ENRIQUECE. Si falla (o no carga), la web se sigue leyendo y los
   CTAs funcionan. GSAP es opcional: si no está, todo cae a CSS/JS nativo.
   Patrón: IIFE + safe(fn) try/catch por módulo. Un fallo no tumba el resto.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.__PICODAVI__ || {};
  var doc = document;
  var REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);

  /* --- safe(): aísla cada init ------------------------------------------ */
  function safe(fn, name) {
    try { fn(); }
    catch (e) { if (window.console) console.warn("[picodavi] módulo falló:", name, e); }
  }
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* ======================================================================
     1) SPLASH — doble red de seguridad (CSS ~3.7s + hide forzado JS)
     ====================================================================== */
  function initSplash() {
    var splash = $("#splash");
    if (!splash) return;
    var done = false;
    function hide() {
      if (done) return; done = true;
      splash.classList.add("is-done");
      doc.documentElement.classList.remove("is-locked");
      // Avisa a la coreografía del hero: el escenario ya está libre.
      doc.dispatchEvent(new Event("picodavi:ready"));
      window.setTimeout(function () { if (splash && splash.parentNode) splash.parentNode.removeChild(splash); }, 800);
    }
    var delay = REDUCE ? 500 : 2300;
    window.setTimeout(hide, delay);
    window.setTimeout(hide, 4500); // safety: nunca colgado
    window.addEventListener("error", hide, { once: true });
  }

  /* ======================================================================
     2) i18n — toggle ES/EN sin recarga, preferencia en localStorage
     ====================================================================== */
  var LANG_KEY = "picodavi-lang";
  var currentLang = "es";

  function getDict(lang) { return (DATA.i18n && DATA.i18n[lang]) || {}; }

  function applyLang(lang) {
    if (!DATA.i18n || !DATA.i18n[lang]) lang = "es";
    currentLang = lang;
    var dict = getDict(lang);

    $all("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    $all("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });
    $all("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      if (dict[k] != null) el.setAttribute("aria-label", dict[k]);
    });
    $all("[data-i18n-alt]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-alt");
      if (dict[k] != null) el.setAttribute("alt", dict[k]);
    });
    doc.documentElement.setAttribute("lang", lang);
    // El <title> con data-i18n ya se traduce en el bucle de arriba (cada página
    // usa su propia clave). Las páginas sin data-i18n en el título lo conservan.

    var toggle = $("#langToggle");
    if (toggle && dict["nav.langAria"]) toggle.setAttribute("aria-label", dict["nav.langAria"]);

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var saved = "es";
    try { saved = localStorage.getItem(LANG_KEY) || "es"; } catch (e) {}
    applyLang(saved);
    var toggle = $("#langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLang(currentLang === "es" ? "en" : "es");
        initLinks();
      });
    }
  }

  /* ======================================================================
     3) ENLACES dinámicos desde el manifest (WhatsApp / email / Instagram)
     ====================================================================== */
  function waUrl(text) {
    var num = (DATA.brand && DATA.brand.whatsapp ? DATA.brand.whatsapp : "").replace(/[^0-9]/g, "");
    var base = num ? "https://wa.me/" + num : "https://wa.me/";
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }
  function initLinks() {
    var email = (DATA.brand && DATA.brand.email) || "picoiudavid@gmail.com";
    var ig = (DATA.brand && DATA.brand.instagram) || "";

    $all("[data-wa-link]").forEach(function (a) {
      a.setAttribute("href", waUrl());
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    $all("[data-mail-link]").forEach(function (a) { a.setAttribute("href", "mailto:" + email); });
    $all("[data-ig-link]").forEach(function (a) {
      a.setAttribute("href", ig ? "https://instagram.com/" + ig : "#");
      a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener");
    });

    // Mostrar el número de teléfono en pantalla donde se pida
    var phone = (DATA.brand && DATA.brand.phoneDisplay) || "";
    if (phone) $all("[data-phone-display]").forEach(function (el) { el.textContent = phone; });

    // CTA de páginas de proyecto → WhatsApp con mensaje sobre ese proyecto
    $all("[data-wa-project]").forEach(function (a) {
      var proj = a.getAttribute("data-wa-project") || "";
      var msg = currentLang === "en"
        ? "Hi David, I saw the " + proj + " project on your website and I'd like something similar for my business. Can we talk?"
        : "Hola David, he visto el proyecto de " + proj + " en tu web y me gustaría algo parecido para mi negocio. ¿Hablamos?";
      a.setAttribute("href", waUrl(msg));
      a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener");
    });

    // CTA de precios → abre WhatsApp con mensaje genérico
    $all("[data-wa-cta]").forEach(function (a) {
      var msg = currentLang === "en"
        ? "Hi David, I saw your pricing and I'm not sure which plan I need. Can we talk?"
        : "Hola David, he visto los precios y no sé qué plan necesito. ¿Hablamos?";
      a.setAttribute("href", waUrl(msg));
      a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener");
    });
  }

  /* ======================================================================
     4) FORMULARIO → WhatsApp con mensaje pre-rellenado
     ====================================================================== */
  function initForm() {
    var form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

      function v(name) { var el = form.elements[name]; return el && el.value ? el.value.trim() : ""; }
      var name = v("name") || "—";
      var type = v("type") || "—";
      var contactInfo = v("contact");
      var message = v("message");

      var tpl = (DATA.waTemplate && DATA.waTemplate[currentLang]) ||
                "Hola David, soy {name}. Tengo un negocio de {type} y te escribo desde tu web sobre un proyecto. {message}";
      var msg = tpl.replace("{name}", name).replace("{type}", type).replace("{message}", message || "");
      if (contactInfo) {
        msg += currentLang === "en" ? "  · Contact: " + contactInfo : "  · Contacto: " + contactInfo;
      }
      window.open(waUrl(msg), "_blank", "noopener");
    });
  }

  /* ======================================================================
     5) NAV — sólido al bajar, burger móvil
     ====================================================================== */
  function initNav() {
    var nav = $("#nav");
    var burger = $("#burger");
    var menu = $("#mobileMenu");
    if (!nav) return;

    var hero = $("#hero");
    function onScroll() {
      var trigger = hero ? hero.offsetHeight * 0.55 : 320;
      if (window.scrollY > trigger) nav.classList.add("is-solid");
      else nav.classList.remove("is-solid");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function closeMenu() {
      nav.classList.remove("is-open");
      if (burger) burger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    }
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        menu.hidden = !open;
      });
      $all("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });
    }
    // Cerrar con Escape
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  

  /* ======================================================================
     7) REVEAL — default visible; solo oculta si hay motion (.anim)
        IntersectionObserver (threshold 0.05) + safety 6s revela todo.
     ====================================================================== */
  function initReveal() {
    var els = $all(".reveal");
    if (!els.length) return;

    if (REDUCE || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    // Activa el modo animado: a partir de aquí los .reveal parten ocultos (CSS)
    doc.documentElement.classList.add("anim");

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Red de seguridad: nada se queda invisible
    window.setTimeout(function () { els.forEach(function (el) { el.classList.add("is-in"); }); }, 6000);
  }

  /* ======================================================================
     8) WHATSAPP flotante — aparece tras el primer viewport
     ====================================================================== */
  function initFloat() {
    var fab = $("#waFloat");
    if (!fab) return;
    function onScroll() {
      if (window.scrollY > window.innerHeight * 0.9) fab.classList.add("is-visible");
      else fab.classList.remove("is-visible");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ======================================================================
     9) PROCESO — progreso "0X / 03" + pin horizontal opcional (GSAP)
     ====================================================================== */
  function initProcess() {
    var section = $("#process");
    var viewport = $("#processViewport");
    var track = $("#processTrack");
    var progress = $("#processProgress");
    var steps = $all(".step", track);
    if (!section || !viewport || !track || !steps.length) return;
    var n = steps.length;

    function setProgress(i) {
      if (!progress) return;
      var idx = Math.min(n, Math.max(1, i + 1));
      progress.textContent = (idx < 10 ? "0" + idx : idx) + " / " + (n < 10 ? "0" + n : n);
    }

    var canPin = hasGSAP && !REDUCE && window.innerWidth >= 900 && track.scrollWidth > viewport.clientWidth + 40;

    if (canPin) {
      // --- Enhancement: pin + scroll horizontal con GSAP ---
      window.gsap.registerPlugin(window.ScrollTrigger);
      section.classList.add("is-pinned");

      var getAmount = function () { return Math.max(0, track.scrollWidth - viewport.clientWidth); };

      window.gsap.to(track, {
        x: function () { return -getAmount(); },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: function () { return "+=" + getAmount(); },
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: function (self) { setProgress(Math.round(self.progress * (n - 1))); }
        }
      });
      window.addEventListener("load", function () { window.ScrollTrigger.refresh(); });
    } else {
      // --- Baseline: scroll-snap nativo + progreso por scroll ---
      var onScroll = function () {
        var sw = steps[0].offsetWidth + 24;
        var i = Math.round(viewport.scrollLeft / sw);
        setProgress(i);
      };
      viewport.addEventListener("scroll", onScroll, { passive: true });
      setProgress(0);
    }
  }

  // NOTA: el stagger de reveals con GSAP se eliminó a propósito. Dejaba un
  // opacity:0 en línea sobre tarjetas/proyectos y, como la sección "Cómo funciona"
  // está fijada (pin) con ScrollTrigger, sus disparadores no siempre se calculaban
  // bien y el contenido quedaba invisible. Los reveals los hace ahora el
  // IntersectionObserver de initReveal() (robusto, con red de seguridad de 6 s).

  /* ======================================================================
     11) BANNER DE COOKIES — solo almacenamiento técnico; informativo y honesto.
         Se monta una vez (idempotente) y recuerda la aceptación en localStorage.
     ====================================================================== */
  function pathPrefix() {
    var p = location.pathname;
    return (p.indexOf("/proyectos/") !== -1 || p.indexOf("/legal/") !== -1) ? "../" : "";
  }
  function initCookies() {
    var KEY = "picodavi-cookies";
    var accepted = false;
    try { accepted = localStorage.getItem(KEY) === "accepted"; } catch (e) {}
    if (accepted) return;
    if (doc.getElementById("cookieBanner")) return; // idempotente

    var dict = getDict(currentLang);
    var prefix = pathPrefix();

    var bar = doc.createElement("div");
    bar.id = "cookieBanner";
    bar.className = "cookie-banner";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Aviso de cookies");
    bar.innerHTML =
      '<p class="cookie-banner__text">' +
        '<span data-i18n="cookie.text">' + (dict["cookie.text"] || "Uso solo almacenamiento técnico necesario para que la web funcione.") + '</span> ' +
        '<a class="cookie-banner__more" href="' + prefix + 'legal/cookies.html" data-i18n="cookie.more">' + (dict["cookie.more"] || "Política de cookies") + '</a>' +
      '</p>' +
      '<button type="button" class="cookie-banner__btn btn btn--primary" data-cursor="ver" data-i18n="cookie.accept">' + (dict["cookie.accept"] || "Entendido") + '</button>';

    doc.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add("is-in"); });

    bar.querySelector(".cookie-banner__btn").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "accepted"); } catch (e) {}
      bar.classList.remove("is-in");
      window.setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 400);
    });
  }

  /* ======================================================================
     12) SEO — autocorrige las URLs absolutas al dominio real donde se publique.
         Si olvidas cambiar el dominio de ejemplo (picodavi.com), aquí se ajusta
         solo a partir del dominio real cuando Google rastrea la web publicada.
     ====================================================================== */
  function initSeoUrls() {
    if (location.protocol.indexOf("http") !== 0) return;          // file:// → no tocar
    var host = location.hostname;
    if (!host || host === "localhost" || host === "127.0.0.1") return; // dev → no tocar
    var origin = location.origin;
    function swap(url) { return url ? url.replace(/^https?:\/\/[^/]+/, origin) : url; }

    var can = doc.querySelector('link[rel="canonical"]');
    if (can) can.setAttribute("href", swap(can.getAttribute("href")));
    var ogUrl = doc.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", swap(ogUrl.getAttribute("content")));
    var ogImg = doc.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute("content", swap(ogImg.getAttribute("content")));

    $all('script[type="application/ld+json"]').forEach(function (s) {
      if (s.textContent.indexOf("https://picodavi.com") !== -1) {
        s.textContent = s.textContent.split("https://picodavi.com").join(origin);
      }
    });
  }

  /* ======================================================================
     BORDE-LINTERNA — el borde de las tarjetas se ilumina siguiendo el cursor.
     Solo puntero fino (ratón) y sin reduced-motion; en táctil no se activa.
     ====================================================================== */
  function initGlow() {
    if (REDUCE) return;
    if (!(window.matchMedia && window.matchMedia("(pointer: fine)").matches)) return;
    var els = $all(".card, .reccard, .sector, .commit, .audience__item, .featured, .step, .about__stats li, .includes");
    els.forEach(function (el) {
      el.classList.add("glow");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive: true });
    });
  }

  /* ======================================================================
     TILT — el mockup del hero se inclina suavemente siguiendo el cursor.
     Máx ~3.5°; solo ratón y sin reduced-motion. Vuelve a su sitio al salir.
     ====================================================================== */
  function initTilt() {
    if (REDUCE) return;
    if (!(window.matchMedia && window.matchMedia("(pointer: fine)").matches)) return;
    var art = $(".hero__art");
    var browser = art && $(".browser", art);
    if (!art || !browser) return;
    art.addEventListener("pointermove", function (e) {
      var r = art.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
      var y = (e.clientY - r.top) / r.height - 0.5;
      browser.style.transform = "rotateY(" + (x * 7) + "deg) rotateX(" + (y * -7) + "deg)";
    }, { passive: true });
    art.addEventListener("pointerleave", function () {
      browser.style.transform = "";
    });
  }

  /* ======================================================================
     DEMO DE SECTORES — un único momento interactivo que enseña capacidad.
     Botones reales, teclado y estado accesible; sin autoplay que distraiga.
     ====================================================================== */
  function initStudioDemo() {
    var demo = $("#studioDemo");
    if (!demo) return;
    var tabs = $all("[data-demo]", demo);
    var scenes = $all("[data-scene]", demo);
    if (!tabs.length || !scenes.length) return;

    function activate(name, moveFocus) {
      tabs.forEach(function (tab) {
        var active = tab.getAttribute("data-demo") === name;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.setAttribute("tabindex", active ? "0" : "-1");
        if (active && moveFocus) tab.focus();
      });
      scenes.forEach(function (scene) {
        var active = scene.getAttribute("data-scene") === name;
        scene.classList.toggle("is-active", active);
        scene.setAttribute("aria-hidden", active ? "false" : "true");
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { activate(tab.getAttribute("data-demo"), false); });
      tab.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var next = e.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
        activate(tabs[next].getAttribute("data-demo"), true);
      });
    });
    activate(tabs[0].getAttribute("data-demo"), false);
  }

  /* ======================================================================
     MOMENTO ESTRELLA — el titular entra letra a letra girando en 3D (rotateX)
     justo cuando el splash se retira. Es LA animación de la página: todo lo
     demás se mantiene discreto a propósito.
     Accesibilidad: el texto real vive en aria-label; las letras son decorativas.
     Sin GSAP o con reduced-motion, cae al reveal normal (fade) sin tocar nada.
     ====================================================================== */
  function initHeroIntro() {
    if (REDUCE || !window.gsap) return;          // el reveal normal se encarga
    var title = $(".hero__title");
    if (!title) return;
    var parts = $all("[data-split]", title);
    if (!parts.length) return;

    parts.forEach(function (el) {
      var text = el.textContent;
      el.setAttribute("aria-label", text);       // el lector de pantalla lee esto
      el.textContent = "";
      // Se agrupa por PALABRAS: cada letra es inline-block y, sin este envoltorio,
      // el navegador podría partir una palabra por la mitad al saltar de línea.
      text.split(/(\s+)/).forEach(function (token) {
        if (!token) return;
        if (/^\s+$/.test(token)) { el.appendChild(doc.createTextNode(" ")); return; }
        var word = doc.createElement("span");
        word.className = "wd";
        token.split("").forEach(function (c) {
          var s = doc.createElement("span");
          s.className = "ch";
          s.setAttribute("aria-hidden", "true");
          s.textContent = c;
          word.appendChild(s);
        });
        el.appendChild(word);
      });
      el.classList.add("is-in");                 // el contenedor visible; animamos las letras
    });

    var chars = $all(".ch", title);
    if (!chars.length) return;
    var played = false;
    function play() {
      if (played) return; played = true;
      window.gsap.from(chars, {
        opacity: 0, yPercent: 70, rotateX: -70,
        duration: 0.6, ease: "expo.out", stagger: 0.018,
        onComplete: function () { chars.forEach(function (c) { c.style.willChange = "auto"; }); }
      });
    }
    if (!$("#splash")) { play(); return; }        // páginas sin splash: ya
    doc.addEventListener("picodavi:ready", play, { once: true });
    window.setTimeout(play, 5000);                // red de seguridad
  }

  /* ======================================================================
     CTA MAGNÉTICO — el botón se acerca al cursor y vuelve con rebote elástico.
     Solo 2 botones focales (más sería ruido). Ratón fino y sin reduced-motion.
     La fuerza se limita al 30% para que nunca salga de su zona de clic.
     ====================================================================== */
  function initMagnetic() {
    if (REDUCE || !window.gsap || !window.gsap.quickTo) return;
    if (!(window.matchMedia && window.matchMedia("(pointer: fine)").matches)) return;
    var targets = [$(".hero__cta .btn--spark"), $(".contact .btn--primary")]
      .filter(function (el) { return !!el; });

    targets.forEach(function (el) {
      el.classList.add("btn--magnetic");
      var xTo = window.gsap.quickTo(el, "x", { duration: 0.4, ease: "elastic.out(1,0.4)" });
      var yTo = window.gsap.quickTo(el, "y", { duration: 0.4, ease: "elastic.out(1,0.4)" });
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      }, { passive: true });
      function reset() { xTo(0); yTo(0); }
      el.addEventListener("pointerleave", reset);
      el.addEventListener("blur", reset);
    });
  }

  /* ======================================================================
     PARALLAX DEL MONTSENY — las tres crestas y el resplandor se mueven a
     velocidades distintas al hacer scroll (profundidad real, no decorado).
     Scrub ligado al scroll: interrumpible por definición. Sin GSAP: estático.
     ====================================================================== */
  function initRidges() {
    if (REDUCE || !hasGSAP) return;
    var hero = $(".hero--dark");
    if (!hero) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    [[".ridge--back", -16], [".ridge--mid", -30], [".ridge--front", -48], [".hero__glow", -20]]
      .forEach(function (p) {
        var el = $(p[0], hero);
        if (!el) return;
        window.gsap.to(el, {
          yPercent: p[1], ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
        });
      });
  }

  /* ======================================================================
     PROFUNDIDAD CON EL RATÓN — al entrar, las crestas, el resplandor y las
     luciérnagas se separan según su plano siguiendo el cursor: 3D real en vivo.
     Usa el eje X (horizontal); el scroll usa yPercent, así NO chocan.
     Solo ratón fino y sin reduced-motion; en táctil no se activa.
     ====================================================================== */
  function initSceneMouse() {
    if (REDUCE || !window.gsap || !window.gsap.quickTo) return;
    if (!(window.matchMedia && window.matchMedia("(pointer: fine)").matches)) return;
    var hero = $(".hero--dark");
    if (!hero) return;
    // [selector, amplitud X (px), amplitud Y (px)] — más plano = más movimiento.
    var defs = [
      [".ridge--back",  7,  0],
      [".ridge--mid",  14,  0],
      [".ridge--front", 24, 0],
      [".hero__glow",  -28, 0],   // en sentido opuesto: refuerza la profundidad
      [".fireflies",   18, 11]
    ];
    var layers = [];
    defs.forEach(function (d) {
      var el = $(d[0], hero);
      if (!el) return;
      el.style.willChange = "transform";
      layers.push({
        xTo: window.gsap.quickTo(el, "x", { duration: 0.8, ease: "power2.out" }),
        yTo: d[2] ? window.gsap.quickTo(el, "y", { duration: 0.8, ease: "power2.out" }) : null,
        ax: d[1], ay: d[2]
      });
    });
    if (!layers.length) return;

    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
      var ny = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(function (l) { l.xTo(nx * l.ax); if (l.yTo) l.yTo(ny * l.ay); });
    }, { passive: true });
    hero.addEventListener("pointerleave", function () {
      layers.forEach(function (l) { l.xTo(0); if (l.yTo) l.yTo(0); });
    });
  }

  /* ======================================================================
     ARRANQUE
     ====================================================================== */
  function boot() {
    safe(initSplash, "splash");
    safe(initLang, "i18n");
    safe(initLinks, "links");
    safe(initForm, "form");
    safe(initNav, "nav");
    safe(initReveal, "reveal");
    safe(initFloat, "float");
    safe(initProcess, "process");
    safe(initSeoUrls, "seo-urls");
    safe(initGlow, "glow");
    safe(initRidges, "ridges");
    safe(initTilt, "tilt");
    safe(initStudioDemo, "studio-demo");
    safe(initHeroIntro, "hero-intro");
    safe(initMagnetic, "magnetic");
    safe(initSceneMouse, "scene-mouse");
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
