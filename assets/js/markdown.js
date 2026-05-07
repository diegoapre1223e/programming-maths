(function setupMarkdownRenderer() {
  const markedRenderer = new marked.Renderer();

  markedRenderer.code = ({ text, lang }) => {
    const language = lang || '';
    const validLang = language && hljs.getLanguage(language);
    const highlighted = validLang
      ? hljs.highlight(text, { language }).value
      : hljs.highlightAuto(text).value;

    const baseBlock = `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;

    if (!language.includes('runnable')) {
      return baseBlock;
    }

    const cleanedLanguage = language.replace('runnable', '').trim() || 'javascript';

    return `
      ${baseBlock}
      <div class="run-block" data-runnable-lang="${cleanedLanguage}">
        <div class="run-toolbar">
          <button type="button" data-run-code>Run</button>
        </div>
        <iframe class="run-output" sandbox="allow-scripts"></iframe>
      </div>
    `;
  };

  marked.use({ renderer: markedRenderer });
})();

function enhanceRunnableBlocks(root) {
  const runnableBlocks = root.querySelectorAll('[data-runnable-lang]');

  runnableBlocks.forEach((block) => {
    const runButton = block.querySelector('[data-run-code]');
    const iframe = block.querySelector('iframe');
    const source = block.previousElementSibling?.innerText ?? '';

    runButton.addEventListener('click', () => {
      const script = `<!doctype html><html><body><script>${source}<\/script></body></html>`;
      iframe.srcdoc = script;
    });
  });
}
