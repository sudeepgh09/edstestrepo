export default function decorate(block) {
  console.log('SOVM Cards – Full Property Based Decorate Running');

  // ===== READ BLOCK LEVEL PROPERTIES =====
  const grid = block.dataset.grid;
  const bg = block.dataset.cardBackground;

  const wrapper = block.closest('.sovm-cards-wrapper');

  if (!wrapper) return;

  // Clear existing structure
  wrapper.innerHTML = '';

  // Apply block level classes
  if (bg) wrapper.classList.add(bg);
  if (grid) wrapper.classList.add(grid);

  // ===== PROCESS EACH CARD ITEM =====

  const cardItems = [...block.querySelectorAll('.sovm-card')];

  cardItems.forEach((item) => {

    const {
      image,
      title,
      text,
      ctatext,
      svgpath,
      svgtext
    } = item.dataset;

    const card = document.createElement('div');
    card.className = 'sovm-card';

    const hasImage = image && image.trim() !== '';

    card.classList.add(hasImage ? 'has-image' : 'no-image');

    // ----- IMAGE -----
    if (hasImage) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'sovm-card-image';

      const img = document.createElement('img');
      img.src = image;
      img.alt = title || '';

      imgWrap.append(img);
      card.append(imgWrap);
    }

    // ----- CONTENT -----
    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    // TITLE (as H3)
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      content.append(h3);
    }

    // DESCRIPTION
    if (text) {
      const p = document.createElement('p');
      p.innerHTML = text;
      content.append(p);
    }

    // CTA BUTTON
    if (ctatext) {
      const btn = document.createElement('a');
      btn.className = 'sovm-btn';
      btn.textContent = ctatext;
      btn.href = '#';

      content.append(btn);
    }

    // SVG ICON (OPTIONAL)
    if (svgpath && svgtext) {
      const icon = document.createElement('img');
      icon.src = svgpath;
      icon.alt = svgtext;
      icon.className = 'sovm-svg-icon';

      content.append(icon);
    }

    card.append(content);
    wrapper.append(card);
  });
}
