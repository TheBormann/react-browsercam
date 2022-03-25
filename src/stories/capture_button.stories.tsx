import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CaptureButton  from '../components/camera/components/capture_button';

export default {
  title: 'Components/Capture',
  component: CaptureButton,
} as Meta;

const Template: Story = ({ args }) => <CaptureButton onClick={() => {}} {...args} />;
export const Default = Template.bind({});
