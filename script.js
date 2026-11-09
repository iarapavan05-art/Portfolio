const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    menuButton.textContent = isOpen ? '×' : '☰';
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      menuButton.textContent = '☰';
    }
  });
}

document.querySelectorAll('[data-open]').forEach((button) => {
  const dialog = document.getElementById(button.dataset.open);
  if (dialog) button.addEventListener('click', () => dialog.showModal());
});

document.querySelectorAll('dialog').forEach((dialog) => {
  const closeButton = dialog.querySelector('[data-close]');
  if (closeButton) closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const themeButton = document.querySelector('.theme-btn');
const root = document.documentElement;
function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeButton) {
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    themeButton.textContent = theme === 'dark' ? '☼' : '◐';
  }
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0c2340' : '#f6f2ea');
}
if (themeButton) {
  themeButton.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', nextTheme); } catch (_) {}
    applyTheme(nextTheme);
  });
}
applyTheme(root.dataset.theme || 'light');
