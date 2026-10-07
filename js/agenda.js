/**
 * BI UNHAS STUDIO — AGENDAMENTO ONLINE OTIMIZADO (PÁGINA 2)
 * Fluxo em etapas de alta conversão, sem travamentos, com WhatsApp direto
 */

const SERVICES_DB = [
  {
    id: "fibra_aplicacao",
    name: "Aplicação de Fibra de Vidro",
    category: "alongamento",
    price: 180,
    durationMin: 120,
    durationText: "2h",
    description: "Alongamento com fibra de alta resistência, curvatura natural e acabamento fino.",
    image: "assets/alongamento.jpg",
    maappId: 6607862
  },
  {
    id: "banho_gel",
    name: "Banho de Gel (Blindagem)",
    category: "gel",
    price: 110,
    durationMin: 120,
    durationText: "2h",
    description: "Camada protetora em gel na unha natural. Evita quebras e fixa o esmalte por semanas.",
    image: "assets/banho_gel.jpg",
    maappId: 6607846
  },
  {
    id: "manutencao_fibra",
    name: "Manutenção de Fibra",
    category: "alongamento",
    price: 120,
    durationMin: 120,
    durationText: "2h",
    description: "Reposição de gel, ponto de tensão e nivelamento da curvatura (20 a 30 dias).",
    image: "assets/alongamento.jpg",
    maappId: 6607875
  },
  {
    id: "mao_tradicional",
    name: "Mão Tradicional",
    category: "tradicional",
    price: 35,
    durationMin: 40,
    durationText: "40 min",
    description: "Cutilagem funda sem machucar, lixamento simétrico e esmaltação impecável.",
    image: "assets/nail_nude_chic.jpg",
    maappId: 6607823
  },
  {
    id: "pedicure_tradicional",
    name: "Pedicure Tradicional",
    category: "tradicional",
    price: 40,
    durationMin: 60,
    durationText: "1h",
    description: "Cuidado completo para os pés com remoção de asperezas, cutilagem e hidratação.",
    image: "assets/pedicure.jpg",
    maappId: 6607831
  },
  {
    id: "combo_mao_pe",
    name: "Combo Mão & Pé Completo",
    category: "tradicional",
    price: 75,
    durationMin: 100,
    durationText: "1h 40min",
    description: "Cuidado duplo completo para mãos e pés com acabamento hidratante de luxo.",
    image: "assets/nail_almond_minimal.jpg",
    maappId: 6607823
  },
  {
    id: "esmaltacao_gel",
    name: "Esmaltação em Gel",
    category: "gel",
    price: 70,
    durationMin: 60,
    durationText: "1h",
    description: "Esmalte curado em cabine LED/UV. Secagem instantânea e zero borrões por até 20 dias.",
    image: "assets/nail_red_glam.jpg",
    maappId: 6607846
  },
  {
    id: "nail_art_francesinha",
    name: "Nail Art Francesinha / Baby Boomer",
    category: "art",
    price: 30,
    durationMin: 30,
    durationText: "+30 min",
    description: "Arte clássica ou degradê delicado feito com pincel de detalhamento fino.",
    image: "assets/nail_babyboomer.jpg",
    maappId: null
  },
  {
    id: "nail_art_encapsulada",
    name: "Nail Art Encapsulada / Ouro / Glazed",
    category: "art",
    price: 50,
    durationMin: 45,
    durationText: "+45 min",
    description: "Design com folhas de ouro, pedrarias ou efeito Hailey Bieber cromado.",
    image: "assets/nail_art.jpg",
    maappId: null
  },
  {
    id: "design_henna",
    name: "Design com Henna",
    category: "sobrancelhas",
    price: 45,
    durationMin: 60,
    durationText: "1h",
    description: "Mapeamento facial e pigmentação com henna de alta fixação para preencher falhas.",
    image: "assets/design_olhar.jpg",
    maappId: 6607914
  },
  {
    id: "design_sobrancelha",
    name: "Design de Sobrancelhas na Pinça",
    category: "sobrancelhas",
    price: 35,
    durationMin: 40,
    durationText: "40 min",
    description: "Alinhamento visagista na pinça respeitando a harmonia e formato natural do rosto.",
    image: "assets/design_olhar.jpg",
    maappId: 6607898
  },
  {
    id: "remocao_alongamento",
    name: "Remoção Segura de Alongamento",
    category: "extras",
    price: 50,
    durationMin: 40,
    durationText: "40 min",
    description: "Remoção mecânica e química controlada sem lixar e sem agredir a lâmina natural.",
    image: "assets/alongamento.jpg",
    maappId: null
  }
];

