export function render(container, html) {
  container.innerHTML = html;
}

export function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}
