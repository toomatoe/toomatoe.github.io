document.getElementById('year').textContent = new Date().getFullYear();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.animated-preview').forEach(preview => {
 const toggle = preview.querySelector('.motion-toggle');
 const sync = () => { toggle.hidden = reducedMotion.matches; };
 sync(); reducedMotion.addEventListener('change', sync);
 toggle.addEventListener('click', () => {
  const paused = preview.classList.toggle('paused');
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.textContent = paused ? 'Play animation' : 'Pause animation';
 });
});
