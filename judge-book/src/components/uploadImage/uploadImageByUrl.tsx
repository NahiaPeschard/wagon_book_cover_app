// import React, { useEffect, useRef, useState } from 'react';
// import Button from '@mui/material/Button';
// import UploadIcon from '@mui/icons-material/Upload';

// interface ImageProps {
//   setImage: (image: string | null) => void;
//   setBase64Image: (image: string | null) => void;
// }

// function UploadImageByUrl({ setImage, setBase64Image }: ImageProps) {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const loadImage = async () => {
//       if (imageUrl) {
//         const response = await fetch(imageUrl);
//         const blob = await response.blob();
//         const file = URL.createObjectURL(blob);
//         setImage(file);

//         const image = new Image();
//         image.onload = function() {
//           const canvas = document.createElement('canvas');
//           const maxDimension = Math.max(image.width, image.height);
//           const scaleSize = 100 / maxDimension;
//           canvas.width = image.width * scaleSize;
//           canvas.height = image.height * scaleSize;
//           const ctx = canvas.getContext('2d');
//           if (ctx) {
//             ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
//             const base64Image = canvas.toDataURL('image/jpeg');
//             setBase64Image(base64Image);
//           }
//         };
//         image.src = file;
//       }
//     };
//     loadImage();
//   }, [imageUrl, setImage, setBase64Image]);

//   const handleUpload = () => {
//     const url = prompt('Enter the image URL:');
//     if (url) {
//       setImageUrl(url);
//     }
//   };


//   return (
//     <div>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<UploadIcon />}
//         onClick={handleUpload}
//         size= "small"
//       >
//         Upload Image via link
//       </Button>
//     </div>
//   );
// }

// export default UploadImageByUrl;
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

interface ImageProps {
  setImage: (image: string | null) => void;
  setBase64Image: (image: string | null) => void;
}

function UploadImageByUrl({ setImage, setBase64Image }: ImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = URL.createObjectURL(blob);
        setImage(file);

        const image = new Image();
        image.onload = function() {
          const canvas = document.createElement('canvas');
          // set the canvas width and height to the image's original width and height
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const base64Image = canvas.toDataURL('image/jpeg');
            setBase64Image(base64Image);
          }
        };
        image.src = file;
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
        size= "small"
      >
        Upload Image via link
      </Button>
    </div>
  );
}

export default UploadImageByUrl;
