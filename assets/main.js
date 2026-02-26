/* Visit Sri Lanka Pro — shared interactions (no frameworks) */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setActive(el) {
  document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
  el?.classList?.add("active");
}

function toggleMobileMenu() {
  const m = document.getElementById("mobileMenu");
  if (!m) return;
  m.classList.toggle("open");
  document.body.style.overflow = m.classList.contains("open") ? "hidden" : "";
}

function closeMobileMenu() {
  const m = document.getElementById("mobileMenu");
  if (!m) return;
  m.classList.remove("open");
  document.body.style.overflow = "";
}

function toggleLang() {
  document.getElementById("langMenu")?.classList.toggle("open");
}

function setLang(code) {
  const btn = document.querySelector(".lang-btn");
  const labels = { EN: "🌐 EN ▾", DE: "🌐 DE ▾", FR: "🌐 FR ▾", ZH: "🌐 中文 ▾", JA: "🌐 日本 ▾" };
  if (btn) btn.textContent = labels[code] || labels.EN;
  document.getElementById("langMenu")?.classList.remove("open");

  // Placeholder: multilingual content would be swapped here.
  if (code && code !== "EN") {
    const msg = {
      DE: "🇩🇪 Deutschsprachige Version kommt bald!",
      FR: "🇫🇷 Version française bientôt disponible!",
      ZH: "🇨🇳 中文版本即将推出！",
      JA: "🇯🇵 日本語版は近日公開予定！",
    };
    showToast(msg[code] || "More languages coming soon.");
  }
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.style.cssText = `
    position:fixed;bottom:1.75rem;left:50%;transform:translateX(-50%);
    background:#1a1612;color:#fff;padding:0.85rem 1.25rem;
    border-radius:999px;font-size:0.9rem;z-index:9999;
    box-shadow:0 10px 28px rgba(0,0,0,0.32);
    animation:fadeUp 0.4s ease both;
    max-width:92vw;text-align:center;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function subscribeNewsletter() {
  const input = document.getElementById("newsletterEmail");
  const email = input?.value?.trim?.() || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("⚠️ Please enter a valid email address");
    input?.focus?.();
    return;
  }
  showToast("🌴 Welcome aboard! Check your inbox for a special welcome gift!");
  if (input) input.value = "";
}

function toggleFav(btn) {
  if (!btn) return;
  btn.textContent = btn.textContent === "🤍" ? "❤️" : "🤍";
}

function filterDests(type, btn) {
  document.querySelectorAll(".dest-tab").forEach((t) => t.classList.remove("active"));
  btn?.classList?.add("active");
  document.querySelectorAll(".dest-card").forEach((card) => {
    const allow = type === "all" || card.dataset.type === type;
    card.style.display = allow ? "" : "none";
  });
}

function showPlanPanel(id, btn) {
  document.querySelectorAll(".plan-tab").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".plan-panel").forEach((p) => p.classList.remove("active"));
  btn?.classList?.add("active");
  document.getElementById("panel-" + id)?.classList.add("active");
}

function setBookTab(btn) {
  document.querySelectorAll(".book-tab").forEach((t) => t.classList.remove("active"));
  btn?.classList?.add("active");
}

function openModal(id) {
  document.getElementById(id)?.classList.add("open");
}

function closeModal(id = "successModal") {
  document.getElementById(id)?.classList.remove("open");
}

function validateRequired(el, message) {
  const v = (el?.value || "").trim();
  if (!v) return { ok: false, message };
  return { ok: true };
}

function validateEmail(el) {
  const email = (el?.value || "").trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return ok ? { ok: true } : { ok: false, message: "Please enter a valid email address." };
}

function validateMinLen(el, min, message) {
  const v = (el?.value || "").trim();
  if (v.length < min) return { ok: false, message };
  return { ok: true };
}

function submitTripForm(e) {
  e?.preventDefault?.();
  const form = e?.target || document.getElementById("tripForm");
  if (!form) return;

  const first = form.querySelector('[name="firstName"]');
  const last = form.querySelector('[name="lastName"]');
  const email = form.querySelector('[name="email"]');

  const checks = [
    validateRequired(first, "First name is required."),
    validateRequired(last, "Last name is required."),
    validateEmail(email),
  ];
  const bad = checks.find((c) => !c.ok);
  if (bad) {
    showToast("⚠️ " + bad.message);
    return;
  }

  openModal("successModal");
  form.reset();
}

function submitContactForm(e) {
  e?.preventDefault?.();
  const form = e?.target || document.getElementById("contactForm");
  if (!form) return;

  const name = form.querySelector('[name="fullName"]');
  const email = form.querySelector('[name="email"]');
  const message = form.querySelector('[name="message"]');

  const checks = [
    validateRequired(name, "Full name is required."),
    validateEmail(email),
    validateMinLen(message, 20, "Please add a few more details (at least 20 characters)."),
  ];
  const bad = checks.find((c) => !c.ok);
  if (bad) {
    showToast("⚠️ " + bad.message);
    return;
  }

  openModal("contactThanksModal");
  form.reset();
}

function initNavEffects() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 60);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initDismissers() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-dropdown")) document.getElementById("langMenu")?.classList.remove("open");
  });
}

function initRevealOnScroll() {
  const items = document.querySelectorAll(".fade-up");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
}

function initCurrentNav() {
  const current = (document.body?.dataset?.page || "").toLowerCase();
  if (!current) return;
  document.querySelectorAll(".nav-link").forEach((a) => {
    if ((a.dataset.page || "").toLowerCase() === current) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavEffects();
  initDismissers();
  initRevealOnScroll();
  initCurrentNav();
});

