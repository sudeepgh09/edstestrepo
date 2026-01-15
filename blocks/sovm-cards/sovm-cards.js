export default function decorate(block) {
  const isGrid3 = block.textContent.includes('grid-3');
  const isWhite = block.textContent.includes('card-white');
  const isDark = block.textContent.includes('card-darkgrey');

  const rows = [...block.children];

  // First row is config
  const dataRow = rows[1];
  if (!dataRow) return;

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  const card = document.createElement('div');
  card.className = 'sovm-card';

  /* ---------- IMAGE DETECTION (FIXED) ---------- */

  const picture = dataRow.querySelector('picture');
  const img = picture?.querySelector('img');

  const imageCell = dataRow.children[4];

const hasImage =
  imageCell &&
  imageCell.querySelector('picture') &&
  imageCell.textContent.trim() !== '';

  if (hasImage) {
  card.classList.add('has-image');
} else {
  card.classList.add('no-image');
}

  /* ---------- TEXT CONTENT ---------- */

  const paragraphs = [...dataRow.querySelectorAll('p')];

  const titleText = paragraphs[1]?.textContent?.trim() || '';
  const descriptionText = paragraphs[2]?.textContent?.trim() || '';
  const buttonText = paragraphs[3]?.textContent?.trim() || '';

  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  if (titleText) {
    const h3 = document.createElement('h3');
    h3.textContent = titleText;
    content.append(h3);
  }

  if (descriptionText) {
    const p = document.createElement('p');
    p.textContent = descriptionText;
    content.append(p);
  }

  if (buttonText) {
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'sovm-btn';
    btn.textContent = buttonText;
    content.append(btn);
  }

  card.append(content);
  wrapper.append(card);

  /* ---------- WRAPPER MODIFIERS ---------- */

  if (isWhite) wrapper.classList.add('card-white');
  if (isDark) wrapper.classList.add('card-darkgrey');
  if (isGrid3) wrapper.classList.add('grid-3');

  block.append(wrapper);
}
console.log("Yeahhhh!!!");