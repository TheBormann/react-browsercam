// File: src/stories/camera.stories.tsx

import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Camera } from '../components';
import CameraInterface from '../components/camera/components/camera_interface';

export default {
  title: 'Example/Camera',
  component: Camera
} as Meta;

const Template: Story = (args) => {
  const camera = useRef(null);

  const [image, setImage] = useState<Blob | null>(null);


  return <div className="w-60 h-60">
    <Camera ref={camera} {...args}>
      <CameraInterface image={image} handleCapture={() => {
            if(camera.current === null) return;
            const photo = camera.current.takePhoto('base64');
            setImage(photo);
        }} />
    </Camera>
  </div>
};
export const Default = Template.bind({});
