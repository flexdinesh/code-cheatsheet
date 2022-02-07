// @ts-nocheck
import React from 'react';
import mitt from 'mitt';
import type { Emitter, EventType } from 'mitt';

/**
 * A small utility to send events with payload (messages) between components without context.
 * This works outside React's lifecycle.
 * Only use this when you want to communicate between components in sibling trees without re-rendering the parent tree.
 *
 * Eg. when progress is updated using goalhub, we publish that event and chart component listens to that event and
 * refetches API data after that.
 *
 * Please rememeber to wrap your callback method with React.useCallback hook or you'll be
 * subscribing and unsubscribing on every render in your component
 */
export const createEventEmitter = <Events extends Record<EventType, unknown>>({
  event,
}: {
  event: keyof Events;
}) => {
  const emitter: Emitter<Events> = mitt<Events>();

  const usePublishEvent = () => {
    React.useEffect(() => {
      return () => emitter.off(event);
    }, []);

    const publish = React.useCallback((payload: Events[typeof event]) => {
      emitter.emit(event, payload);
    }, []);

    return publish;
  };

  const useSubscribeEvent = ({
    callback,
  }: {
    callback: (payload: Events[typeof event]) => void;
  }) => {
    React.useEffect(() => {
      emitter.on(event, callback);

      return () => emitter.off(event, callback);
    }, [callback]);
  };

  return {
    usePublishEvent,
    useSubscribeEvent,
  };
};
