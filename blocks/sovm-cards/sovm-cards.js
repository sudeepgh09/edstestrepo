export default function decorate(block) {
  console.log('Sovm Cards property-based decorate running');

  // Read block properties
  const grid = block.dataset.grid || 'grid-3';
  const bg = block.dataset['card-background'] || 'card-white';
  const { image } = block.dataset;
  const { title } = block.dataset;
  const { text } = block.dataset;
  const cta = block.dataset.ctatext;
  const svgPath = block.dataset.svgpath;
  const svgText = block.dataset.svgtext;

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = `sovm-cards-wrapper ${bg} ${grid}`;

  // Create card container
  const card = document.createElement('div');
  card.className = 'sovm-card';

  // If image exists, append it
  if (image) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'sovm-card-image';
    const img = document.createElement('img');
    img.src = image;
    imgWrap.append(img);
    card.append(imgWrap);
  }

  // Card content
  const content = document.createElement('div');
  content.className = 'sovm-card-content';

  if (title) {
    const h3 = document.createElement('h3');
    h3.textContent = title;
    content.append(h3);
  }

  if (text) {
    const p = document.createElement('p');
    p.innerHTML = text; // allow richtext HTML
    content.append(p);
  }

  if (cta) {
    const a = document.createElement('a');
    a.className = 'sovm-btn';
    a.href = '#';
    a.textContent = cta;
    content.append(a);
  }

  // Optional SVG icon
  if (svgPath && svgText) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${svgPath}#${svgText}`);
    svg.append(use);
    content.append(svg);
  }

  card.append(content);
  wrapper.append(card);

  // Clear block content and append wrapper
  block.innerHTML = '';
  block.append(wrapper);
}
