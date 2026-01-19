function buildPictureTag(src, alt = '') {
  return `
    <picture>
      <source srcset="${src}" type="image/webp">
      <img src="${src}" alt="${alt}">
    </picture>
  `;
}

export default function decorate(block) {
  const section = block.closest('.section');

  const grid = section?.dataset.grid || '';
  const background = section?.dataset.cardBackground || '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  if (grid) wrapper.classList.add(grid);
  if (background) wrapper.classList.add(background);

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

    let svgpath = rawSvgPath;

    if (svgpath.includes('<a')) {
      const temp = document.createElement('div');
      temp.innerHTML = svgpath;
      const a = temp.querySelector('a');
      svgpath = a?.getAttribute('href') || '';
    }

    const card = document.createElement('div');
    card.className = 'sovm-card';

    if (image) {
      card.innerHTML += `
        <div class="sovm-card-image">
          ${buildPictureTag(image, title || '')}
        </div>
      `;
    }

    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    if (title) content.innerHTML += `<h3>${title}</h3>`;

    if (text) content.innerHTML += `<p>${text}</p>`;

    // UPDATED CTA LOGIC WITH LINK
    if (ctatext) {
      const href = ctalink || '#';

      content.innerHTML += `
        <a href="${href}" class="sovm-btn">
          ${ctatext}
        </a>
      `;
    }

    if (svgpath && svgtext) {
      content.innerHTML += `
        <span class="sovm-icon">
          <svg class="icon">
            <use xlink:href="${svgpath}#${svgtext}"></use>
          </svg>
        </span>
      `;
    }

    card.appendChild(content);
    wrapper.appendChild(card);
  });

  block.replaceChildren(wrapper);
}
