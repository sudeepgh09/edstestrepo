export default function decorate(block) {
  // Configuration values that should NOT be rendered as text
  const configValues = [
    'card-small',
    'card-large',
    'card-button-header',
    'card-button-body',
  ];

  // Extract configuration from block content
  let size = null;
  let style = null;

  // Find all text nodes and check for config values
  const blockText = block.textContent;
  configValues.forEach((config) => {
    if (blockText.includes(config)) {
      if (config.startsWith('card-small') || config.startsWith('card-large')) {
        size = config;
      } else if (config.startsWith('card-button-')) {
        style = config;
      }
    }
  });

  // Find content by type from entire block
  const imageElement = block.querySelector('picture') || block.querySelector('img');
  const allLinks = [...block.querySelectorAll('a')];
  const buttonLink = allLinks.length > 0 ? allLinks[allLinks.length - 1] : null;

  // Find title - first heading or first strong/bold text
  const titleElement = block.querySelector('h1, h2, h3, h4, h5, h6');
  let titleText = titleElement ? titleElement.textContent.trim() : null;

  // Find description - paragraph or div with text (not config values)
  let descriptionHtml = null;
  const paragraphs = [...block.querySelectorAll('p')];
  paragraphs.forEach((p) => {
    const text = p.textContent.trim();
    // Skip if it's a config value, empty, or contains only a link
    if (!configValues.includes(text) && text && !p.querySelector('a')) {
      if (!titleText) {
        titleText = text;
      } else if (!descriptionHtml) {
        descriptionHtml = p.innerHTML.trim();
      }
    }
  });

  // Clear block and build card
  block.innerHTML = '';

  /* ---------- CARD ---------- */
  const card = document.createElement('div');
  card.classList.add('sovmcards');

  // Apply configuration classes
  if (size) card.classList.add(size);
  if (style) card.classList.add(style);

  /* ---------- IMAGE (at top if exists) ---------- */
  if (imageElement) {
    const imageWrap = document.createElement('div');
    imageWrap.className = 'sovmcards-image';
    imageWrap.append(imageElement.cloneNode(true));
    card.append(imageWrap);
  }

  /* ---------- HEADER ---------- */
  const header = document.createElement('div');
  header.className = 'sovmcards-header';

  if (titleText) {
    const h2 = document.createElement('h2');
    h2.className = 'sovmcards-title';
    h2.textContent = titleText;
    header.append(h2);
  }

  // Button in header
  if (style === 'card-button-header' && buttonLink) {
    const btnWrap = document.createElement('div');
    btnWrap.className = 'sovmcards-button';
    btnWrap.append(buttonLink.cloneNode(true));
    header.append(btnWrap);
  }

  card.append(header);

  /* ---------- BODY ---------- */
  const hasDescription = descriptionHtml && descriptionHtml !== '';
  const hasBodyButton = style === 'card-button-body' && buttonLink;

  if (hasDescription || hasBodyButton) {
    const body = document.createElement('div');
    body.className = 'sovmcards-body';

    if (hasDescription) {
      const text = document.createElement('div');
      text.className = 'sovmcards-text';
      text.innerHTML = descriptionHtml;
      body.append(text);
    }

    if (hasBodyButton) {
      const btnWrap = document.createElement('div');
      btnWrap.className = 'sovmcards-button';
      btnWrap.append(buttonLink.cloneNode(true));
      body.append(btnWrap);
    }

    card.append(body);
  }

  block.append(card);
}