// Estado Global do Agendamento
const bookingState = {
  currentStep: 1,
  selectedServices: [], // Array de IDs
  selectedDate: null,
  selectedTime: null,
  selectedPro: { id: "bia", name: "Beatriz Delli Colli (Master Nail Designer)" },
  clientName: "",
  clientPhone: "",
  hasOldNails: false,
  clientNotes: "",
  customDetails: null // Preenchido se veio do Simulador
};

document.addEventListener('DOMContentLoaded', () => {
  initUrlParams();
  renderServicesList('all');
  initCategoryTabs();
  initCalendar();
  initProfessionalSelector();
  initFormInputs();
  updateSummaryUI();
  updateStepVisibility();
});

// 1. Ler parâmetros da URL (do Portfólio ou Simulador)
function initUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const serviceKey = params.get('service');

  if (serviceKey) {
    const srv = SERVICES_DB.find(s => s.id === serviceKey);
    if (srv && !bookingState.selectedServices.includes(srv.id)) {
      bookingState.selectedServices.push(srv.id);
    }
  }

  // Se veio do Simulador com personalização
  if (params.get('customShape')) {
    bookingState.customDetails = {
      shape: params.get('customShape'),
      length: params.get('customLength'),
      finish: params.get('customFinish'),
      price: params.get('customPrice')
    };
    
    // Adicionar serviço base se não estiver
    if (!bookingState.selectedServices.includes('fibra_aplicacao')) {
      bookingState.selectedServices.push('fibra_aplicacao');
    }
  }
}

