import React, { useEffect, useRef, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from "@mui/material";
function UploadImage({ setImage, setBase64Image }: { setImage: (image: string | null) => void ,setBase64Image: (image: string | null) => void }) {
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
          setBase64Image(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
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
        size="small"
        startIcon={<UploadIcon />}
        sx={{ marginRight: "1rem" }}
      >
        Upload via desktop
        <input type="file" hidden onChange={handleChange}
        accept="image/jpg,.gif,.png,.svg,.webp audio/wav,.mp3"/>
      </Button>
    </div>
  );
}

export default UploadImage;
