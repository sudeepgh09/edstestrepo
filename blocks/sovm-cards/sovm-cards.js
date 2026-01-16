export default function decorate(block) {
  console.log('SOVM decorate running');

  // ---------- GET BLOCK PROPERTIES ----------
  const grid = block.dataset.grid || 'grid-3';
  const bg = block.dataset.cardBackground || 'card-white';

  // ---------- GET CARD ITEM DATA ----------
  // Assume each card item is a child of the block
  const cardItems = [...block.querySelectorAll('.sovm-card-item')];
  console.log(cardItems);

  // ---------- CLEAR BLOCK CONTENT ----------
  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';
  wrapper.classList.add(grid, bg);
  block.innerHTML = '';
  block.append(wrapper);

  // ---------- LOOP THROUGH EACH CARD ----------
  cardItems.forEach((item) => {
    const imgSrc = item.dataset.image || '';
    const title = item.dataset.title || '';
    const text = item.dataset.text || '';
    const ctaText = item.dataset.ctatext || '';
    const svgPath = item.dataset.svgpath || '';
    const svgText = item.dataset.svgtext || '';

    const hasImage = imgSrc.trim() !== '';

    // Card container
    const card = document.createElement('div');
    card.className = `sovm-card ${hasImage ? 'has-image' : 'no-image'}`;

    // Image
    if (hasImage) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'sovm-card-image';
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = title;
      imgWrap.append(img);
      card.append(imgWrap);
    }

    // Content
    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    // Title
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      content.append(h3);
    }

    // Description
    if (text) {
      const p = document.createElement('p');
      p.textContent = text;
      content.append(p);
    }

    // CTA Button
    if (ctaText) {
      const a = document.createElement('a');
      a.className = 'sovm-btn';
      a.href = '#';
      a.textContent = ctaText;
      content.append(a);
    }

    // SVG (optional)
    if (svgPath && svgText) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${svgPath}#${svgText}`);
      svg.appendChild(use);
      content.append(svg);
    }

    card.append(content);
    wrapper.append(card);
  });
}
