window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
      ["$$", "$$"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  options: {
    skipHtmlTags: [
      "script",
      "noscript",
      "style",
      "textarea",
      "pre",
      "code",
      "a",
    ],
    ignoreHtmlClass: "editor",
    processHtmlClass: "tex2jax_process",
  },
  startup: {
    elements: null, // The elements to typeset (default is document body)
    typeset: true, // Perform initial typeset?
    ready: () => {
      window.MathJax.startup.defaultReady();
      // window.MathJax.startup.promise.then(() => {
      //   console.log("MathJax initial typesetting complete");
      // });
    },
  },
};

export default window.MathJax;
