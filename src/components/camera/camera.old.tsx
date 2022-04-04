import React, { useState } from 'react';
import PhotoFab from './components/photo_fab';
import Flash from './components/flash';
import ImgListPopUp from './components/img_list_popup';
import useFullscreenStatus from './hooks/use_fullscreen_status';
import { useCapture } from './hooks/use_capture';

/**
 * Camera app component
 *
 * @author [Lukas Bormann]
 */
export function Camera({ ...props }) {
  const [image, mediaStream, videoRef, capture] = useCapture();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const maximizableElement = React.useRef(null);
  let isFullscreen: boolean | (() => void), setIsFullscreen: ((arg0: boolean) => void) | undefined;
  let errorMessage: string;
  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement);
  } catch (e) {
    errorMessage = 'Fullscreen not supported';
    isFullscreen = false;
    setIsFullscreen = undefined;
  }

  // TODO: CHANGE THIS, should not be in here
  const handleImages = (img: Array<Blob>) =>{
    console.dir(img);
  }

  const handleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
    }
  };

  function handleCanPlay() {
    setIsVideoPlaying(true);
  }

  if (mediaStream === null) {
    return (
      <div className={`fixed width-full height-full flex align-middle justify-center`}>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> 
        <h4>Accessing Camera</h4>
      </div>
    );
  }

  return (
    <div ref={maximizableElement}>
      <ImgListPopUp
        visible={isDetailOpen}
        isDetailOpen={setIsDetailOpen}
        handleImages={handleImages}
      />
      <div className={`fixed width-full height-full`}>
        <video
          ref={videoRef}
          onCanPlay={handleCanPlay}
          hidden={!isVideoPlaying}
          autoPlay
          playsInline
          muted
          className={`width-full height-full bg-cover bg-center `}
        />

        <Flash flash={isFlashing} onAnimationEnd={() => setIsFlashing(false)} />

        {/* Bottom navigation*/}
        {images[images.length - 1] && (
          <Box
            component="img"
            sx={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              borderRadius: 5,
              boxShadow: 10,
              height: 70,
              width: 70,
              objectFit: 'cover',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            alt="Preview Image"
            src={images[images.length - 1] && URL.createObjectURL(images[images.length - 1].src)}
            onClick={() => {
              setIsDetailOpen(true);
            }}
          />
        )}

        <Box
          sx={{
            position: 'absolute',
            bottom: 25,
            left: wSize.width / 2,
            ml: '-30px'
          }}>
          <PhotoFab onClick={capture}>
            <CameraIcon />
          </PhotoFab>
          <PhotoFab onClick={handleFullscreen} sx={{ ml: 2 }}>
            <Fullscreen />
          </PhotoFab>
        </Box>
      </div>
    </div>
  );
}

export default Camera;
