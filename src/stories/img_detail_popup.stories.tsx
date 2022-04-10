// File: src/stories/camera.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ImgDetailPopup } from '../components/img_detail_popup';

export default {
  title: 'Example/ImgDetailPopup',
  component: ImgDetailPopup
} as Meta;

const Template: Story = (args) => <ImgDetailPopup handleClose={() => {}} image={"https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"} visible={true} {...args} />;

export const Default = Template.bind({});
