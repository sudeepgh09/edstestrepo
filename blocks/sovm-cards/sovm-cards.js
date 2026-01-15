export default function decorate(block) {
  const configText = block.textContent;

  const isGrid3 = configText.includes('grid-3');
  const isWhite = configText.includes('card-white');
  const isDark = configText.includes('card-darkgrey');

  const rows = [...block.children];
  if (rows.length < 2) return;

  const dataRow = rows[1];

  const imageCell = dataRow.children[4];
  const hasImage =
    imageCell &&
    imageCell.textContent.trim() !== '' &&
    imageCell.querySelector('picture');

  const paragraphs = [...dataRow.querySelectorAll('p')];

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  if (isWhite) wrapper.classList.add('card-white');
  if (isDark) wrapper.classList.add('card-darkgrey');
  if (isGrid3) wrapper.classList.add('grid-3');

  const card = document.createElement('div');
  card.className = `sovm-card ${hasImage ? 'has-image' : 'no-image'}`;

  if (hasImage) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'sovm-card-image';
    imgWrap.append(imageCell.querySelector('picture').cloneNode(true));
    card.append(imgWrap);
  }

  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  if (paragraphs[1]) {
    const h3 = document.createElement('h3');
    h3.textContent = paragraphs[1].textContent;
    content.append(h3);
  }

  if (paragraphs[2]) {
    const p = document.createElement('p');
    p.textContent = paragraphs[2].textContent;
    content.append(p);
  }

  if (paragraphs[3]) {
    const a = document.createElement('a');
    a.className = 'sovm-btn';
    a.href = '#';
    a.textContent = paragraphs[3].textContent;
    content.append(a);
  }

  card.append(content);
  wrapper.append(card);
  block.append(wrapper);
}
