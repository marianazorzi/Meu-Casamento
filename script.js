/* =========================================================
   CONFIGURAÇÃO DO CONVITE
   Edite os campos abaixo com as informações do casamento.
   ========================================================= */
const CONFIG = {
  groomName: "Lincon Fernando",
  brideName: "Mariana Zorzi",

  // Data e hora do casamento (usada na contagem regressiva e no cabeçalho)
  weddingDateISO: "2026-11-21T19:00:00",
  heroDateText: "21 • 11 • 2026",
  footerDateText: "21.11.2026",

  message:
    "Com a bênção de Deus e de nossas famílias, convidamos você para celebrar " +
    "conosco o início da nossa nova história. Sua presença tornará este dia " +
    "ainda mais especial.",

  party: {
    label: "Festa",
    time: "19:00",
    place: "Edinaldo - Av",
  },

  // Endereço usado no mapa (Google Maps, sem necessidade de API key)
  address: "Av. Celso Mazutti, 1629 - Vilhena, RO, 76981-099",

  // Data limite para confirmar presença (texto livre)
  rsvpDeadline: "01 de Novembro de 2026",

  // Endpoint para receber as confirmações de presença.
  // Crie uma conta gratuita em https://formsubmit.co e troque pelo seu e-mail:
  // "https://formsubmit.co/ajax/SEU-EMAIL@gmail.com"
  // (o FormSubmit envia um e-mail de confirmação no primeiro uso)
  formEndpoint: "https://formsubmit.co/ajax/casamentomarianaelincon@gmail.com",

  // Número de WhatsApp para fallback do RSVP (com DDI+DDD), ex: 5511999999999
  whatsapp: "",
};

/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  setupEnvelope();
  setupCountdown();
  setupMap();
  setupScrollReveal();
  setupRsvpForm();
  setupCopyAddress();
  setupPhoneMask();
});

function populateContent() {
  const coupleNames = `${CONFIG.brideName} & ${CONFIG.groomName}`;

  setText("splashNames", coupleNames);
  setText("heroNames", coupleNames);
  setText("footerNames", coupleNames);
  setText("coupleSignature", coupleNames);

  setText("heroDate", CONFIG.heroDateText);
  setText("footerDate", CONFIG.footerDateText);
  setText("coupleMessage", CONFIG.message);

  setText("partyLabel", CONFIG.party.label);
  setText("partyTime", CONFIG.party.time);
  setText("partyPlace", CONFIG.party.place);

  setText("locationAddress", CONFIG.address);
  setText("rsvpDeadline", CONFIG.rsvpDeadline);

  document.title = `Casamento de ${coupleNames}`;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ---------------------------------------------------------
   ENVELOPE DE ABERTURA
   --------------------------------------------------------- */
function setupEnvelope() {
  const splash = document.getElementById("splash");
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");

  document.body.classList.add("locked");

  openBtn.addEventListener("click", () => {
    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");
    openBtn.disabled = true;

    setTimeout(() => {
      splash.classList.add("hide");
      document.body.classList.remove("locked");
    }, 1300);

    setTimeout(() => {
      splash.style.display = "none";
      revealHero();
    }, 2300);
  });
}

function revealHero() {
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("in-view"), i * 150);
  });
}

/* ---------------------------------------------------------
   SCROLL REVEAL
   --------------------------------------------------------- */
function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal:not(.hero .reveal)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   CONTAGEM REGRESSIVA
   --------------------------------------------------------- */
function setupCountdown() {
  const target = new Date(CONFIG.weddingDateISO).getTime();
  if (Number.isNaN(target)) return;

  const dEl = document.getElementById("cdDays");
  const hEl = document.getElementById("cdHours");
  const mEl = document.getElementById("cdMinutes");
  const sEl = document.getElementById("cdSeconds");

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = "00";
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    dEl.textContent = String(days).padStart(2, "0");
    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(minutes).padStart(2, "0");
    sEl.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ---------------------------------------------------------
   MAPA
   --------------------------------------------------------- */
function setupMap() {
  const query = encodeURIComponent(CONFIG.address);
  const mapFrame = document.getElementById("mapFrame");
  const mapLink = document.getElementById("mapLink");

  mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function setupCopyAddress() {
  const btn = document.getElementById("copyAddressBtn");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.address);
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Endereço copiado!';
      setTimeout(() => (btn.innerHTML = original), 2000);
    } catch (e) {
      alert(CONFIG.address);
    }
  });
}

/* ---------------------------------------------------------
   MÁSCARA DE TELEFONE (WHATSAPP)
   --------------------------------------------------------- */
function setupPhoneMask() {
  const input = document.getElementById("rsvpPhone");

  input.addEventListener("input", () => {
    let digits = input.value.replace(/\D/g, "").slice(0, 11);

    let formatted = digits;
    if (digits.length > 10) {
      formatted = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (digits.length > 6) {
      formatted = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (digits.length > 2) {
      formatted = digits.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    } else if (digits.length > 0) {
      formatted = digits.replace(/(\d{0,2})/, "($1");
    }

    input.value = formatted.trim().replace(/-$/, "");
  });
}

/* ---------------------------------------------------------
   FORMULÁRIO DE CONFIRMAÇÃO DE PRESENÇA
   --------------------------------------------------------- */
function setupRsvpForm() {
  const form = document.getElementById("rsvpForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("rsvpSubmitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    if (!payload.name || !payload.phone) {
      status.textContent = "Preencha nome e WhatsApp.";
      status.classList.add("err");
      return;
    }

    submitBtn.disabled = true;

    if (CONFIG.formEndpoint) {
      try {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Falha no envio");

        showSuccess();
      } catch (err) {
        status.textContent =
          "Não foi possível enviar agora. Tente novamente ou use o WhatsApp abaixo.";
        status.classList.add("err");
        submitBtn.disabled = false;
      }
    } else if (CONFIG.whatsapp) {
      const text = buildWhatsAppMessage(payload);
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
      showSuccess();
    } else {
      status.textContent =
        "Formulário ainda não configurado (defina formEndpoint ou whatsapp em script.js).";
      status.classList.add("err");
      submitBtn.disabled = false;
    }

    function showSuccess() {
      status.textContent = "Presença confirmada! Obrigado por fazer parte do nosso dia. 💙";
      status.classList.add("ok");
      form.reset();
      submitBtn.disabled = false;
    }
  });
}

function buildWhatsAppMessage(payload) {
  return (
    `Confirmação de presença:\n` +
    `Nome: ${payload.name}\n` +
    `WhatsApp: ${payload.phone}\n` +
    `Acompanhantes: ${payload.guests}\n` +
    `Comparecerá: ${payload.attending}\n` +
    (payload.message ? `Mensagem: ${payload.message}` : "")
  );
}
