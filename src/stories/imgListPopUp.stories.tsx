// File: src/stories/camera.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ImgListPopUp from '../components/camera/components/img_list_popup';

export default {
  title: 'Example/ImgListPopUp',
  component: ImgListPopUp
} as Meta;

const Template: Story = (args) => <ImgListPopUp {...args} />;
export const Default = Template.bind({});
