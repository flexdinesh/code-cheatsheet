// @ts-nocheck
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExampleComponent } from './example-component';

export default {
  title: 'Components/ExampleComponent',
  component: ExampleComponent,
} as ComponentMeta<typeof ExampleComponent>;

const Template: ComponentStory<typeof ExampleComponent> = (args) => {
  return <ExampleComponent {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
