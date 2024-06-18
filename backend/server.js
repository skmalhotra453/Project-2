const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// addoitional changes
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Handle data collection for different sources
app.post('/api/data-collect/:source', async (req, res) => {
  const source = req.params.source;
  const params = req.body;

  try {
    let response;

    switch (source) {
      case 's3':
        response = await axios.post('http://localhost:8000/api/collect/s3', params);
        break;
      case 'azure':
        response = await axios.post('http://localhost:8000/api/collect/azure', params);
        break;
      case 'gdrive':
        response = await axios.post('http://localhost:8000/api/collect/gdrive', params);
        break;
      case 'csv-path':
        // Process CSV path
        response = { data: 'CSV path processed successfully' };
        break;
      default:
        res.status(400).send('Unsupported data source');
        return;
    }

    res.send(response.data);
  } catch (error) {
    console.error(`Error collecting data from ${source}:`, error);
    res.status(500).send('Error collecting data');
  }
});

// // Handle CSV file upload
// app.post('/api/data-collect/csv-upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }

//   console.log('File uploaded successfully:', req.file);
//   res.send({ message: 'File uploaded successfully', file: req.file });
// });

// Handle CSV file upload
app.post('/api/data-collect/csv-upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    // const response = await axios.post('http://localhost:8000/api/data-collect/csv-upload', formData, {
    //   headers: {
    //     ...formData.getHeaders(),
    //   },
    // });

    res.send(response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});




// Handle data visualization request
app.get('/api/visualization', (req, res) => {
  axios.get('http://localhost:8000/api/visualization', { responseType: 'stream' })
    .then(response => {
      response.data.pipe(res);
    })
    .catch(error => {
      console.error('Error fetching visualization:', error);
      res.status(500).send('Error fetching visualization');
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
