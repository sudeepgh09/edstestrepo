export default function decorate(block) {
  /* ---------------- CONFIG ---------------- */
  const configValues = [
    'card-small',
    'card-large',
    'card-button-header',
    'card-button-body',
  ];

  let size = null;
  let style = null;

  const blockText = block.textContent;
  configValues.forEach((config) => {
    if (blockText.includes(config)) {
      if (config.startsWith('card-') && !config.includes('button')) {
        size = config;
      } else if (config.startsWith('card-button')) {
        style = config;
      }
    }
  });

  /* --------- EXTRACT ELEMENTS (BEFORE CLEAR) --------- */
  const imageElement = block.querySelector('picture');
  const buttonAnchor = buildAnchorWithIcon(block);

  const titleEl = block.querySelector('h1,h2,h3,h4,h5,h6');
  const titleText = titleEl?.textContent?.trim();

  let descriptionHtml = null;
  [...block.querySelectorAll('p')].forEach((p) => {
    const txt = p.textContent.trim();
    if (
      txt &&
      !configValues.includes(txt) &&
      !p.querySelector('a') &&
      !descriptionHtml
    ) {
      descriptionHtml = p.innerHTML.trim();
    }
  });

  /* --------- CLEAR BLOCK --------- */
  block.innerHTML = '';

  /* --------- CARD ROOT --------- */
  const card = document.createElement('div');
  card.classList.add('sovmcards');
  if (size) card.classList.add(size);
  if (style) card.classList.add(style);

  /* --------- IMAGE --------- */
  if (imageElement) {
    card.classList.add('has-image');
    const imageWrap = document.createElement('div');
    imageWrap.className = 'sovmcards-image';
    imageWrap.append(imageElement.cloneNode(true));
    card.append(imageWrap);
  } else {
    card.classList.add('no-image');
  }

  /* --------- HEADER --------- */
  const header = document.createElement('div');
  header.className = 'sovmcards-header';

  if (titleText) {
    const h2 = document.createElement('h2');
    h2.className = 'sovmcards-title';
    h2.textContent = titleText;
    header.append(h2);
  }

  if (style === 'card-button-header' && buttonAnchor) {
    const btnWrap = document.createElement('div');
    btnWrap.className = 'sovmcards-button';
    btnWrap.append(buttonAnchor);
    header.append(btnWrap);
  }

  card.append(header);

  /* --------- BODY --------- */
  if (descriptionHtml || (style === 'card-button-body' && buttonAnchor)) {
    const body = document.createElement('div');
    body.className = 'sovmcards-body';

    if (descriptionHtml) {
      const text = document.createElement('div');
      text.className = 'sovmcards-text';
      text.innerHTML = descriptionHtml;
      body.append(text);
    }

    if (style === 'card-button-body' && buttonAnchor) {
      const btnWrap = document.createElement('div');
      btnWrap.className = 'sovmcards-button';
      btnWrap.append(buttonAnchor);
      body.append(btnWrap);
    }

    card.append(body);
  }

  block.append(card);
}

/* ---------- Helper ---------- */
function buildAnchorWithIcon(block) {
  const paragraph = block.children[0]?.querySelector('p');
  const link = block.querySelector('a');
  if (!link) return null;

  const iconName = block.querySelectorAll('p')[1]?.textContent?.trim();
  const iconPath = block.querySelector('picture img')?.getAttribute('src');

  const anchor = document.createElement('a');
  anchor.href = link.getAttribute('href');
  anchor.className = 'anchor-menu-link';

  const span = document.createElement('span');
  span.className = 'anchor-menu-text';
  span.textContent = paragraph?.textContent?.trim() || '';
  anchor.append(span);

  if (iconName && iconPath) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `${iconPath}?#${iconName}`
    );
    svg.append(use);
    anchor.append(svg);
  }

  return anchor;
}
