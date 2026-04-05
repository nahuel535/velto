gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "power3.out" });

const mm = gsap.matchMedia();

// ─── Header scroll ────────────────────────────────────────────────────────────
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}, { passive: true });

gsap.from(".site-header", { autoAlpha: 0, y: -24, duration: 0.7, ease: "power2.out" });

// ─── H1 word split ───────────────────────────────────────────────────────────
function splitWords(el) {
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  el.innerHTML = words
    .map(w => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
    .join(" ");
  return el.querySelectorAll(".word-inner");
}

// ─── Hero entrance timeline ───────────────────────────────────────────────────
const h1 = document.querySelector(".hero h1");
const wordInners = splitWords(h1);

gsap.set(".hero .eyebrow", { autoAlpha: 0, y: 20 });
gsap.set(wordInners, { y: "110%", autoAlpha: 0 });
gsap.set(".hero-copy", { autoAlpha: 0, y: 28 });
gsap.set(".hero-actions .btn", { autoAlpha: 0, y: 18 });

const heroTl = gsap.timeline({
  defaults: { ease: "power4.out" },
  delay: 0.15,
});

heroTl
  .to(".hero .eyebrow", { autoAlpha: 1, y: 0, duration: 0.65 })
  .to(wordInners, { y: "0%", autoAlpha: 1, stagger: 0.035, duration: 0.75 }, "-=0.3")
  .to(".hero-copy", { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.4")
  .to(".hero-actions .btn", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.35");

// Brand mark spin entrance
gsap.from(".brand-mark", {
  scale: 0,
  rotation: -120,
  duration: 0.8,
  ease: "back.out(2.2)",
  delay: 0.2,
});

// ─── Device shell entrance ───────────────────────────────────────────────────
gsap.set(".device-shell", { autoAlpha: 0, y: 90, scale: 0.96 });

gsap.to(".device-shell", {
  autoAlpha: 1,
  y: 0,
  scale: 1,
  duration: 1.3,
  ease: "power4.out",
  delay: 0.65,
});

// Hero app screenshot — KPI cards and bars enter
gsap.set(".hero-shot .app-kpi-card", { autoAlpha: 0, y: 16 });
gsap.to(".hero-shot .app-kpi-card", {
  autoAlpha: 1,
  y: 0,
  stagger: 0.1,
  duration: 0.5,
  ease: "power2.out",
  delay: 1.5,
});

gsap.set(".hero-shot .app-bar", { scaleY: 0, transformOrigin: "bottom center" });
gsap.to(".hero-shot .app-bar", {
  scaleY: 1,
  stagger: 0.04,
  duration: 0.5,
  ease: "power3.out",
  delay: 2.0,
});

gsap.set(".hero-shot .app-recent-row", { autoAlpha: 0, x: -14 });
gsap.to(".hero-shot .app-recent-row", {
  autoAlpha: 1,
  x: 0,
  stagger: 0.12,
  duration: 0.45,
  ease: "power2.out",
  delay: 2.3,
});

// ─── Device floating idle animation ──────────────────────────────────────────
gsap.to(".device-frame", {
  y: -13,
  duration: 3.8,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
  delay: 2.2,
});

// ─── Status pill breathing glow ───────────────────────────────────────────────
gsap.to(".status-pill", {
  boxShadow: "0 0 0 8px rgba(16, 185, 129, 0.13)",
  duration: 1.5,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
  delay: 2.5,
});

// ─── 3D mouse parallax on device (desktop only) ──────────────────────────────
mm.add("(min-width: 821px)", () => {
  const heroSection = document.querySelector(".hero");
  const deviceFrame = document.querySelector(".device-frame");

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(deviceFrame, {
      rotationY: xPct * 5,
      rotationX: -yPct * 3,
      transformPerspective: 1200,
      duration: 1.6,
      ease: "power1.out",
      overwrite: "auto",
    });
  });

  heroSection.addEventListener("mouseleave", () => {
    gsap.to(deviceFrame, {
      rotationY: 0,
      rotationX: 0,
      duration: 1.4,
      ease: "power2.out",
    });
  });
});

// ─── ScrollTrigger batch — all .reveal cards & blocks ────────────────────────
gsap.set(".reveal", { autoAlpha: 0, y: 42 });

ScrollTrigger.batch(".reveal", {
  onEnter: (batch) => {
    gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      overwrite: true,
    });
  },
  start: "top 88%",
  once: true,
});

// ─── Check list items slide in ───────────────────────────────────────────────
gsap.set(".check-list li", { autoAlpha: 0, x: -22 });

ScrollTrigger.create({
  trigger: ".check-list",
  start: "top 82%",
  once: true,
  onEnter: () => {
    gsap.to(".check-list li", {
      autoAlpha: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.55,
      ease: "power2.out",
    });
  },
});

