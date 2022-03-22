import React from 'react';

interface CameraProps {
  facingMode: 'environment' | 'user';
  width: number;
  height: number;
  fullscreen: true;
  
}

function camera() {
  return <div>camera</div>;
}

export default camera;
