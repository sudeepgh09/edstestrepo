function mapRowsToObject(rows) {
  // eslint-disable-next-line max-len
  const [
    grid,
    background,
    image,
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
    title: title?.[0] || '',
    text: text?.[0] || '',
    ctatext: ctatext?.[0] || '',
    svgpath: svgpath?.[0] || '',
    svgtext: svgtext?.[0] || '',
  };
}

export default function decorate(block) {
  const rows = [...block.children].map((row) => [...row.children].map((c) => c.textContent.trim()));

  const data = mapRowsToObject(rows);

  const wrapper = document.createElement('div');
  wrapper.className = `sovm-cards-wrapper ${data.grid} ${data.background}`;
  if (data.grid && data.grid !== 'no-grid') {
  wrapper.classList.add(data.grid);
}

  const card = document.createElement('div');
  card.className = 'sovm-card';

  if (data.image) {
    card.innerHTML += `
      <div class="sovm-card-image">
        <img src="${data.image}" alt="${data.title || ''}" />
      </div>
    `;
  }

  card.innerHTML += '<div class="sovm-card-content">';

  if (data.title) {
    card.innerHTML += `<h3>${data.title}</h3>`;
  }

  if (data.text) {
    card.innerHTML += `<p>${data.text}</p>`;
  }

  if (data.ctatext) {
    card.innerHTML += `
      <a class="sovm-btn">
        ${data.ctatext}
      </a>
    `;
  }

  if (data.svgpath && data.svgtext) {
    card.innerHTML += `
      <span class="sovm-icon">
        <img src="${data.svgpath}" alt="${data.svgtext}" />
      </span>
    `;
  }

  card.innerHTML += '</div>';

  wrapper.append(card);

  block.replaceChildren(wrapper);
}
