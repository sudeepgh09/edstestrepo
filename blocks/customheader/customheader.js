export default function decorate(block) {
  block.classList.add('custom-header');

  const rows = [...block.children];

  const header = document.createElement('header');
  header.className = 'custom-header__inner';

  /* ========== LOGO ========== */
  if (rows[0]) {
    const logoCells = rows[0].children;
    const logoImg = logoCells[0]?.querySelector('img');
    const logoLink = logoCells[1]?.textContent?.trim() || '/';

    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink;
    logoAnchor.className = 'custom-header__logo';

    if (logoImg) logoAnchor.append(logoImg);
    header.append(logoAnchor);
  }

  /* ========== HAMBURGER ========== */
  const hamburger = document.createElement('button');
  hamburger.className = 'custom-header__hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  hamburger.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });

  header.append(hamburger);

  /* ========== NAV ========== */
  if (rows[1]) {
    const nav = document.createElement('nav');
    nav.className = 'custom-header__nav';

    const ul = rows[1].querySelector('ul');
    if (ul) nav.append(ul);

    nav.querySelectorAll('li').forEach((li) => {
      const submenu = li.querySelector('ul');
      if (submenu) {
        li.classList.add('has-dropdown');
        li.setAttribute('aria-expanded', 'false');

        li.addEventListener('click', (e) => {
          e.stopPropagation();
          const expanded = li.getAttribute('aria-expanded') === 'true';
          closeAllDropdowns(nav);
          li.setAttribute('aria-expanded', (!expanded).toString());
        });
      }
    });

    header.append(nav);
  }

  /* ========== SOCIAL ICONS ========== */
  if (rows[2]) {
    const social = document.createElement('div');
    social.className = 'custom-header__social';

    const cells = [...rows[2].children];

    for (let i = 0; i < cells.length; i += 2) {
      const img = cells[i]?.querySelector('img');
      const link = cells[i + 1]?.textContent?.trim();

      if (img && link) {
        const a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.append(img);
        social.append(a);
      }
    }

    header.append(social);
  }

  block.innerHTML = '';
  block.append(header);
}

function closeAllDropdowns(nav) {
  nav.querySelectorAll('li[aria-expanded="true"]').forEach((li) => {
    li.setAttribute('aria-expanded', 'false');
  });
}
