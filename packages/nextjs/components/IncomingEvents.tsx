import React from "react";
import { Event } from "./Event";
import { useGlobalState } from "~~/services/store/store";

export const IncomingEvents: React.FC = () => {
  const { incomingEvents } = useGlobalState(state => ({
    incomingEvents: state.incomingEvents,
  }));

  return (
    <div>
      {incomingEvents.length === 0 ? (
        <div className="text-center">
          <p>No events available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomingEvents.map(event => (
            <Event key={event.id} {...event} />
          ))}
        </div>
      )}
    </div>
  );
};
