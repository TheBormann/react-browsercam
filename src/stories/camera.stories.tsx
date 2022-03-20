// File: src/stories/camera.stories.tsx

import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
import { Camera } from "../components";

export default {
    title: "Example/Camera",
    component: Camera,
} as Meta;

const Template: Story = (args) => <Camera {...args} />;
export const Default = Template.bind({});