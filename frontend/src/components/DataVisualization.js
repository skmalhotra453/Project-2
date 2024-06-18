import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataVisualization() {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/visualization', { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      })
      .catch(error => {
        console.error('Error fetching visualization:', error);
        setError('Error fetching visualization.');
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {imageUrl ? (
        <img src={imageUrl} alt="Visualization" />
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default DataVisualization;