// ─── Showcase cards — app screenshot reveals ──────────────────────────────────
document.querySelectorAll(".showcase-card").forEach((card, i) => {
  const kpis = card.querySelectorAll(".app-kpi-card");
  const bars = card.querySelectorAll(".app-bar");
  const rows = card.querySelectorAll(".app-trow");

  if (kpis.length) gsap.set(kpis, { autoAlpha: 0, y: 10 });
  if (bars.length) gsap.set(bars, { scaleY: 0, transformOrigin: "bottom center" });
  if (rows.length) gsap.set(rows, { autoAlpha: 0, x: -10 });

  ScrollTrigger.create({
    trigger: card,
    start: "top 82%",
    once: true,
    onEnter: () => {
      if (kpis.length) gsap.to(kpis, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out", delay: 0.2 });
      if (bars.length) gsap.to(bars, { scaleY: 1, stagger: 0.035, duration: 0.45, ease: "power3.out", delay: 0.4 });
      if (rows.length) gsap.to(rows, { autoAlpha: 1, x: 0, stagger: 0.07, duration: 0.4, ease: "power2.out", delay: 0.2 });
    },
  });
});

// ─── Feature cards scale + fade entrance ─────────────────────────────────────
gsap.set(".feature-card", { autoAlpha: 0, y: 50, scale: 0.97 });

ScrollTrigger.batch(".feature-card", {
  onEnter: (batch) => {
    gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
      overwrite: true,
    });
  },
  start: "top 86%",
  once: true,
});

// ─── Section headings reveal ──────────────────────────────────────────────────
document.querySelectorAll(
  ".section h2, .case-grid h2, .dark-grid h2, .cta-panel h2"
).forEach((h2) => {
  gsap.from(h2, {
    autoAlpha: 0,
    y: 36,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: h2,
      start: "top 86%",
      once: true,
    },
  });
});

// ─── Dark panels parallax ─────────────────────────────────────────────────────
gsap.to(".dark-panel.big", {
  y: -45,
  ease: "none",
  scrollTrigger: {
    trigger: "#control",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  },
});

// ─── Dark mini panels stagger ─────────────────────────────────────────────────
gsap.set(".dark-panel.mini", { autoAlpha: 0, y: 30 });

ScrollTrigger.batch(".dark-panel.mini", {
  onEnter: (batch) => {
    gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
    });
  },
  start: "top 85%",
  once: true,
});

// ─── CTA panel dramatic entrance ─────────────────────────────────────────────
gsap.from(".cta-panel", {
  autoAlpha: 0,
  scale: 0.93,
  y: 60,
  duration: 1.1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".cta-panel",
    start: "top 82%",
    once: true,
  },
});

// ─── CTA buttons entrance ────────────────────────────────────────────────────
gsap.set(".cta-panel .btn", { autoAlpha: 0, y: 18 });

ScrollTrigger.create({
  trigger: ".cta-panel",
  start: "top 75%",
  once: true,
  onEnter: () => {
    gsap.to(".cta-panel .btn", {
      autoAlpha: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.55,
      ease: "power3.out",
      delay: 0.3,
    });
  },
});

// ─── Hero interactive view switcher ──────────────────────────────────────────
const heroNavItems    = document.querySelectorAll(".app-nav-clickable");
const heroTabs        = document.querySelectorAll(".hero-tab");
const heroChromeTitle = document.getElementById("heroChromeTitle");
let heroSwitching     = false;

function switchHeroView(view, title) {
  if (heroSwitching) return;
  const targetView  = document.getElementById(`hero-view-${view}`);
  const currentView = document.querySelector(".hero-view:not(.hero-view-hidden)");
  if (!targetView || targetView === currentView) return;
  heroSwitching = true;

  // Sync sidebar nav
  heroNavItems.forEach((n) => n.classList.toggle("app-nav-active", n.dataset.view === view));
  // Sync tab bar
  heroTabs.forEach((t) => t.classList.toggle("hero-tab-active", t.dataset.view === view));
  // Chrome title
  if (heroChromeTitle) heroChromeTitle.textContent = title;

  gsap.to(currentView, {
    autoAlpha: 0, x: -14, duration: 0.18, ease: "power2.in",
    onComplete: () => {
      currentView.classList.add("hero-view-hidden");
      gsap.set(currentView, { x: 0, autoAlpha: 1 });

      targetView.classList.remove("hero-view-hidden");
      gsap.fromTo(targetView,
        { autoAlpha: 0, x: 14 },
        { autoAlpha: 1, x: 0, duration: 0.22, ease: "power2.out",
          onComplete: () => { heroSwitching = false; }
        }
      );

      const kpis = targetView.querySelectorAll(".app-kpi-card");
      const rows = targetView.querySelectorAll(".app-trow");
      const bars = targetView.querySelectorAll(".app-bar");
      if (kpis.length) gsap.from(kpis, { y: 10, autoAlpha: 0, stagger: 0.06, duration: 0.3, ease: "power2.out" });
      if (rows.length) gsap.from(rows, { x: -8, autoAlpha: 0, stagger: 0.05, duration: 0.28, ease: "power2.out" });
      if (bars.length) gsap.from(bars, { scaleY: 0, transformOrigin: "bottom center", stagger: 0.03, duration: 0.35, ease: "power3.out" });
    },
  });
}

heroNavItems.forEach((n) => n.addEventListener("click", () => switchHeroView(n.dataset.view, n.dataset.title)));
heroTabs.forEach((t)     => t.addEventListener("click", () => switchHeroView(t.dataset.view, t.dataset.title)));

