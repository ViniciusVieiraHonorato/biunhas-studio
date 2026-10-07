/**
 * BI UNHAS STUDIO — PORTFOLIO & INTERACTIVE FEATURES (PÁGINA 1)
 * Vitrine Instagram, Modal Lightbox, Simulador de Nail Art e Calculadora
 */

// Banco de Trabalhos do Portfólio / Instagram @biunhasstudio
const portfolioItems = [
  {
    id: 1,
    title: "Alongamento em Fibra de Vidro",
    category: "fibra",
    image: "assets/alongamento.jpg",
    likes: 428,
    comments: 34,
    price: "R$ 180,00",
    duration: "2h",
    tags: ["Fibra de Vidro", "Naturalidade", "Almond"],
    description: "Alongamento estruturado com fibra de vidro ultra fina. Curvatura C natural e resistência máxima para o dia a dia.",
    serviceKey: "fibra_aplicacao"
  },
  {
    id: 2,
    title: "Blindagem & Banho de Gel",
    category: "gel",
    image: "assets/banho_gel.jpg",
    likes: 312,
    comments: 19,
    price: "R$ 110,00",
    duration: "2h",
    tags: ["Banho de Gel", "Crescimento", "Brilho"],
    description: "Proteção cristalina sobre a unha natural. Impede quebras e descamações mantendo o esmalte perfeito por até 25 dias.",
    serviceKey: "banho_gel"
  },
  {
    id: 3,
    title: "Nail Art Francesinha & Pedraria",
    category: "art",
    image: "assets/nail_art.jpg",
    likes: 580,
    comments: 48,
    price: "R$ 140,00",
    duration: "2h15",
    tags: ["Nail Art", "Francesinha", "Cristais"],
    description: "Linhas ultrafinas feitas à mão livre com aplicação de cristais Swarovski para um brilho sofisticado e atemporal.",
    serviceKey: "nail_art_francesinha"
  },
  {
    id: 4,
    title: "Pedicure Spa & Esmaltação",
    category: "pes",
    image: "assets/pedicure.jpg",
    likes: 274,
    comments: 15,
    price: "R$ 45,00",
    duration: "1h",
    tags: ["Pedicure", "Spa dos Pés", "Cuticulagem"],
    description: "Cuidado relaxante profundo: esfoliação de açúcar e lavanda, cutilagem russa impecável e hidratação com óleos essenciais.",
    serviceKey: "pedicure_tradicional"
  },
  {
    id: 5,
    title: "Nude Minimalista Formato Almond",
    category: "fibra",
    image: "assets/nail_almond_minimal.jpg",
    likes: 645,
    comments: 52,
    price: "R$ 180,00",
    duration: "2h",
    tags: ["Almond", "Nude Chic", "Tendência"],
    description: "Formato Almond moderno com esmaltação nude acetinada perolada. Elegância pura que alonga os dedos.",
    serviceKey: "fibra_aplicacao"
  },
  {
    id: 6,
    title: "Baby Boomer com Efeito Ombré",
    category: "art",
    image: "assets/nail_babyboomer.jpg",
    likes: 720,
    comments: 63,
    price: "R$ 150,00",
    duration: "2h10",
    tags: ["Baby Boomer", "Degradê", "Delicada"],
    description: "Transição suave e esfumada do branco puro ao rosa translúcido. A favorita das noivas e formandas.",
    serviceKey: "nail_art_francesinha"
  },
  {
    id: 7,
    title: "Vermelho Clássico Impecável",
    category: "gel",
    image: "assets/nail_red_glam.jpg",
    likes: 490,
    comments: 38,
    price: "R$ 110,00",
    duration: "1h40",
    tags: ["Vermelho Diva", "Esmaltação em Gel", "Chic"],
    description: "Pigmento vermelho de alta cobertura com finalizador glass top coat que não risca nem perde o brilho.",
    serviceKey: "banho_gel"
  },
  {
    id: 8,
    title: "Glazed Donut Perolado (Hailey Bieber)",
    category: "art",
    image: "assets/nail_soft_pink.jpg",
    likes: 830,
    comments: 87,
    price: "R$ 160,00",
    duration: "2h",
    tags: ["Glazed Donut", "Cromado", "Viral"],
    description: "Pó cromado iridescente aplicado sobre base nude translúcida com reflexos mágicos de luz natural.",
    serviceKey: "nail_art_encapsulada"
  },
  {
    id: 9,
    title: "Design de Sobrancelhas com Henna",
    category: "pes",
    image: "assets/design_olhar.jpg",
    likes: 310,
    comments: 22,
    price: "R$ 45,00",
    duration: "1h",
    tags: ["Design Olhar", "Henna", "Visagismo"],
    description: "Mapeamento geométrico facial para realçar seu olhar de forma harmônica, suave e natural.",
    serviceKey: "design_henna"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioGrid('all');
  initPortfolioFilters();
  initSimulator();
  initMaintenanceCalculator();
  initModalLightbox();
});

