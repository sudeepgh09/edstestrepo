/* global svgxuse */

export default function decorate(block) {
  const isGrid3 = block.classList.contains('grid-3');
  const isWhite = block.classList.contains('card-white');
  const isDark = block.classList.contains('card-darkgrey');

  const items = [...block.children];
  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  if (isGrid3) {
    wrapper.classList.add('sovm-cards-grid');
  }

  items.forEach((item) => {
    const picture = item.querySelector('picture');
    const title = item.querySelector('h1, h2, h3, h4, h5, h6');
    const paragraphs = [...item.querySelectorAll('p')];
    const link = item.querySelector('a');

    const svgPath = item.querySelector('[data-svgpath]')?.dataset.svgpath
      || item.querySelector('.svgpath')?.textContent?.trim();
    const svgIcon = item.querySelector('[data-svgtext]')?.dataset.svgtext
      || item.querySelector('.svgtext')?.textContent?.trim();

    const hasImage = !!picture;

    const card = document.createElement('article');
    card.className = 'sovm-card';

    if (!hasImage) {
      card.classList.add('no-image');
    }

    /* ---------- IMAGE ---------- */
    if (hasImage) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'sovm-card-image';
      imgWrap.append(picture);
      card.append(imgWrap);
    }

    /* ---------- CONTENT ---------- */
    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      content.append(h3);
    }

    // if (paragraphs.length > 0 && (isGrid3 || hasImage)) {
    //   const desc = document.createElement('p');
    //   desc.innerHTML = paragraphs[0].innerHTML;
    //   content.append(desc);
    // }

    if (paragraphs.length > 0) {
  const desc = document.createElement('p');
  desc.innerHTML = paragraphs[0].innerHTML;
  content.append(desc);
}


    console.log({
  isGrid3,
  hasImage,
  paragraphs: paragraphs.length,
});

    /* ---------- BUTTON ---------- */
    if (link) {
      const btn = document.createElement('a');
      btn.href = link.href;
      btn.className = 'sovm-btn';
      btn.textContent = link.textContent;

      if (svgPath && svgIcon) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('sovm-btn-icon');

        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href',
          `${svgPath}#${svgIcon}`
        );

        svg.append(use);
        btn.append(svg);
      }

      content.append(btn);
    }

    card.append(content);
    wrapper.append(card);
  });

  /* ---------- BACKGROUND MODIFIERS ---------- */
  if (isWhite) wrapper.classList.add('card-white');
  if (isDark) wrapper.classList.add('card-darkgrey');

  block.append(wrapper);

  /* Ensure svgxuse runs */
  if (window.svgxuse) {
    window.svgxuse();
  }
}


console.log("Whooooo!!!");