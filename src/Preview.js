import React, { useRef, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import tocPlugin from "markdown-it-table-of-contents";
import mermaid from "mermaid";
import "./mathjax";
import "mathjax/es5/tex-svg";
mermaid.initialize({ startOnLoad: true });

const md = new MarkdownIt({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: false,
  quotes: "“”‘’",
});
md.use(tocPlugin, { includeLevel: [2, 3], markerPattern: /^\[toc\]/im });

function PreviewComponent(props) {
  const [init, setInit] = useState(null);
  const ele = useRef(null);
  const shadow = useRef(null);
  const { source } = props;
  function handleMessage(evt) {
    if (evt.data.id === "menu.saveAs") {
      window.print();
    }
  }

  useEffect(() => {
    const offcanvas = document.querySelector("#offcanvas");
    shadow.current.innerHTML = md.render(source || "");
    if (!init) {
      window.MathJax.startup.elements = ele.current;
      window.MathJax.startup.getComponents();
      setInit(true);
    }
    try {
      shadow.current.querySelectorAll(".language-flow").forEach(($el, idx) => {
        mermaid.mermaidAPI.render(
          `chart-${idx}`,
          $el.textContent,
          (svgCode) => {
            $el.innerHTML = svgCode;
          },
          offcanvas
        );
      });
      window.MathJax.typeset();
      ele.current.innerHTML = shadow.current.innerHTML;
    } catch (err) {
      console.log(err);
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [source, init]);
  return (
    <div className="preview">
      <div ref={shadow} className="preview__shadow" />
      <div ref={ele} className="preview__main" />
    </div>
  );
}

export default PreviewComponent;
