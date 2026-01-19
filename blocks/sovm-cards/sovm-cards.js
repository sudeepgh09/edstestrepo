function buildPictureTag(src, alt = '') {
  return `
    <picture>
      <source srcset="${src}" type="image/webp">
      <img src="${src}" alt="${alt}">
    </picture>
  `;
}

function extractReferenceUrl(html) {
  if (!html) return '';

  const temp = document.createElement('div');
  temp.innerHTML = html;

  const a = temp.querySelector('a');
  if (a) return a.getAttribute('href');

  const img = temp.querySelector('img');
  if (img) return img.getAttribute('src');

  return html.trim();
}

export default function decorate(block) {
  const section = block.closest('.section');

  const grid = section?.dataset.grid || '';
  const background = section?.dataset.cardBackground || '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';
  if (background) wrapper.classList.add(background);
  
  if (grid && grid !== 'no-grid') {
  wrapper.classList.add(grid);
} else {
  wrapper.classList.add('no-grid');
}


  const items = [...block.children];

  items.forEach((item) => {
    const cols = [...item.children].map((c) => c.innerHTML.trim());

    const [
      image,
      title,
      text,
      ctatext,
      ctalink,
      rawSvgPath,
      svgtext,
    ] = cols;

    const card = document.createElement('div');
    card.className = 'sovm-card';

    // ----------- CARD IMAGE (PICTURE TAG ONLY HERE) -----------
    if (image) {
      const imgSrc = extractReferenceUrl(image);

      if (imgSrc) {
        card.innerHTML += `
          <div class="sovm-card-image">
            ${buildPictureTag(imgSrc, title || '')}
          </div>
        `;
      }
    }

    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    if (title) {
      content.innerHTML += `<h3>${title}</h3>`;
    }

    if (text) {
      content.innerHTML += `<p>${text}</p>`;
    }

    // ----------- CTA BUTTON -----------
    if (ctatext) {
      const link = extractReferenceUrl(ctalink) || '#';

      content.innerHTML += `
        <a class="sovm-btn" href="${link}">
          ${ctatext}
        </a>
      `;
    }

    // ----------- ICON SECTION (NO PICTURE TAG HERE) -----------

    const svgpath = extractReferenceUrl(rawSvgPath);

    if (svgpath && svgtext) {
      const cleanPath = svgpath.split('?')[0];

      content.innerHTML += `
        <a target="_blank"
           aria-label="${svgtext} (opens in a new window)">
          <svg class="icon">
            <use xlink:href="${cleanPath}#${svgtext}"></use>
          </svg>
          <span class="text">${svgtext}</span>
        </a>
      `;
    }

    card.appendChild(content);
    wrapper.appendChild(card);
  });

  block.replaceChildren(wrapper);
}
