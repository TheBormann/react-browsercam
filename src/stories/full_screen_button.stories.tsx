import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FullScreenButton  from '../components/camera/components/full_screen_button';

export default {
  title: 'Components/Fullscreen',
  component: FullScreenButton,
} as Meta;

const Template: Story = ({ args }) => <FullScreenButton onClick={() => {}} {...args} />;
export const Default = Template.bind({});
