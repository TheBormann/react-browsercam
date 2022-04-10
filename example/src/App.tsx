import React, { useState } from 'react';
import './App.css';
import { Camera, CameraInterface, ImgDetailPopup, useCapture } from 'react-browsercam';

function App() {
  const { image, isAccessingCamera, videoRef, capture, setBeforeCapture } = useCapture({});
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div className="App">
      <div style={{width: "100vw", height: "100vh"}}>
        <Camera
          videoRef={videoRef}
          isAccessingCamera={isAccessingCamera}
          flash={setBeforeCapture}>
          <CameraInterface
            image={image}
            handleCapture={capture}
            openImage={() => setDisplayDetails(true)}
          />
        </Camera>
      </div>
      <ImgDetailPopup image={image} visible={displayDetails} handleClose={() => setDisplayDetails(false)}/>
      </div>
  );
}

export default App;