// 2. Renderizar lista de serviços selecionáveis
function renderServicesList(category = 'all') {
  const container = document.getElementById('services-list-container');
  if (!container) return;

  const filtered = category === 'all'
    ? SERVICES_DB
    : SERVICES_DB.filter(s => s.category === category);

  container.innerHTML = filtered.map(item => {
    const isSelected = bookingState.selectedServices.includes(item.id);
    return `
      <div class="service-select-item ${isSelected ? 'selected' : ''}" 
           data-id="${item.id}" 
           onclick="toggleServiceSelect('${item.id}')">
        <img src="${item.image}" alt="${item.name}" class="service-thumbnail">
        <div class="service-main-meta">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <div class="service-badge-row">
            <span class="badge-duration"><i class="far fa-clock"></i> ${item.durationText}</span>
          </div>
        </div>
        <div class="service-price-column">
          <span class="service-price-amount">R$ ${item.price},00</span>
          <div class="check-indicator">
            <i class="fas fa-check"></i>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Alternar seleção do serviço
window.toggleServiceSelect = function(serviceId) {
  const index = bookingState.selectedServices.indexOf(serviceId);
  if (index > -1) {
    bookingState.selectedServices.splice(index, 1);
  } else {
    bookingState.selectedServices.push(serviceId);
  }

  renderServicesList(currentCategoryFilter);
  updateSummaryUI();
};

let currentCategoryFilter = 'all';
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.cat-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategoryFilter = tab.dataset.cat;
      renderServicesList(currentCategoryFilter);
    });
  });
}

// 4. CALENDÁRIO INTERATIVO E SLOTS
let currentCalDate = new Date();

function initCalendar() {
  renderCalendarDays(currentCalDate);

  const prevBtn = document.getElementById('cal-prev-month');
  const nextBtn = document.getElementById('cal-next-month');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() - 1);
      renderCalendarDays(currentCalDate);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() + 1);
      renderCalendarDays(currentCalDate);
    });
  }

  initTimeChips();
}

function renderCalendarDays(date) {
  const monthTitle = document.getElementById('cal-month-title');
  const daysContainer = document.getElementById('calendar-days-container');
  if (!monthTitle || !daysContainer) return;

  const year = date.getFullYear();
  const month = date.getMonth();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  monthTitle.textContent = `${monthNames[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let html = '';

  // Espaços vazios antes do 1º dia
  for (let i = 0; i < firstDayIndex; i++) {
    html += `<div class="day-cell disabled"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(year, month, d);
    const dayOfWeek = thisDate.getDay();
    const isPast = thisDate < today;
    const isClosed = (dayOfWeek === 0 || dayOfWeek === 1); // Domingo e Segunda fechados

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSelected = bookingState.selectedDate === dateStr;

    if (isPast || isClosed) {
      html += `<div class="day-cell disabled" title="${isClosed ? 'Estúdio Fechado' : 'Data Passada'}">${d}</div>`;
    } else {
      html += `
        <div class="day-cell has-available ${isSelected ? 'selected' : ''}" 
             data-date="${dateStr}"
             onclick="selectCalendarDay('${dateStr}')">
          ${d}
        </div>
      `;
    }
  }

  daysContainer.innerHTML = html;
}

window.selectCalendarDay = function(dateStr) {
  bookingState.selectedDate = dateStr;
  renderCalendarDays(currentCalDate);
  updateSummaryUI();

  // Rolar suavemente até os horários se estiver em mobile
  const timeSection = document.getElementById('time-slots-section');
  if (timeSection && window.innerWidth < 768) {
    timeSection.scrollIntoView({ behavior: 'smooth' });
  }
};

function initTimeChips() {
  const chips = document.querySelectorAll('.time-chip:not(.booked)');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      bookingState.selectedTime = chip.dataset.time;
      updateSummaryUI();
    });
  });
}

// 5. SELEÇÃO DE PROFISSIONAL
function initProfessionalSelector() {
  const proCards = document.querySelectorAll('.pro-card-option');
  proCards.forEach(card => {
    card.addEventListener('click', () => {
      proCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingState.selectedPro = {
        id: card.dataset.id,
        name: card.dataset.name
      };
      updateSummaryUI();
    });
  });
}

// 6. FORMULÁRIO E MÁSCARAS
function initFormInputs() {
  const nameInput = document.getElementById('client-name-input');
  const phoneInput = document.getElementById('client-phone-input');
  const removalSwitch = document.getElementById('client-removal-switch');
  const notesInput = document.getElementById('client-notes-input');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      bookingState.clientName = e.target.value;
      updateSummaryUI();
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.substring(0, 11);
      
      if (val.length > 6) {
        val = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
      } else if (val.length > 2) {
        val = `(${val.substring(0, 2)}) ${val.substring(2)}`;
      }
      e.target.value = val;
      bookingState.clientPhone = val;
      updateSummaryUI();
    });
  }

  if (removalSwitch) {
    removalSwitch.addEventListener('change', (e) => {
      bookingState.hasOldNails = e.target.checked;
      
      // Adicionar ou remover taxa de remoção se marcado
      const hasRemService = bookingState.selectedServices.includes('remocao_alongamento');
      if (e.target.checked && !hasRemService) {
        bookingState.selectedServices.push('remocao_alongamento');
      } else if (!e.target.checked && hasRemService) {
        const idx = bookingState.selectedServices.indexOf('remocao_alongamento');
        if (idx > -1) bookingState.selectedServices.splice(idx, 1);
      }
      renderServicesList(currentCategoryFilter);
      updateSummaryUI();
    });
  }

  if (notesInput) {
    notesInput.addEventListener('input', (e) => {
      bookingState.clientNotes = e.target.value;
    });
  }
}

// 7. ATUALIZAÇÃO DO RESUMO LATERAL (CART SUMMARY)
function updateSummaryUI() {
  const itemsContainer = document.getElementById('summary-items-container');
  const totalAmountEl = document.getElementById('summary-total-amount');
  const totalDurationEl = document.getElementById('summary-total-duration');
  const dateLineEl = document.getElementById('summary-date-line');
  const proLineEl = document.getElementById('summary-pro-line');
  const proceedBtn = document.getElementById('btn-proceed-step');

  if (!itemsContainer) return;

  const selectedObjects = SERVICES_DB.filter(s => bookingState.selectedServices.includes(s.id));

  if (selectedObjects.length === 0) {
    itemsContainer.innerHTML = `<p class="summary-empty-text">Nenhum serviço selecionado ainda. Escolha no catálogo ao lado.</p>`;
    if (totalAmountEl) totalAmountEl.textContent = 'R$ 0,00';
    if (totalDurationEl) totalDurationEl.textContent = '0 min';
  } else {
    itemsContainer.innerHTML = selectedObjects.map(item => `
      <div class="summary-item-row">
        <span class="summary-item-name">${item.name}</span>
        <span class="summary-item-price">R$ ${item.price},00</span>
      </div>
    `).join('');

    // Se houver customização do simulador
    if (bookingState.customDetails) {
      itemsContainer.innerHTML += `
        <div class="summary-item-row" style="color: var(--lilac-dark); font-size: 0.78rem;">
          <span>✨ Customizado: ${bookingState.customDetails.shape} / ${bookingState.customDetails.finish}</span>
          <span>Incluso</span>
        </div>
      `;
    }

    const totalVal = selectedObjects.reduce((acc, curr) => acc + curr.price, 0);
    const totalMinutes = selectedObjects.reduce((acc, curr) => acc + curr.durationMin, 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeFormatted = `${hours > 0 ? hours + 'h ' : ''}${mins > 0 ? mins + 'min' : ''}`;

    if (totalAmountEl) totalAmountEl.textContent = `R$ ${totalVal},00`;
    if (totalDurationEl) totalDurationEl.textContent = `Duração estimada: ${timeFormatted}`;
  }

  // Atualizar data/horário no resumo
  if (dateLineEl) {
    if (bookingState.selectedDate && bookingState.selectedTime) {
      const [y, m, d] = bookingState.selectedDate.split('-');
      dateLineEl.innerHTML = `<i class="far fa-calendar-check"></i> <strong>${d}/${m}/${y} às ${bookingState.selectedTime}</strong>`;
    } else if (bookingState.selectedDate) {
      const [y, m, d] = bookingState.selectedDate.split('-');
      dateLineEl.innerHTML = `<i class="far fa-calendar"></i> ${d}/${m}/${y} (Horário pendente)`;
    } else {
      dateLineEl.innerHTML = `<i class="far fa-calendar"></i> Data não selecionada`;
    }
  }

  // Atualizar profissional no resumo
  if (proLineEl) {
    proLineEl.innerHTML = `<i class="far fa-user"></i> ${bookingState.selectedPro.name}`;
  }

  // Botão Avançar
  if (proceedBtn) {
    if (bookingState.currentStep === 1) {
      proceedBtn.disabled = selectedObjects.length === 0;
      proceedBtn.innerHTML = `Continuar para Data & Horário <i class="fas fa-arrow-right"></i>`;
    } else if (bookingState.currentStep === 2) {
      proceedBtn.disabled = !bookingState.selectedDate || !bookingState.selectedTime;
      proceedBtn.innerHTML = `Continuar para Profissional <i class="fas fa-arrow-right"></i>`;
    } else if (bookingState.currentStep === 3) {
      proceedBtn.disabled = false;
      proceedBtn.innerHTML = `Continuar para Seus Dados <i class="fas fa-arrow-right"></i>`;
    } else if (bookingState.currentStep === 4) {
      proceedBtn.disabled = !bookingState.clientName || !bookingState.clientPhone || bookingState.clientPhone.length < 14;
      proceedBtn.innerHTML = `Revisar & Confirmar <i class="fas fa-check-circle"></i>`;
    } else if (bookingState.currentStep === 5) {
      proceedBtn.style.display = 'none';
    }
  }
}

// 8. CONTROLE DE ETAPAS (STEP WIZARD)
window.goToStep = function(stepNum) {
  // Validações antes de avançar
  if (stepNum > 1 && bookingState.selectedServices.length === 0) {
    window.BiStudio.showToast('Por favor, selecione ao menos 1 serviço!', 'fa-exclamation-circle');
    return;
  }
  if (stepNum > 2 && (!bookingState.selectedDate || !bookingState.selectedTime)) {
    window.BiStudio.showToast('Por favor, escolha uma data e horário!', 'fa-clock');
    return;
  }
  if (stepNum > 4 && (!bookingState.clientName || !bookingState.clientPhone)) {
    window.BiStudio.showToast('Por favor, preencha seu nome e WhatsApp!', 'fa-user-edit');
    return;
  }

  bookingState.currentStep = stepNum;
  updateStepVisibility();
  updateSummaryUI();

  // Se chegou no passo 5, renderizar voucher final
  if (stepNum === 5) {
    renderFinalVoucher();
  }

  window.scrollTo({ top: 120, behavior: 'smooth' });
};

window.nextStep = function() {
  goToStep(bookingState.currentStep + 1);
};

window.prevStep = function() {
  if (bookingState.currentStep > 1) {
    goToStep(bookingState.currentStep - 1);
  }
};

function updateStepVisibility() {
  // Ocultar todas as seções e mostrar a atual
  document.querySelectorAll('.step-section').forEach(sec => sec.classList.remove('active'));
  const currentSec = document.getElementById(`step-section-${bookingState.currentStep}`);
  if (currentSec) currentSec.classList.add('active');

  // Atualizar barra de progresso no topo
  document.querySelectorAll('.step-indicator').forEach(ind => {
    const s = parseInt(ind.dataset.step);
    ind.classList.remove('active', 'completed');
    if (s === bookingState.currentStep) {
      ind.classList.add('active');
    } else if (s < bookingState.currentStep) {
      ind.classList.add('completed');
    }
  });

  const prevBtn = document.getElementById('btn-prev-step');
  if (prevBtn) {
    prevBtn.style.display = bookingState.currentStep > 1 && bookingState.currentStep < 5 ? 'block' : 'none';
  }
}

// 9. VOUCHER FINAL & ENVIO DO WHATSAPP
function renderFinalVoucher() {
  const selectedObjects = SERVICES_DB.filter(s => bookingState.selectedServices.includes(s.id));
  const totalVal = selectedObjects.reduce((acc, curr) => acc + curr.price, 0);
  const totalMinutes = selectedObjects.reduce((acc, curr) => acc + curr.durationMin, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeFormatted = `${hours > 0 ? hours + 'h ' : ''}${mins > 0 ? mins + 'min' : ''}`;

  const [y, m, d] = bookingState.selectedDate.split('-');
  const formattedDate = `${d}/${m}/${y}`;

  // Preencher elementos do voucher
  document.getElementById('voucher-client-name').textContent = bookingState.clientName;
  document.getElementById('voucher-client-phone').textContent = bookingState.clientPhone;
  document.getElementById('voucher-date-time').textContent = `${formattedDate} às ${bookingState.selectedTime}`;
  document.getElementById('voucher-pro-name').textContent = bookingState.selectedPro.name;
  document.getElementById('voucher-total-val').textContent = `R$ ${totalVal},00 (${timeFormatted})`;

  const srvListEl = document.getElementById('voucher-services-list');
  if (srvListEl) {
    srvListEl.innerHTML = selectedObjects.map(s => `<li>${s.name} (R$ ${s.price},00)</li>`).join('');
    if (bookingState.customDetails) {
      srvListEl.innerHTML += `<li>✨ Personalização: ${bookingState.customDetails.shape} / ${bookingState.customDetails.finish}</li>`;
    }
  }

  // Configurar Link do WhatsApp com mensagem pronta
  const whatsappBtn = document.getElementById('btn-send-whatsapp');
  if (whatsappBtn) {
    const srvNames = selectedObjects.map(s => s.name).join(', ');
    const msg = `Olá Beatriz! ✨ Gostaria de confirmar meu agendamento no *BI Unhas Studio*:\n\n` +
      `👤 *Cliente:* ${bookingState.clientName}\n` +
      `📱 *Telefone:* ${bookingState.clientPhone}\n` +
      `💅 *Serviços:* ${srvNames}\n` +
      (bookingState.customDetails ? `🎨 *Estilo:* ${bookingState.customDetails.shape} (${bookingState.customDetails.finish})\n` : '') +
      `📅 *Data:* ${formattedDate}\n` +
      `⏰ *Horário:* ${bookingState.selectedTime}\n` +
      `👩‍🎨 *Profissional:* ${bookingState.selectedPro.name}\n` +
      `💰 *Total Estimado:* R$ ${totalVal},00 (~${timeFormatted})\n` +
      (bookingState.hasOldNails ? `⚠️ *Possui unhas antigas para remoção:* Sim\n` : '') +
      (bookingState.clientNotes ? `📝 *Observação:* ${bookingState.clientNotes}\n` : '') +
      `\nPoderia confirmar a disponibilidade deste horário para mim? Muito obrigada! 💖`;

    const encoded = encodeURIComponent(msg);
    whatsappBtn.href = `https://wa.me/5511913028504?text=${encoded}`;
  }

  // Configurar Link do Google Calendar
  const gcalBtn = document.getElementById('btn-add-gcal');
  if (gcalBtn) {
    const startIso = `${bookingState.selectedDate.replace(/-/g, '')}T${bookingState.selectedTime.replace(':', '')}00`;
    const endMinutes = parseInt(bookingState.selectedTime.split(':')[0]) * 60 + parseInt(bookingState.selectedTime.split(':')[1]) + totalMinutes;
    const endH = String(Math.floor(endMinutes / 60)).padStart(2, '0');
    const endM = String(endMinutes % 60).padStart(2, '0');
    const endIso = `${bookingState.selectedDate.replace(/-/g, '')}T${endH}${endM}00`;

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Horário BI Unhas Studio 💅')}&dates=${startIso}/${endIso}&details=${encodeURIComponent('Agendamento no BI Unhas Studio. R. Padre José de Anchieta, 514 - Santo Amaro.')}&location=${encodeURIComponent('R. Padre José de Anchieta, 514 - Santo Amaro, São Paulo')}`;
    gcalBtn.href = gcalUrl;
  }
}
