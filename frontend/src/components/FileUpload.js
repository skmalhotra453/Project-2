// import React, { useState } from 'react';
// import axios from 'axios';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/api/data-collect/csv-upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error uploading file');
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/data-collect/csv-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
