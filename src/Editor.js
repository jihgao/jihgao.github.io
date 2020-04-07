import React, {useRef, useEffect} from 'react';
import message from 'antd/lib/message';
import { editor, KeyMod, KeyCode } from "monaco-editor";
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/lib/message/style/index.css';

message.config({
  top: 20,
  duration: 2,
  maxCount: 1
});

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
      _editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, function () {
        window.localStorage.setItem('cached', _model.getValue());
        message.info('已保存');
      });
  }, [props.value]);
  return (
    <div className="editor" ref={container}/>
  );
}

export default MyEditor;
