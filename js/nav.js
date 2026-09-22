/**
 * nav.js — Inyector de navegación lateral
 * DevWeb Guide | Guía de Desarrollo Web para Telecomunicaciones
 *
 * Este script crea y inyecta la barra de navegación lateral de forma
 * dinámica en todas las páginas, detectando automáticamente la página
 * activa a partir de la URL.
 */

// ─── Definición de los elementos de navegación ───────────────────────────────
const NAV_ITEMS = [
  { href: 'index.html',                  label: 'Inicio',           icon: '🏠' },
  { group: 'Desarrollo Web' },
  { href: 'pages/html.html',             label: 'HTML',             icon: '🌐' },
  { href: 'pages/css.html',              label: 'CSS',              icon: '🎨' },
  { href: 'pages/javascript.html',       label: 'JavaScript',       icon: '⚡' },
  { href: 'pages/php.html',              label: 'PHP',              icon: '🐘' },
  { href: 'pages/mvc.html',              label: 'MVC',              icon: '🏗️' },
  { group: 'Base de Datos' },
  { href: 'pages/postgresql.html',       label: 'Base de Datos',    icon: '🗄️' },
  { href: 'pages/uml-db.html',           label: 'UML / ER',         icon: '📊' },
  { group: 'Herramientas y Prácticas' },
  { href: 'pages/devtools.html',         label: 'DevTools',         icon: '🔍' },
  { href: 'pages/seguridad.html',        label: 'Seguridad',        icon: '🔒' },
  { href: 'pages/buenas-practicas.html', label: 'Buenas Prácticas', icon: '✅' },
];

// ─── Utilidades ───────────────────────────────────────────────────────────────

/**
 * Detecta si estamos en una subpágina (dentro de /pages/) o en la raíz.
 * Devuelve el prefijo de ruta correcto para los hrefs.
 */
function getBasePath() {
  const path = window.location.pathname;
  // Si la URL contiene '/pages/', estamos en una subpágina
  if (path.includes('/pages/')) {
    return '../';
  }
  return '';
}

/**
 * Determina qué enlace debe marcarse como activo comparando la URL actual
 * con cada href del menú.
 */
function getActivePage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  return filename;
}

// ─── Constructor del sidebar ──────────────────────────────────────────────────

function buildSidebar() {
  const basePath    = getBasePath();
  const activePage  = getActivePage();

  /* ── Contenedor principal ── */
  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar';
  sidebar.id        = 'sidebar';

  /* ── Logo / cabecera ── */
  const logo = document.createElement('div');
  logo.className = 'sidebar-logo';
  logo.innerHTML = `
    <div class="logo-title">DevWeb Guide</div>
    <div class="logo-sub">Guía de Desarrollo Web</div>
  `;
  sidebar.appendChild(logo);

  /* ── Lista de enlaces ── */
  const ul = document.createElement('ul');
  ul.className = 'sidebar-nav';

  NAV_ITEMS.forEach(item => {
    const li = document.createElement('li');

    if (item.group) {
      li.className = 'nav-group-label';
      li.textContent = item.group;
      ul.appendChild(li);
      return;
    }

    let href;
    if (item.href === 'index.html') {
      href = basePath + 'index.html';
    } else {
      href = basePath + item.href;
    }
    const targetFile = item.href.split('/').pop();
    const isActive   = (targetFile === activePage);

    const a = document.createElement('a');
    a.href      = href;
    a.className = isActive ? 'active' : '';
    a.innerHTML = `<span class="nav-icon">${item.icon}</span> ${item.label}`;

    li.appendChild(a);
    ul.appendChild(li);
  });

  sidebar.appendChild(ul);

  /* ── Pie del sidebar ── */
  const footer = document.createElement('div');
  footer.className = 'sidebar-footer';
  footer.textContent = 'Serveis de Telecomunicacions';
  sidebar.appendChild(footer);

  return sidebar;
}

// ─── Botón hamburguesa (móvil) ────────────────────────────────────────────────

function buildMenuToggle() {
  const btn = document.createElement('button');
  btn.className    = 'menu-toggle';
  btn.id           = 'menuToggle';
  btn.textContent  = '☰';
  btn.setAttribute('aria-label', 'Abrir menú de navegación');
  return btn;
}

function buildOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id        = 'sidebarOverlay';
  return overlay;
}

// ─── Tabla de Contenidos (TOC) ────────────────────────────────────────────────

function buildTOC() {
  const content  = document.querySelector('.content');
  if (!content) return;

  const headings = Array.from(content.querySelectorAll('h2.section-title'));
  if (headings.length < 3) return;

  // Asignar IDs a cada encabezado
  headings.forEach(h => {
    if (!h.id) {
      const slug = h.textContent
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // eliminar acentos
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      h.id = slug;
    }
  });

  // Construir el elemento TOC
  const toc = document.createElement('nav');
  toc.className = 'toc';

  const title = document.createElement('div');
  title.className = 'toc-title';
  title.innerHTML = '📋 <span>Contenido</span> <span class="toc-toggle">▲</span>';
  title.style.cursor = 'pointer';
  toc.appendChild(title);

  const ol = document.createElement('ol');
  headings.forEach(h => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    ol.appendChild(li);
  });
  toc.appendChild(ol);

  title.addEventListener('click', () => {
    toc.classList.toggle('toc-collapsed');
    title.querySelector('.toc-toggle').textContent =
      toc.classList.contains('toc-collapsed') ? '▼' : '▲';
  });

  // Insertar después de .page-header o al inicio del contenido
  const pageHeader = content.querySelector('.page-header');
  if (pageHeader && pageHeader.nextSibling) {
    content.insertBefore(toc, pageHeader.nextSibling);
  } else {
    const firstH2 = content.querySelector('h2.section-title');
    if (firstH2) content.insertBefore(toc, firstH2);
    else content.prepend(toc);
  }
}

// ─── Inicialización ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = buildSidebar();
  const toggle  = buildMenuToggle();
  const overlay = buildOverlay();

  // Insertamos todo al comienzo del <body>
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(toggle,  document.body.firstChild);

  /* ── Lógica del menú hamburguesa ── */
  toggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
    const isOpen = sidebar.classList.contains('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  overlay.addEventListener('click', function () {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-expanded', 'false');
  });

  /* ── Cerrar sidebar al hacer clic en un enlace en móvil ── */
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        toggle.textContent = '☰';
      }
    });
  });

  buildTOC();
});