// 1. Renderizar Grid do Portfólio
function renderPortfolioGrid(category = 'all') {
  const gridContainer = document.getElementById('portfolio-grid-container');
  if (!gridContainer) return;

  const filtered = category === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === category);

  gridContainer.innerHTML = filtered.map(item => `
    <article class="portfolio-card" data-category="${item.category}">
      <div class="portfolio-media-wrapper">
        <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy">
        <div class="portfolio-overlay">
          <span class="overlay-top-badge"><i class="fas fa-gem"></i> ${item.tags[0]}</span>
          <div class="overlay-bottom-content">
            <div class="overlay-stats">
              <span><i class="fas fa-heart"></i> ${item.likes}</span>
              <span><i class="fas fa-comment"></i> ${item.comments}</span>
            </div>
            <div class="overlay-actions-row">
              <button class="btn-overlay-zoom" onclick="openPhotoModal(${item.id})" title="Ver Detalhes">
                <i class="fas fa-expand-alt"></i>
              </button>
              <a href="agenda.html?service=${item.serviceKey}" class="btn-overlay-book">
                Agendar Este Estilo ✨
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="portfolio-info">
        <div class="portfolio-title-row">
          <h4 class="portfolio-art-title">${item.title}</h4>
          <span class="portfolio-art-price">${item.price}</span>
        </div>
        <p class="portfolio-art-desc">${item.description}</p>
        <div class="portfolio-tags-row">
          ${item.tags.map(t => `<span class="art-tag">#${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

// 2. Filtros de Categoria do Portfólio
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderPortfolioGrid(cat);
    });
  });
}

// 3. Modal Lightbox de Foto
let currentModalItem = null;
function initModalLightbox() {
  const modal = document.getElementById('portfolio-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

function openPhotoModal(id) {
  const modal = document.getElementById('portfolio-modal');
  const item = portfolioItems.find(p => p.id === id);
  if (!modal || !item) return;

  currentModalItem = item;
  document.getElementById('modal-img').src = item.image;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-desc').textContent = item.description;
  document.getElementById('modal-price').textContent = `${item.price} • Duração: ${item.duration}`;
  document.getElementById('modal-book-btn').href = `agenda.html?service=${item.serviceKey}`;

  const tagsContainer = document.getElementById('modal-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = item.tags.map(t => `<span class="art-tag">#${t}</span>`).join(' ');
  }

  modal.classList.add('active');
}

// 4. SIMULADOR INTERATIVO DE NAIL ART & ORÇAMENTO
let simState = {
  shape: 'almond',
  shapeName: 'Almond (Amendoada)',
  shapeExtra: 0,
  length: 'media',
  lengthName: 'Média Clássica',
  lengthExtra: 0,
  finish: 'french',
  finishName: 'Francesinha Moderna',
  finishPrice: 30,
  baseService: 180, // Fibra
  baseTime: 120, // 2h
  spaExtra: false
};

function initSimulator() {
  const shapeOptions = document.querySelectorAll('.shape-opt');
  const lengthOptions = document.querySelectorAll('.length-opt');
  const finishOptions = document.querySelectorAll('.finish-opt');
  const spaCheck = document.getElementById('sim-spa-extra');

  shapeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      shapeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      simState.shape = opt.dataset.shape;
      simState.shapeName = opt.dataset.name;
      updateSimulatorUI();
    });
  });

  lengthOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      lengthOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      simState.length = opt.dataset.length;
      simState.lengthName = opt.dataset.name;
      simState.lengthExtra = parseInt(opt.dataset.extra || 0);
      updateSimulatorUI();
    });
  });

  finishOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      finishOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      simState.finish = opt.dataset.finish;
      simState.finishName = opt.dataset.name;
      simState.finishPrice = parseInt(opt.dataset.price || 0);
      updateSimulatorUI();
    });
  });

  if (spaCheck) {
    spaCheck.addEventListener('change', () => {
      simState.spaExtra = spaCheck.checked;
      updateSimulatorUI();
    });
  }

  updateSimulatorUI();
}

