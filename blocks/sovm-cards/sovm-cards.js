export default function decorate(block) {
  const rows = [...block.children];

  // 1. Read config rows
  const modifiers = [];
  while (rows.length && rows[0].querySelector('p')) {
    modifiers.push(rows.shift().textContent.trim());
  }

  // 2. Apply modifiers to wrapper
  const wrapper = block.closest('.sovm-cards-wrapper');

  modifiers.forEach((modifier) => {
    wrapper.classList.add(modifier);
  });

  // 3. Cleanup config rows
  block.innerHTML = '';
  rows.forEach(row => block.append(row));
}
console.log(" js firing!!")