import React, { useRef, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import tocPlugin from "markdown-it-table-of-contents";
import mermaid from "mermaid";
import linkify from "markdown-linkify";
import {loadScripts} from './util';
mermaid.initialize({ startOnLoad: true });

const md = new MarkdownIt({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: false,
  typographer: false,
  quotes: "“”‘’"
});

md.use(tocPlugin, { includeLevel: [2], markerPattern: /^\[toc\]/im });

const config = {
  showProcessingMessages: false, 
  messageStyle: "none",
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
      ["$$", "$$"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ],
    processEscapes: true,
    skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"],
    ignoreClass:"editor"
  },
  "HTML-CSS": {
    availableFonts: ["STIX", "TeX"],
    showMathMenu: false,
    linebreaks: {
      automatic: true
    }
  },
  SVG: {
    linebreaks: true
  }
};

function PreviewComponent(props) {
  const [loaded, setLoaded] = useState(!!window.MathJax);
  const ele = useRef(null);
  const shadow = useRef(null);
  const { source } = props;
  function handleMessage(evt){
    if(evt.data.id === 'menu.saveAs'){
       window.print();
    }
  }
  useEffect(() => {
      const render = (cb = () => {}) => {
          const offcanvas = document.querySelector("#offcanvas");
          shadow.current.innerHTML = md.render(linkify(source || ""));
          try {
            shadow.current.querySelectorAll(".language-flow").forEach($el => {
              const _div = document.createElement('div');
              const _id = `chart-${String(Math.random()).replace(".","")}`;
              _div.setAttribute("id", _id);
              offcanvas.appendChild(_div);
              mermaid.mermaidAPI.render(_id, $el.textContent, svgCode => {
                const parentPre = $el.closest('pre');
                _div.innerHTML = svgCode;
                _div.removeAttribute("id");
                parentPre.parentNode.replaceChild(_div, parentPre);
              });
            });
            offcanvas.innerHTML = '';
            if(!loaded){
              window.MathJax.Hub.Config(config);
              window.MathJax.Hub.Queue(
                ["Typeset", window.MathJax.Hub, shadow.current],
                () => {
                  ele.current.innerHTML = shadow.current.innerHTML;
                  cb();
                }
              );
            } else {
              window.MathJax.Hub.Queue(
                ["Typeset", window.MathJax.Hub, shadow.current],
                () => {
                  ele.current.innerHTML = shadow.current.innerHTML;
                  cb();
                }
              );
            }

          } catch (error) {
            console.error(error);
          }
      };
      if (!loaded){
        !document.querySelector('#MathJax-script') && loadScripts(
          [
            ["https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML",        {
            async: true,
            id: "MathJax-script"
          }]]
        ).then(() => {
          render(() => {
            setLoaded(true);
          });
        });
      } else {
        render();
      }
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
  }, [source, loaded]);
  return (
    <div className="preview">
      <div ref={shadow} className="preview__shadow" />
      <div ref={ele} className="preview__main" />
    </div>
  );
}

export default PreviewComponent;
