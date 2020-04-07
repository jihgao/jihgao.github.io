import React, { useState } from "react";
import Editor from './Editor';
import Layout from "./Layout";
import Preview from "./Preview";
import example from "./example";

function App() {
  const [source, setSource] = useState(example);
  function handleSourceChange(newSource){
    setSource(newSource);
  }
  return (
    <Layout>
      <Editor value={source} onChange={handleSourceChange} />
      <Preview source={source} />
    </Layout>
  );
}

export default App;
