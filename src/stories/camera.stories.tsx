// File: src/stories/camera.stories.tsx

import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Camera } from '../components';
import CameraInterface from '../components/camera/components/camera_interface';
import { useCapture } from '../components/camera/hooks/use_capture';
import ImgDetailPopup from '../components/camera/components/img_detail_popup';

export default {
  title: 'Example/Camera',
  component: Camera
} as Meta;

const Template: Story = (args) => {
  const { image, isAccessingCamera, videoRef, capture, setBeforeCapture } = useCapture({});
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <>
      <div className="w-60 h-60">
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
    </>
  );
};
export const Default = Template.bind({});
