import React, { useEffect, useRef } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from "@mui/material";

interface Props {
  setImage: (image: string | null) => void;
  setBase64Image: (image: ArrayBuffer | null) => void;
}

function UploadImage({ setImage, setBase64Image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<any> => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const fileLoaded = URL.createObjectURL(files[0]);
      setImage(fileLoaded);

      const reader = new FileReader();
      reader.onload = function(e) {
        if (e.target) {
          setBase64Image(e.target.result as ArrayBuffer);
        }
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [setImage]);

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        size="medium"
        startIcon={<UploadIcon />}
        sx={{ textTransform: 'none' }}
      >
        Upload from files
        <input type="file" hidden onChange={handleChange}
        accept="image/jpg,.gif,.png,.svg,.webp audio/wav,.mp3"/>
      </Button>
    </div>
  );
}

export default UploadImage;
