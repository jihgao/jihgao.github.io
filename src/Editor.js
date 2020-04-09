import React, {useRef, useEffect} from 'react';
import  {debounce} from 'lodash';
import message from 'antd/lib/message';
import { editor, KeyMod, KeyCode } from "monaco-editor";
import 'antd/lib/message/style/index.css';

message.config({
  top: 20,
  duration: 2,
  maxCount: 1
});

function MyEditor(props){
  const container = useRef(null);
  const { onChange } = props;
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
        quickSuggestions: false,
        occurrencesHighlight: false,
        colorDecorators: false,
        wordWrap: true,
        theme: "vs-dark",
        minimap: {
          enabled: false
        }
      });
      const _model = _editor.getModel();
      _model.onDidChangeContent(debounce(() => {
        onChange(_model.getValue());
      }, 500));
      _editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, saveCache);
      function saveCache() {
        window.localStorage.setItem('cached', _model.getValue());
        message.info('Saved');
      }
      function handleMessage(evt){
        if(evt.data.id === 'menu.save'){
          saveCache();
        }
      }
      function handleResize(){
        _editor.layout(container.current.getBoundingClientRect())
      }
      window.addEventListener('resize', handleResize);
      window.addEventListener('message', handleMessage);
     return () => {
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('resize', handleResize);
      };
  }, [props.value, onChange]);
  return (
    <div className="editor" ref={container}/>
  );
}

export default MyEditor;
