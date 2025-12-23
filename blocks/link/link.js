export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [content, url] = row.children;

  const a = document.createElement('a');
  a.href = url?.textContent?.trim() || '#';

  const img = content.querySelector('img');
  if (img) {
    a.append(img);
  } else {
    a.textContent = content.textContent.trim();
  }

  block.innerHTML = '';
  block.append(a);
}
