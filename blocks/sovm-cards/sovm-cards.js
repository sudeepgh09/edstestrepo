function mapRowsToObject(rows) {
  // eslint-disable-next-line max-len
  const [
    grid,
    background,
    image,
    alt,
    title,
    text,
    ctatext,
    svgpath,
    svgtext,
  ] = rows;

  return {
    grid: grid?.[0] || '',
    background: background?.[0] || '',
    image: image?.[0] || '',
    alt: alt?.[0] || '',
    title: title?.[0] || '',
    text: text?.[0] || '',
    ctatext: ctatext?.[0] || '',
    svgpath: svgpath?.[0] || '',
    svgtext: svgtext?.[0] || '',
  };
}

export default function decorate(block) {
  const rows = [...block.children].map((row) =>
    [...row.children].map((c) => c.textContent.trim())
  );

  const data = mapRowsToObject(rows);

  const wrapper = document.createElement('div');
  wrapper.className = `sovm-cards-wrapper ${data.background}`;

  if (data.grid && data.grid !== 'no-grid') {
    wrapper.classList.add(data.grid);
  }

  const card = document.createElement('div');
  card.className = 'sovm-card';

  // ----- IMAGE WITH PICTURE TAG -----

  if (data.image) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'sovm-card-image';

    const picture = document.createElement('picture');

    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.alt || '';

    picture.append(img);
    imageWrapper.append(picture);
    card.append(imageWrapper);
  }

  // ----- CONTENT SECTION -----

  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  if (data.title) {
    const h3 = document.createElement('h3');
    h3.textContent = data.title;
    content.append(h3);
  }

  if (data.text) {
    const p = document.createElement('p');
    p.textContent = data.text;
    content.append(p);
  }

  if (data.ctatext) {
    const btn = document.createElement('a');
    btn.className = 'sovm-btn';
    btn.textContent = data.ctatext;
    content.append(btn);
  }

  if (data.svgpath && data.svgtext) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'sovm-icon';

    const iconImg = document.createElement('img');
    iconImg.src = data.svgpath;
    iconImg.alt = data.svgtext;

    iconSpan.append(iconImg);
    content.append(iconSpan);
  }

  card.append(content);
  wrapper.append(card);

  block.replaceChildren(wrapper);
}
