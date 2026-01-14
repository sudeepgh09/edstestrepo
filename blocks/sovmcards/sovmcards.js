export default function decorate(block) {
  const rows = [...block.children];

  /* ===============================
     READ BLOCK-LEVEL CONFIG
  =============================== */
  const configRow = rows.shift();
  const configValues = [...configRow.querySelectorAll('p')].map((p) =>
    p.textContent.trim()
  );

  const grid = configValues.find((v) => v.startsWith('grid-'));
  const background = configValues.find((v) => v.startsWith('card-'));
  const layout = configValues.find((v) => v === 'image-text');

  block.innerHTML = '';
  if (grid) block.classList.add(grid);
  if (background) block.classList.add(background);
  if (layout) block.classList.add(layout);

  /* ===============================
     WRAPPER
  =============================== */
  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  /* ===============================
     CARDS LOOP
  =============================== */
  rows.forEach((row) => {
    const picture = row.querySelector('picture');
    const paragraphs = [...row.querySelectorAll('p')];
    const button = row.querySelector('a');

    const title = paragraphs.shift()?.textContent.trim();
    const description = paragraphs.shift()?.innerHTML;

    /* ===============================
       GRID-3 + IMAGE-TEXT CARD
    =============================== */
    if (grid === 'grid-3' && layout === 'image-text') {
      const card = document.createElement('article');
      card.className = 'sovm-card';

      if (!picture) card.classList.add('no-image');

      if (picture) {
        const imageWrap = document.createElement('div');
        imageWrap.className = 'sovm-card-image';
        imageWrap.append(picture.cloneNode(true));
        card.append(imageWrap);
      }

      const content = document.createElement('div');
      content.className = 'sovm-card-content';

      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title;
        content.append(h3);
      }

      if (description) {
        const p = document.createElement('p');
        p.innerHTML = description;
        content.append(p);
      }

      card.append(content);
      wrapper.append(card);
      return;
    }

    /* ===============================
       FALLBACK (OTHER VARIANTS)
    =============================== */
    const card = document.createElement('article');
    card.className = 'sovm-card';

    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      content.append(h3);
    }

    card.append(content);
    wrapper.append(card);
  });

  block.append(wrapper);
}
