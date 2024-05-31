import React, { useState, useEffect } from "react";
import { Event } from "./Event";
import { EventModel } from "~~/models/event.model";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const IncomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const { data: minterContract } = useScaffoldContract({
    contractName: "Minter",
  });

  const { data: totalEvents, isLoading } = useScaffoldReadContract({
    contractName: "Minter",
    functionName: "getTotalEvents",
    watch: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        try {
          const eventsFetched = [];
          if (totalEvents && totalEvents > 0) {
            for (let i = 0; i < totalEvents; i++) {
              eventsFetched.push(await minterContract?.read.getEvent([BigInt(i)]));
            }
            setEvents(eventsFetched as EventModel[]);
          }
        } catch (error: any) {
          notification.error("Error fetching total events:", error);
        }
      }
    };

    fetchData();
  }, [totalEvents, isLoading, minterContract?.read]);

  console.log(events)
  
  return (
    <div className="card w-96 glass">
      {events.length === 0 ? (
        <div className="border-accent border-2 flex  justify-center  items-center mx-auto  bg-secondary max-w-64  min-h-48 rounded-xl">
          <p className=" text-zinc-500  font-light text-lg">No events available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
            <Event key={index} eventId={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
