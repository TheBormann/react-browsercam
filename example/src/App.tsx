import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  //const { image, isAccessingCamera, videoRef, capture, setBeforeCapture } = useCapture({});
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <div className="w-60 h-60">
        {/*
        <Camera
          videoRef={videoRef}
          isAccessingCamera={isAccessingCamera}
          flash={setBeforeCapture}
          {...args}>
          <CameraInterface
            image={image}
            handleCapture={capture}
            openImage={() => setDisplayDetails(true)}
          />
        </Camera>
      </div>
      <ImgDetailPopup image={image} visible={displayDetails} handleClose={() => setDisplayDetails(false)}/>
  */}
      </div>
    </div>
  );
}

export default App;