function updateSimulatorUI() {
  const nailPlate = document.getElementById('sim-nail-plate');
  const priceDisplay = document.getElementById('sim-total-price');
  const timeDisplay = document.getElementById('sim-total-time');
  const summaryText = document.getElementById('sim-selection-summary');
  const bookBtn = document.getElementById('sim-book-link');

  if (!nailPlate) return;

  // Atualizar classes visuais da unha estilizada
  nailPlate.className = 'nail-plate';
  nailPlate.classList.add(`shape-${simState.shape}`);
  nailPlate.classList.add(`finish-${simState.finish}`);

  // Ajuste de altura conforme comprimento
  if (simState.length === 'curta') {
    nailPlate.style.height = '65px';
    nailPlate.style.top = '22px';
  } else if (simState.length === 'media') {
    nailPlate.style.height = '85px';
    nailPlate.style.top = '10px';
  } else if (simState.length === 'longa') {
    nailPlate.style.height = '105px';
    nailPlate.style.top = '-5px';
  } else if (simState.length === 'extralonga') {
    nailPlate.style.height = '125px';
    nailPlate.style.top = '-20px';
  }

  // Cálculos de valor e tempo
  let totalPrice = simState.baseService + simState.shapeExtra + simState.lengthExtra + simState.finishPrice;
  let totalMinutes = simState.baseTime;

  if (simState.spaExtra) {
    totalPrice += 35;
    totalMinutes += 20;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeStr = `${hours}h ${minutes > 0 ? minutes + 'min' : ''}`;

  if (priceDisplay) priceDisplay.textContent = `R$ ${totalPrice},00`;
  if (timeDisplay) timeDisplay.textContent = `Tempo estimado: ${timeStr}`;
  if (summaryText) {
    summaryText.textContent = `${simState.shapeName} • ${simState.lengthName} • ${simState.finishName}${simState.spaExtra ? ' + Spa Cutículas' : ''}`;
  }

  // Atualizar Link com parâmetros para preencher a Agenda
  if (bookBtn) {
    const query = new URLSearchParams({
      service: 'fibra_aplicacao',
      customShape: simState.shapeName,
      customLength: simState.lengthName,
      customFinish: simState.finishName,
      customPrice: totalPrice,
      spaExtra: simState.spaExtra ? '1' : '0'
    }).toString();
    bookBtn.href = `agenda.html?${query}`;
  }
}

// 5. CALCULADORA DE MANUTENÇÃO INTELIGENTE
function initMaintenanceCalculator() {
  const calcBtn = document.getElementById('calc-maintenance-btn');
  const dateInput = document.getElementById('last-service-date');
  const resultBox = document.getElementById('maintenance-result-box');
  const resultDate = document.getElementById('maintenance-date-target');

  // Definir data padrão de hoje
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  if (calcBtn && dateInput && resultBox && resultDate) {
    calcBtn.addEventListener('click', () => {
      const selectedVal = dateInput.value;
      if (!selectedVal) {
        window.BiStudio.showToast('Por favor, selecione uma data válida!', 'fa-calendar-times');
        return;
      }

      const baseDate = new Date(selectedVal + 'T12:00:00');
      // Adicionar 24 dias (intervalo de ouro 21-28 dias)
      const idealDate = new Date(baseDate);
      idealDate.setDate(idealDate.getDate() + 24);

      // Se cair em domingo ou segunda, joga para terça-feira (estúdio aberto)
      const dayOfWeek = idealDate.getDay();
      if (dayOfWeek === 0) idealDate.setDate(idealDate.getDate() + 2); // Domingo -> Terça
      if (dayOfWeek === 1) idealDate.setDate(idealDate.getDate() + 1); // Segunda -> Terça

      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const formatted = idealDate.toLocaleDateString('pt-BR', options);

      resultDate.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      resultBox.style.display = 'block';

      window.BiStudio.showToast('Data ideal de manutenção calculada!', 'fa-sparkles');
    });
  }
}
