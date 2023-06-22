import React, { useState } from 'react';
import './StartPage.css'
import UploadImage from '../uploadImage/uploadImage';
import UploadImageByUrl from '../uploadImage/uploadImageByUrl';
import { Button, CircularProgress } from '@mui/material';
import ReportDialog from '../dialog/ReportDialog';
function StartPage() {
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<ArrayBuffer | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<{ "30_category": string[], "8_cat": string[] } | null>(null);
  const [predictClicked, setPredictClicked] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = React.useCallback(async ()  => {
    const url = "https://bookcover-astv2a37ja-ew.a.run.app/predict";
    setIsLoading(true);
    try {
      if (base64Image) {
        let formData = new FormData();
        let blob = new Blob([base64Image], { type: 'image/jpeg' }); // change type if necessary

        formData.append("img", blob);

        const response = await fetch(url, {
          method: "POST", // or 'PUT'
          headers: {
            // "content-type": "multipart/form-data",
            'Access-Control-Allow-Origin': '*'
          },
          mode: 'cors', // Add this mode to enable CORS
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setResult(result);
        setRetryCount(0);
        setPredictClicked(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }

  }, [base64Image]);

  const handleRetry = () => {
    if (retryCount < 3) { // Make sure you don't exceed the number of categories available
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
  };

  const handleReportSubmit = (feedback: string, category: string) => {
    // Handle the submission of the report
    // Close the dialog
    setReportDialogOpen(false);
  };

  return (
    <>{isLoading ? (
      <><div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
        {image && (
          <img
            src={image}
            alt="Uploaded book cover"
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
            }} />
        )}
      </div><div className='gap'></div><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
          <CircularProgress />
          <div>Predicting in progress...</div>
        </div></>
    ) :
      predictClicked && image? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
            <img
              src={image}
              alt="Uploaded book cover"
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
                sx={{ textTransform: 'none' }}
              >
                  Try Again
                </Button>
                </div>
                {retryCount < 2 &&
                <><div className="gap"></div><div style={{ display: 'flex', justifyContent: 'center' }}>
                  Number of attempts remaining: {2 - retryCount}
                </div></>
}
                </>
      ) : (
        <><div style={{ display: 'flex', justifyContent: 'center' }}>
                  {result && `Prediction: ${result["30_category"][2]}`}
                </div><div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                    <ReportDialog
                      open={reportDialogOpen}
                      handleClose={() => setReportDialogOpen(false)}
                      handleReportSubmit={handleReportSubmit} />
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={() => setReportDialogOpen(true)}
                      sx={{ textTransform: 'none' }}
                    >
                      Send Feedback
                    </Button>
                  </div></>
      )}
      <div className="gap"></div>
      <div style={{ display: 'flex',  justifyContent: 'center'}}>
      <Button
        variant="contained"
        color="primary"
        size= "medium"
        onClick={handleNewBook}
        sx={{ textTransform: 'none' }}
      >
        New Book
      </Button>
      </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "20px"}}>Please upload a book cover:</div>
          <div className="gap"></div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '30vh' }}>
            {image && (
              <img
                src={image}
                alt="Uploaded book cover"
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                }}
              />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' ,paddingTop: "20px"}}>
            <UploadImage setImage={setImage} setBase64Image={setBase64Image} />
            </div>
            <div className="gap"></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <UploadImageByUrl setImage={setImage} setBase64Image={setBase64Image} />
          </div>
          <div className="gap"></div>
          {image &&           <><div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handlePredict}
                sx={{ textTransform: 'none' }}
              >
                Predict
              </Button>
            </div><div className='gap'></div></>}
        </>
      )}
    </>
  );
}

export default StartPage;
