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

  // Grid / No-grid logic
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

    // ----------- CARD IMAGE (ONLY PLACE USING PICTURE TAG) -----------
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

    // ----------- CTA BUTTON WITH OPTIONAL ICON INSIDE -----------
    if (ctatext) {
      const link = extractReferenceUrl(ctalink) || '#';

      let buttonHTML = `<a class="sovm-btn" href="${link}">`;

      const svgpath = extractReferenceUrl(rawSvgPath);

      // Add icon INSIDE button if present
      if (svgpath && svgtext) {
        const cleanPath = svgpath.split('?')[0];

        buttonHTML += `
          <svg class="icon">
            <use xlink:href="${cleanPath}#${svgtext}"></use>
          </svg>
        `;
      }

      // Add CTA text
      buttonHTML += `<span class="text">${ctatext}</span>`;

      buttonHTML += `</a>`;

      content.innerHTML += buttonHTML;
    }

    card.appendChild(content);
    wrapper.appendChild(card);
  });

  block.replaceChildren(wrapper);
}
