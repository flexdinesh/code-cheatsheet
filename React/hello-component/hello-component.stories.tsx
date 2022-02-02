// @ts-nocheck
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HelloComponent } from './HelloComponent';

export default {
  title: 'Components/HelloComponent',
  component: HelloComponent,
} as ComponentMeta<typeof HelloComponent>;

const Template: ComponentStory<typeof HelloComponent> = (args) => {
  return <HelloComponent {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
