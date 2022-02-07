import { createEventEmitter } from './event-emitter';

const EventName = 'HELLO_WORLD';
type EventPayload = {
  name: string;
};

type HelloWorldEvent = {
  [EventName]: EventPayload;
};

export const {
  usePublishEvent: usePublishMeasureProgressUpdateEvent,
  useSubscribeEvent: useSubscribeMeasureProgressUpdateEvent,
} = createEventEmitter<HelloWorldEvent>({
  event: EventName,
});
