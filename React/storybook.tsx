// @ts-nocheck
/** @jsxImportSource @emotion/react */
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HelloComponent } from './HelloComponent';

export default {
  title: 'Components/HelloComponent',
  component: HelloComponent,
  parameters: {
    // to disable chromatic snapshot reviews
    chromatic: { disableSnapshot: false },
  },
} as ComponentMeta<typeof HelloComponent>;

const Template: ComponentStory<typeof HelloComponent> = (args) => {
  return <HelloComponent {...args}></HelloComponent>;
};

export const Default = Template.bind({});
Default.args = {};
