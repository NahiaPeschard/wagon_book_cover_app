import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

function UploadImageByUrl({ setImage }: { setImage: (image: string | null) => void }) {
  const handleUpload = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      setImage(url);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
        onClick={handleUpload}
        size= "small"
      >
        Upload Image via link
      </Button>
    </div>
  );
}

export default UploadImageByUrl;
