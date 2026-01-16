export default function decorate(block) {
  console.log('SOVM decorate running');

  const configText = block.textContent;

  const isGrid3 = configText.includes('grid-3');
  const isWhite = configText.includes('card-white');
  const isDark = configText.includes('card-darkgrey');

  const rows = [...block.children];

  if (rows.length < 3) return;

  const dataRow = rows[2];

  const imageCell = dataRow.children[4];

  const hasImage = imageCell
    && imageCell.querySelector('picture')
    && imageCell.textContent.trim() !== '';

  const paragraphs = [...dataRow.querySelectorAll('p')];

  const wrapper = block.closest('.sovm-cards-wrapper');

  if (!wrapper) return;

  wrapper.innerHTML = '';

  if (isWhite) wrapper.classList.add('card-white');
  if (isDark) wrapper.classList.add('card-darkgrey');
  if (isGrid3) wrapper.classList.add('grid-3');

  const card = document.createElement('div');
  card.className = `sovm-card ${hasImage ? 'has-image' : 'no-image'}`;

  if (hasImage) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'sovm-card-image';

    const picture = imageCell.querySelector('picture');
    if (picture) {
      imgWrap.append(picture.cloneNode(true));
    }

    card.append(imgWrap);
  }

  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  // ----- TITLE FIX (THIS WAS MISSING EARLIER) -----

  if (paragraphs[0]) {
    const h3 = document.createElement('h3');
    h3.textContent = paragraphs[0].textContent.trim();
    content.append(h3);
  }

  // Description
  if (paragraphs[1]) {
    const p = document.createElement('p');
    p.textContent = paragraphs[1].textContent.trim();
    content.append(p);
  }

  // Button
  if (paragraphs[2]) {
    const a = document.createElement('a');
    a.className = 'sovm-btn';
    a.href = '#';
    a.textContent = paragraphs[2].textContent.trim();
    content.append(a);
  }

  card.append(content);
  wrapper.append(card);
}

console.log('yeahhh!!!');
