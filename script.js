document.getElementById('year').textContent = new Date().getFullYear();
const preview = document.querySelector('.bank-preview');
const toggle = document.querySelector('.motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) toggle.hidden = true;
toggle.addEventListener('click', () => {
 const paused = preview.classList.toggle('paused');
 toggle.setAttribute('aria-pressed', String(paused));
 toggle.textContent = paused ? 'Play animation' : 'Pause animation';
});
