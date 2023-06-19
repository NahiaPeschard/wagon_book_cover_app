import React, { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from "@mui/material";
function UploadImage({ setImage }: { setImage: (image: string | null) => void }) {
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<any> => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const fileLoaded = URL.createObjectURL(files[0]);
      setImage(fileLoaded);
    }
  };

  const getHeightAndWidthFromDataUrl = (dataURL: string) =>
    new Promise<{ height: number; width: number }>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          height: img.height,
          width: img.width,
        });
      };
      img.src = dataURL;
    });

  // Get dimensions
  const someFunction = async (file: any) => {
    console.log('file: ', file);
    const dimensions = await getHeightAndWidthFromDataUrl(file);
    return dimensions;
  };

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
