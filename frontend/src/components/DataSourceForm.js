import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function DataSourceForm({ selectedSource }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({});
  }, [selectedSource]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/data-collect/${selectedSource}`, formData)
      .then(response => {
        console.log('Data collected:', response.data);
      })
      .catch(error => {
        console.error('Error collecting data:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedSource === 's3' && (
        <>
          <TextField label="AWS Access Key" name="awsAccessKey" onChange={handleChange} required />
          <TextField label="AWS Secret Key" name="awsSecretKey" onChange={handleChange} required />
          <TextField label="Bucket Name" name="bucketName" onChange={handleChange} required />
          <TextField label="Object Key" name="objectKey" onChange={handleChange} required />
        </>
      )}
      {selectedSource === 'azure' && (
        <>
          <TextField label="Azure Storage Account" name="azureAccount" onChange={handleChange} required />
          <TextField label="Azure Storage Key" name="azureKey" onChange={handleChange} required />
          <TextField label="Container Name" name="containerName" onChange={handleChange} required />
          <TextField label="Blob Name" name="blobName" onChange={handleChange} required />
        </>
      )}
      {selectedSource === 'gdrive' && (
        <>
          <TextField label="Google Drive API Key" name="gdriveApiKey" onChange={handleChange} required />
          <TextField label="File ID" name="fileId" onChange={handleChange} required />
        </>
      )}
      {selectedSource === 'csv-path' && (
        <>
          <TextField label="CSV File Path" name="csvFilePath" onChange={handleChange} required />
        </>
      )}
      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
}

export default DataSourceForm;
