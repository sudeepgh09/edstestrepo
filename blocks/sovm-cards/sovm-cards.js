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

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  // ----- LAYOUT CLASSES FROM SECTION -----

  if (section.classList.contains('grid-3')) {
    wrapper.classList.add('grid-3');
  } else {
    wrapper.classList.add('no-grid');
  }

  if (section.classList.contains('card-darkgrey')) {
    wrapper.classList.add('card-darkgrey');
  }

  if (section.classList.contains('card-white')) {
    wrapper.classList.add('card-white');
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

    // -------- IMAGE (ONLY REAL IMAGE GETS PICTURE TAG) --------
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

    // -------- CTA BUTTON WITH ICON INSIDE --------
    if (ctatext) {
      const link = extractReferenceUrl(ctalink) || '#';

      let iconMarkup = '';
      const svgpath = extractReferenceUrl(rawSvgPath);

      if (svgpath && svgtext) {
        const cleanPath = svgpath.split('?')[0];

        iconMarkup = `
          <svg class="icon">
            <use xlink:href="${cleanPath}#${svgtext}"></use>
          </svg>
        `;
      }

      content.innerHTML += `
        <a class="sovm-btn" href="${link}" target="_blank">
          ${iconMarkup}
          <span>${ctatext}</span>
        </a>
      `;
    }

    card.appendChild(content);
    wrapper.appendChild(card);
  });

  block.replaceChildren(wrapper);
}
