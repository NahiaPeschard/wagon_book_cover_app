import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

interface ImageProps {
  setImage: (image: string | null) => void;
  setBase64Image: (image: ArrayBuffer | null) => void;
}

function UploadImageByUrl({ setImage, setBase64Image }: ImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = function() {
          const arrBuffer = reader.result as ArrayBuffer;
          setBase64Image(arrBuffer);
        };
        reader.readAsArrayBuffer(blob);

        const file = URL.createObjectURL(blob);
        setImage(file);
      }
    };
    loadImage();
  }, [imageUrl, setImage, setBase64Image]);

  const handleUpload = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      setImageUrl(url);
    }
  };


  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
        onClick={handleUpload}
        size= "medium"
        sx={{ textTransform: 'none' }}
      >
        Upload from url link
      </Button>
    </div>
  );
}

export default UploadImageByUrl;
