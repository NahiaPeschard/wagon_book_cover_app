import React, { useState } from 'react';
import './StartPage.css'
import UploadImage from '../uploadImage/uploadImage';
import UploadImageByUrl from '../uploadImage/uploadImageByUrl';
import { Button } from '@mui/material';
function StartPage() {
  const [image, setImage] = useState<string | null>(null);

  const handlePredict = React.useCallback(() => {
    console.log("clicked");
  }, [])
  return (
      <>
      <div className='bookCover'>Please select one of the following method to upload you book cover:
      </div>
      <div className='bookCover'>
      <UploadImage setImage={setImage} />
      <div className="gap"></div>
      <UploadImageByUrl setImage={setImage} />
      </div>
      <div className="gap"></div>
      {image && (
            <div style={{ display: 'flex', textAlign: 'left',  paddingTop: '20px',paddingLeft: '20px'}}>
              <img
                src={image}
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                }}
              />
            </div>
          )}
          <div className='bookCover'>
          <Button
            variant="contained"
            color="primary"
            size= "small"
            onClick={handlePredict}
          >
            Predict
          </Button>
          </div>

      </>

  );
}


export default StartPage;
