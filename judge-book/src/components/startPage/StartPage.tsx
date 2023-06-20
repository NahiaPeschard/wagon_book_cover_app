import React, { useState } from 'react';
import './StartPage.css'
import UploadImage from '../uploadImage/uploadImage';
import UploadImageByUrl from '../uploadImage/uploadImageByUrl';
import { Button, TextField } from '@mui/material';
function StartPage() {
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<{ "30_category": string[], "8_cat": string[] } | null>(null);
  const [predictClicked, setPredictClicked] = useState(false);
  const [bookTitle, setBookTitle] = useState<string>("");

  const handlePredict = React.useCallback(async ()  => {
    console.log("clicked", base64Image?.length);

    const url = "https://bookcover-astv2a37ja-ew.a.run.app/predict";
    const userText = "Harry Potter"; // replace with your actual text

    const data = {
      image_arr: base64Image,
      title: userText,
    };

    const response = await fetch(url, {
      method: "PUT", // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors', // Add this mode to enable CORS
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.log("In");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("123");
    const result = await response.json();
    console.log(result);
    setResult(result);
    setRetryCount(0);
    // Assuming the response contains an 'image' property with the image url
    setImgSrc(result.image);
    setPredictClicked(true);
  }, [base64Image]);

  const handleRetry = () => {
    if (retryCount < 2) { // Make sure you don't exceed the number of categories available
      setRetryCount(retryCount + 1);
    }
  };

  const handleNewBook = () => {
    // Clear the image and base64 image
    setImage(null);
    setBase64Image(null);
    // Reset the results and retry count
    setResult(null);
    setRetryCount(0);
    // Set predictClicked back to false
    setPredictClicked(false);
    setBookTitle("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(event.target.value);
  };

  return (
    <>
      {predictClicked && image ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
            <img
              src={image}
              style={{
                maxWidth: '300px',
                maxHeight: '300px',
              }} />
          </div>
          <div className="gap"></div>

      {retryCount < 2 ? (
                  <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                {result && `Prediction: ${result["30_category"][retryCount]}`}
                </div>
                <div className="gap"></div>
                <div style={{ display: 'flex',  justifyContent: 'center'}}>
                <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleRetry}
              >
                  Try Again
                </Button>
                </div>
                </>
      ) : (
        <><div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="Book Title"
                  variant="outlined"
                  size="small"
                  value={bookTitle}
                  onChange={handleInputChange} />
              </div>
              <div className="gap"></div>
      <div style={{ display: 'flex',  justifyContent: 'center'}}>
                <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handlePredict}
                >
                Predict
                </Button>
                </div>
                </>
      )}
      <div className="gap"></div>
      <div style={{ display: 'flex',  justifyContent: 'center'}}>
      <Button
        variant="contained"
        color="primary"
        size= "medium"
        onClick={handleNewBook}
      >
        New Book
      </Button>
      </div>
        </>
      ) : (
        <>
          <div className='bookCover'>Please select one of the following methods to upload your book cover:</div>
          <div className="gap"></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <UploadImage setImage={setImage} setBase64Image={setBase64Image} />
            </div>
            <div className="gap"></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <UploadImageByUrl setImage={setImage} setBase64Image={setBase64Image} />
          </div>
          <div className="gap"></div>
          {image && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={image}
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                }}
              />
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "20px"}}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handlePredict}
            >
              Predict
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default StartPage;
