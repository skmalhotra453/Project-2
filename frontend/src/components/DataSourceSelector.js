import React from 'react';
import { IconButton } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function DataSourceSelector({ onSelect }) {
  return (
    <div className="data-source-icons">
      <IconButton onClick={() => onSelect('s3')} aria-label="Select S3"><CloudIcon /></IconButton>
      <IconButton onClick={() => onSelect('azure')} aria-label="Select Azure"><CloudQueueIcon /></IconButton>
      <IconButton onClick={() => onSelect('gdrive')} aria-label="Select Google Drive"><FolderIcon /></IconButton>
      <IconButton onClick={() => onSelect('csv-path')} aria-label="Select CSV Path"><DescriptionIcon /></IconButton>
      <IconButton onClick={() => onSelect('csv-upload')} aria-label="Select CSV Upload"><DescriptionIcon /></IconButton>
      <IconButton onClick={() => onSelect('pdf')} aria-label="Select PDF"><PictureAsPdfIcon /></IconButton>
    </div>
  );
}

export default DataSourceSelector;
