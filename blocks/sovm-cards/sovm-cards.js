export default function decorate(block) {
  const wrapper = block.closest('.sovm-cards-wrapper');
  if (!wrapper) return;

  // Get styles from section
  const section = block.closest('.section');
  const styles = (section?.dataset.style || '').split(' '); // e.g., "grid-3 card-darkgrey"

  // Clear wrapper
  wrapper.innerHTML = '';

  const rows = [...block.children];
  if (rows.length < 3) return;

  const dataRow = rows[2];
  const imageCell = dataRow.children[4];

  const hasImage = imageCell
    && imageCell.querySelector('picture')
    && imageCell.textContent.trim() !== '';

  const paragraphs = [...dataRow.querySelectorAll('p')];

  // Apply styles from section
  styles.forEach(style => wrapper.classList.add(style));

  // Create card
  const card = document.createElement('div');
  card.className = `sovm-card ${hasImage ? 'has-image' : 'no-image'}`;

  if (hasImage) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'sovm-card-image';

    const picture = imageCell.querySelector('picture');
    if (picture) imgWrap.append(picture.cloneNode(true));

    card.append(imgWrap);
  }

  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  // Title
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
