/**
 * ArmoryVault Modules Hub — Dynamic Client Application
 */

// Fallback catalog in case of CORS or local file:// protocol
const FALLBACK_CATALOG = {
  repository: "cook0001/ArmoryVault-Modules",
  version: "1.1.0",
  generatedAt: new Date().toISOString(),
  modules: {
    reloading: {
      id: "reloading",
      name: "Reloading Workbench",
      version: "1.0.0",
      category: "bench",
      description: "Precision metallic reloading component inventory with dynamic multi-unit powder conversions (grains, lbs, kg), multi-ingredient batch manufacturing deduction, and interactive charge ladder development.",
      dataKeys: ["components", "load_recipes", "load_ladder_tests"],
      sizeKb: "49.4 KB",
      filename: "module-reloading.zip",
      sha256: "a74431f67380457ef968c3dad3e701ca65906cdf668f2f86f7df9b73152268ed",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-reloading.zip"
    },
    maintenance: {
      id: "maintenance",
      name: "Armorer & Maintenance",
      version: "1.0.0",
      category: "armorer",
      description: "Round-count telemetry, scheduled maintenance intervals with dynamic 'Due Soon' thresholds, service parts ledger, and optic torque & zero specification registry.",
      dataKeys: ["custom_schedule_presets", "maintenance_logs"],
      sizeKb: "48.3 KB",
      filename: "module-maintenance.zip",
      sha256: "42f017bc38d9a3b29415a3c8dc3700564a0664bec0ee7c3cc000ec21fa8722a3",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-maintenance.zip"
    },
    ballistics: {
      id: "ballistics",
      name: "Ballistics Calculator",
      version: "1.0.0",
      category: "range",
      description: "Full aerodynamic exterior trajectory solver utilizing standard G1 and G7 ballistic coefficient drag models, density altitude compensation, bullet drop tables, and MOA/MRAD click charts.",
      dataKeys: ["ballistic_profiles"],
      sizeKb: "27.6 KB",
      filename: "module-ballistics.zip",
      sha256: "c30173982891e6a2add1d13ff4e323f5e07650bc3a5291ef35fc4a8e4f148886",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-ballistics.zip"
    },
    nfa: {
      id: "nfa",
      name: "NFA Compliance Tracker",
      version: "1.0.0",
      category: "compliance",
      description: "Dedicated tracking for ATF Form 1 (manufacture) and Form 4 (transfer) items, tax stamp document archives, trust vs. individual registration status, suppressor baffle wear, and CLEO notifications.",
      dataKeys: ["nfa_items"],
      sizeKb: "10.8 KB",
      filename: "module-nfa.zip",
      sha256: "25120f46ac973fa5aeb5c135b5428ef7b4a8f2175bfaea841223a7dff2e4c6f7",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-nfa.zip"
    },
    boundbook: {
      id: "boundbook",
      name: "ATF A&D Bound Book",
      version: "1.0.0",
      category: "compliance",
      description: "Curio & Relic (03 FFL) and commercial compliance ledger recording firearm acquisition, disposition dates, FFL numbers, and tamper-resistant audit logs adhering to 27 CFR Part 478.",
      dataKeys: ["bound_book_entries"],
      sizeKb: "11.7 KB",
      filename: "module-boundbook.zip",
      sha256: "1b2f295988736e498439ec0651ebaffc6347f066a63c736cf82fc9cf8b378ad6",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-boundbook.zip"
    },
    optics: {
      id: "optics",
      name: "Optics & Zero Vault",
      version: "1.0.0",
      category: "bench",
      description: "Dedicated registry for precision rifle scopes, red dots, LPVOs, and iron sights. Log reticle patterns, focal planes (FFP/SFP), zero distances, turret click adjustments (MRAD/MOA), mounting torque specs, and battery health.",
      dataKeys: ["optics_vault_inventory"],
      sizeKb: "11.9 KB",
      filename: "module-optics.zip",
      sha256: "e65ca325633068cb159a12c9fb05a9986dd35387d77de6b3aa6e2eb252422107",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-optics.zip"
    },
    ranges: {
      id: "ranges",
      name: "Shooting Range & Facility Finder",
      version: "1.0.0",
      category: "range",
      description: "Directory search across 2,539 verified shooting facilities, amenity filters (1,000+ yd, tactical bays, chrono), home range bookmarking, and lane fees.",
      dataKeys: ["saved_ranges"],
      sizeKb: "10.4 KB",
      filename: "module-ranges.zip",
      sha256: "c43386159e1c9dd1ecb9c4a124ba542a201e1284d8cf54f3a291eb713f42461e",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-ranges.zip"
    },
    labels: {
      id: "labels",
      name: "Batch Label & QR Print Studio",
      version: "1.0.0",
      category: "bench",
      description: "Batch prints vector QR codes and barcodes for ammo boxes, magazines, storage cans, and firearms across Avery sheets and continuous thermal rolls.",
      dataKeys: ["saved_label_templates"],
      sizeKb: "13.2 KB",
      filename: "module-labels.zip",
      sha256: "fb87d941c361277a82c87fa33e7b6639a18fa1a6c94639f489b9058c2b873438",
      downloadUrl: "https://github.com/cook0001/ArmoryVault-Modules/releases/download/v1.1.0/module-labels.zip"
    }
  }
};