// ─── Nav links hover underline animation ─────────────────────────────────────
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, { y: -2, duration: 0.2, ease: "power2.out" });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(link, { y: 0, duration: 0.25, ease: "power2.inOut" });
  });
});

// ─── Vidriera — interactive phone model switcher ─────────────────────────────
let phoneSwitching = false;

function switchPhoneView(view) {
  if (phoneSwitching) return;
  const current = document.querySelector(".sv-pview:not(.sv-pview-hidden)");
  const target  = document.getElementById(`sv-pview-${view}`);
  if (!target || target === current) return;

  phoneSwitching = true;

  // Sync chips inside phone
  document.querySelectorAll(".sv-chip[data-sv-chip]").forEach((c) =>
    c.classList.toggle("sv-chip-active", c.dataset.svChip === view)
  );
  // Sync selector buttons
  document.querySelectorAll(".pms-btn").forEach((b) =>
    b.classList.toggle("pms-active", b.dataset.pview === view)
  );

  gsap.to(current, {
    autoAlpha: 0, x: -10, duration: 0.16, ease: "power2.in",
    onComplete: () => {
      current.classList.add("sv-pview-hidden");
      gsap.set(current, { x: 0, autoAlpha: 1 });
      target.classList.remove("sv-pview-hidden");
      gsap.fromTo(target,
        { autoAlpha: 0, x: 10 },
        { autoAlpha: 1, x: 0, duration: 0.2, ease: "power2.out",
          onComplete: () => { phoneSwitching = false; }
        }
      );
    },
  });
}

document.querySelectorAll(".pms-btn").forEach((btn) =>
  btn.addEventListener("click", () => switchPhoneView(btn.dataset.pview))
);

// ─── Vidriera — phone slides in, list items stagger ──────────────────────────
gsap.from(".phone-shell", {
  autoAlpha: 0, y: 40, rotationY: -8, transformPerspective: 900, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".vidriera-preview", start: "top 82%", once: true },
});

gsap.set(".vidriera-list li", { autoAlpha: 0, x: -20 });
ScrollTrigger.create({
  trigger: ".vidriera-list",
  start: "top 82%",
  once: true,
  onEnter: () => {
    gsap.to(".vidriera-list li", { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.55, ease: "power2.out" });
  },
});

// ─── Compare list items ───────────────────────────────────────────────────────
gsap.set(".compare-list li", { autoAlpha: 0, x: -16 });

document.querySelectorAll(".compare-col").forEach((col) => {
  ScrollTrigger.create({
    trigger: col,
    start: "top 84%",
    once: true,
    onEnter: () => {
      gsap.to(col.querySelectorAll(".compare-list li"), {
        autoAlpha: 1, x: 0, stagger: 0.07, duration: 0.45, ease: "power2.out",
      });
    },
  });
});

// ─── Step numbers count up ────────────────────────────────────────────────────
gsap.set(".step-item", { autoAlpha: 0, y: 32 });

ScrollTrigger.batch(".step-item", {
  onEnter: (batch) => {
    gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power3.out", overwrite: true });
  },
  start: "top 85%",
  once: true,
});

// ─── Testimonial text reveal ──────────────────────────────────────────────────
gsap.from(".testimonial-text", {
  autoAlpha: 0, y: 28, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".testimonial-card", start: "top 82%", once: true },
});
gsap.from(".testimonial-author", {
  autoAlpha: 0, y: 16, duration: 0.65, ease: "power2.out", delay: 0.3,
  scrollTrigger: { trigger: ".testimonial-card", start: "top 82%", once: true },
});

// ─── Video mock bars animate ──────────────────────────────────────────────────
gsap.set(".vs-chart-bar", { scaleY: 0, transformOrigin: "bottom center" });
gsap.set(".vs-kpi", { autoAlpha: 0, y: 10 });

ScrollTrigger.create({
  trigger: ".video-wrap",
  start: "top 80%",
  once: true,
  onEnter: () => {
    gsap.to(".vs-chart-bar", { scaleY: 1, stagger: 0.06, duration: 0.5, ease: "power3.out", delay: 0.2 });
    gsap.to(".vs-kpi", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out", delay: 0.1 });
  },
});

// ─── FAQ items stagger ────────────────────────────────────────────────────────
gsap.set(".faq-item", { autoAlpha: 0, y: 18 });

ScrollTrigger.batch(".faq-item", {
  onEnter: (batch) => {
    gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55, ease: "power2.out", overwrite: true });
  },
  start: "top 88%",
  once: true,
});

// ─── Pricing form slide in ────────────────────────────────────────────────────
gsap.from(".contact-form-card", {
  autoAlpha: 0, x: 28, duration: 0.8, ease: "power3.out",
  scrollTrigger: { trigger: ".pricing-grid", start: "top 82%", once: true },
});

// ─── Accessibility: respect prefers-reduced-motion ────────────────────────────
mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.globalTimeline.timeScale(20);
  ScrollTrigger.getAll().forEach((st) => {
    if (st.vars && st.vars.scrub) st.kill();
  });
});
