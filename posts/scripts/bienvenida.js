(function mountInteractiveHint() {
  const zone = document.getElementById('post-interactive-zone');
  if (!zone) {
    return;
  }

  zone.innerHTML = `
    <p><strong>Script del post cargado correctamente.</strong></p>
    <p>Aquí puedes montar visualizaciones 2D/3D o demos interactivas.</p>
  `;
})();
