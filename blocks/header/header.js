import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 768px)');

/* ================================
   Utility / Behavior Functions
================================ */

function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections
    .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

function closeOnEscape(e) {
  if (e.code !== 'Escape') return;
  const nav = document.getElementById('nav');
  if (!nav) return;
  const navSections = nav.querySelector('.nav-sections');
  if (!navSections) return;

  const expandedSection = navSections.querySelector('[aria-expanded="true"]');
  if (expandedSection && isDesktop.matches) {
    toggleAllNavSections(navSections);
    expandedSection.focus();
  } else if (!isDesktop.matches) {
    toggleMenu(nav, navSections);
    nav.querySelector('button')?.focus();
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const expandedSection = navSections.querySelector('[aria-expanded="true"]');
    if (expandedSection && isDesktop.matches) {
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  if (!focused || focused.className !== 'nav-drop') return;
  if (e.code === 'Enter' || e.code === 'Space') {
    const expanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement?.addEventListener('keydown', openOnKeydown);
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';

  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button?.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  const navDrops = navSections?.querySelectorAll('.nav-drop') || [];
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', '0');
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/* ================================
   Header Decorator
================================ */

export default async function decorate(block) {
  // load nav fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  // --- CREATE AUTHORABLE HEAD-TOP ---
  const headTop = document.createElement('div');
  headTop.className = 'head-top';
  headTop.textContent = 'Are you in crisis? Call or text 988';
  
  // Make it authorable in Universal Editor
  headTop.setAttribute('data-block-name', 'head-top-text');
  headTop.setAttribute('data-block-status', 'authorable');
  headTop.setAttribute('contenteditable', 'true');

  block.textContent = '';
  block.append(headTop);

  // --- CREATE NAV WRAPPER AND NAV ---
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  // append fragment children (brand, sections, tools)
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // assign grid classes
  ['brand', 'sections', 'tools'].forEach((cls, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${cls}`);
  });

  // cleanup brand link
  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand?.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container')?.classList.remove('button-container');
  }

  // nav sections: dropdown and click
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope > .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);

  nav.setAttribute('aria-expanded', 'false');
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  navWrapper.append(nav);
  block.append(navWrapper);

  // --- SET CSS VARIABLE FOR NAV OFFSET ---
  const headTopHeight = headTop.offsetHeight;
  document.documentElement.style.setProperty('--head-top-height', `${headTopHeight}px`);
}
