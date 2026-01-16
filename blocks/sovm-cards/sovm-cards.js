export default function decorate(block) {
  console.log('SOVM decorate running');

  // The section wrapper that contains this block
  const section = block.closest('.section');

  if (!section) return;

  // Read properties from the section (property-based approach)
  const grid = section.dataset.grid || '';
  const cardBg = section.dataset['card-background'] || '';

  const rows = [...block.children];

  if (rows.length < 1) return;

  const dataRow = rows[0];

  // Assuming the last 4-5 cells in block row contain the card content
  const imageCell = dataRow.children[0]; // update if your image cell position changes
  const hasImage = imageCell
    && imageCell.querySelector('picture')
    && imageCell.textContent.trim() !== '';

  const paragraphs = [...dataRow.querySelectorAll('p')];

  // Clear block content to rebuild cards
  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';

  // Apply section properties as classes
  if (cardBg) wrapper.classList.add(cardBg);
  if (grid) wrapper.classList.add(grid);

  const card = document.createElement('div');
  card.className = `sovm-card ${hasImage ? 'has-image' : 'no-image'}`;

  // Add image if exists
  if (hasImage) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'sovm-card-image';
    const picture = imageCell.querySelector('picture');
    if (picture) {
      imgWrap.append(picture.cloneNode(true));
    }
    card.append(imgWrap);
  }

  // Card content
  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  // Title (h3)
  if (paragraphs[0]) {
    const h3 = document.createElement('h3');
    h3.textContent = paragraphs[0].textContent.trim();
    content.append(h3);
  }

  // Description (p)
  if (paragraphs[1]) {
    const p = document.createElement('p');
    p.textContent = paragraphs[1].textContent.trim();
    content.append(p);
  }

  // CTA Button
  if (paragraphs[2]) {
    const a = document.createElement('a');
    a.className = 'sovm-btn';
    a.href = '#';
    a.textContent = paragraphs[2].textContent.trim();
    content.append(a);
  }

  card.append(content);
  wrapper.append(card);
  block.append(wrapper);

  console.log('SOVM card decorated successfully!');
}
