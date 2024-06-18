import React, { useState } from 'react';
import DataSourceSelector from './components/DataSourceSelector';
import DataSourceForm from './components/DataSourceForm';
import DataVisualization from './components/DataVisualization';
import FileUpload from './components/FileUpload';

function App() {
  const [selectedSource, setSelectedSource] = useState('');

  return (
    <div className="App">
      <DataSourceSelector onSelect={setSelectedSource} />
      {selectedSource && selectedSource !== 'csv-upload' && <DataSourceForm selectedSource={selectedSource} />}
      {selectedSource === 'csv-upload' && <FileUpload />}
      <DataVisualization />
    </div>
  );
}

export default App;
