import React, {useRef, useEffect} from 'react';
import { editor } from "monaco-editor";

function MyEditor(props){
  const container = useRef(null);
  useEffect(() => {
      const _editor = editor.create(container.current, {
        value: props.value,
        language: "markdown",
        renderLineHighLight: "none",
        lineDecorationWidth: 0,
        lineNumbersLeft: 0,
        lineNumbersWidth: 0,
        fontSize: 20,
        lineNumbers: "on",
        automaticLayout: false,
        quickSuggestions: true,
        occurrencesHighlight: true,
        colorDecorators: true,
        wordWrap: true,
        theme: "vs-dark",
        minimap: {
          enabled: false
        }
      });
      const _model = _editor.getModel();
      _model.onDidChangeContent(() => {
        props.onChange(_model.getValue());
      });
  }, [props.value]);
  return <div className="editor" ref={container}/>
}

export default MyEditor;