let allModules = [];
let currentCategory = 'all';
let currentSearch = '';

// Category SVG Icons
function getCategoryIcon(category) {
  switch (category) {
    case 'bench':
      return `<div class="module-icon-box amber">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line></svg>
      </div>`;
    case 'armorer':
      return `<div class="module-icon-box cyan">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
      </div>`;
    case 'range':
      return `<div class="module-icon-box blue">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
      </div>`;
    case 'compliance':
      return `<div class="module-icon-box emerald">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </div>`;
    default:
      return `<div class="module-icon-box cyan">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </div>`;
  }
}

async function loadCatalog() {
  try {
    const res = await fetch('modules-index.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    processCatalogData(data);
  } catch (err) {
    console.warn('Falling back to embedded catalog definition:', err.message);
    processCatalogData(FALLBACK_CATALOG);
  }
}

function processCatalogData(catalog) {
  const mods = catalog.modules || {};
  allModules = Object.values(mods);
  renderModules();
}

function renderModules() {
  const grid = document.getElementById('modules-grid');
  if (!grid) return;

  const filtered = allModules.filter((mod) => {
    const matchesCat = currentCategory === 'all' || mod.category === currentCategory;
    const q = currentSearch.toLowerCase();
    const matchesSearch =
      mod.name.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      mod.id.toLowerCase().includes(q) ||
      (mod.dataKeys && mod.dataKeys.some((k) => k.toLowerCase().includes(q)));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-glass);">
        <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 8px;">No modules matched your search.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset Filter</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((mod) => {
      const tags = (mod.dataKeys || [])
        .map((k) => `<span class="tag-pill">${k}</span>`)
        .join('');

      return `
      <div class="module-card" id="card-${mod.id}">
        <div class="card-top">
          ${getCategoryIcon(mod.category)}
          <div class="card-badges">
            <span class="cat-badge">${mod.category}</span>
            <span class="version-pill">v${mod.version}</span>
          </div>
        </div>

        <h3 class="card-title">${mod.name}</h3>
        <p class="card-desc">${mod.description}</p>

        <div class="card-meta-row">
          <span>Package: <strong>${mod.sizeKb || '20 KB'}</strong></span>
          <span>Target: <strong>v2.9.0+</strong></span>
        </div>

        <div class="card-tags">
          ${tags}
        </div>

        <div class="card-actions">
          <a href="${mod.downloadUrl}" class="btn-download-mod" download title="Download official release ZIP">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download ZIP</span>
          </a>
          <button class="btn-checksum" onclick="copyChecksum('${mod.sha256}')" title="Copy SHA-256 Checksum">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>SHA-256</span>
          </button>
        </div>
      </div>
    `;
    })
    .join('');
}

function copyChecksum(sha256) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(sha256).then(() => {
      showToast(`Copied SHA-256 hash: ${sha256.substring(0, 16)}...`);
    });
  } else {
    showToast(`Hash: ${sha256.substring(0, 16)}...`);
  }
}

function showToast(message) {
  const existing = document.querySelector('.toast-notice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function resetFilters() {
  currentCategory = 'all';
  currentSearch = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.chip-btn').forEach((c) => {
    c.classList.toggle('active', c.dataset.cat === 'all');
  });
  renderModules();
}

document.addEventListener('DOMContentLoaded', () => {
  loadCatalog();

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderModules();
    });
  }

  // Category filter chips
  document.querySelectorAll('.chip-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderModules();
    });
  });
});
