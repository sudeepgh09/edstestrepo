export default function decorate(block) {
  const section = block.closest('.section');
  if (!section) return;

  // Read section style property
  const styles = section.dataset.style ? section.dataset.style.split(' ') : [];
  const gridClass = styles.find((s) => s.startsWith('grid')) || '';
  const bgClass = styles.find((s) => s.startsWith('card-')) || '';

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'sovm-cards-wrapper';
  if (gridClass) wrapper.classList.add(gridClass);
  if (bgClass) wrapper.classList.add(bgClass);

  // Loop through card items
  [...block.children].forEach((item) => {
    const card = document.createElement('div');
    card.className = 'sovm-card';

    // Image
    const imgRef = item.querySelector('[name="image"] img');
    if (imgRef) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'sovm-card-image';
      imgWrap.append(imgRef.cloneNode(true));
      card.append(imgWrap);
      card.classList.add('has-image');
    } else {
      card.classList.add('no-image');
    }

    const content = document.createElement('div');
    content.className = 'sovm-card-content';

    // Title
    const title = item.querySelector('[name="title"]')?.textContent;
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      content.append(h3);
    }

    // Description
    const desc = item.querySelector('[name="text"]')?.innerHTML;
    if (desc) {
      const p = document.createElement('p');
      p.innerHTML = desc;
      content.append(p);
    }

    // CTA Button
    const cta = item.querySelector('[name="ctatext"]')?.textContent;
    if (cta) {
      const a = document.createElement('a');
      a.className = 'sovm-btn';
      a.href = '#';
      a.textContent = cta;
      content.append(a);
    }

    card.append(content);
    wrapper.append(card);
  });

  // Clear and append
  block.innerHTML = '';
  block.append(wrapper);
}
