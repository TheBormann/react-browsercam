// File: src/stories/camera.stories.tsx

import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Camera } from '../components';
import CameraInterface from '../components/camera/components/camera_interface';
import { useCapture } from '../components/camera/hooks/use_capture';

export default {
  title: 'Example/Camera',
  component: Camera
} as Meta;

const Template: Story = (args) => {
  const { image, isAccessingCamera, videoRef, capture, setBeforeCapture } = useCapture({});

  // TODO fix, that camera isn't showing if a percentage is given
  return <div className="w-60 h-60">
    <Camera videoRef={videoRef} isAccessingCamera={isAccessingCamera} flash={setBeforeCapture} {...args}>
      <CameraInterface image={image} handleCapture={capture} openImage={() => console.log("open Details")} />
    </Camera>
  </div>
};
export const Default = Template.bind({});
