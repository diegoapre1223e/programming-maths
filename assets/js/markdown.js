(function setupMarkdownRenderer() {
  const markedRenderer = new marked.Renderer();

  markedRenderer.code = (codeOrToken, infostring = '') => {
    const isTokenObject = codeOrToken && typeof codeOrToken === 'object';
    const text = isTokenObject ? (codeOrToken.text ?? '') : (codeOrToken ?? '');
    const language = String(isTokenObject ? (codeOrToken.lang ?? '') : infostring).trim();
    const runnableLanguage = language.replace('runnable', '').trim();
    const languageForHighlight = runnableLanguage || language;
    const validLang = languageForHighlight && hljs.getLanguage(languageForHighlight);
    const highlighted = validLang
      ? hljs.highlight(String(text), { language: languageForHighlight }).value
      : hljs.highlightAuto(String(text)).value;

    const baseBlock = `<pre><code class="hljs language-${languageForHighlight}">${highlighted}</code></pre>`;

    if (!language.includes('runnable')) {
      return baseBlock;
    }

    const cleanedLanguage = runnableLanguage || 'javascript';

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
