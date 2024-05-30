import React, { useEffect, useState } from "react";
import SeeEventsButton from "./SeeEventsButton";
import { Ticket } from "lucide-react";
import EventTicket, { EventTicketProps } from "~~/components/EventTicket";

const TicketList: React.FC = () => {
  const [purchasedTickets, setPurchasedTickets] = useState<EventTicketProps[]>([]);

  useEffect(() => {
    const initialTickets: EventTicketProps[] = Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      title: `Event Title ${index + 1}`,
      description: `Here’s goes a brief description of the event. Do not exceed the amount of characters.`,
      date: `2024-06-0${index + 1}`,
    }));
    setPurchasedTickets(initialTickets);
  }, []);

  return (
    <div className="w-full">
      {purchasedTickets.length === 0 ? (
        <div className="text-center flex items-center flex-col justify-center gap-4">
          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-3xl w-1/2 mt-12 bg-gradient-to-r from-[rgba(241,241,241,0.08)] to-[rgba(7,7,7,0)] backdrop-blur-xl ">
            <Ticket width={80} height={80} />
            <p className="text-white text-lg">You don't have any ticket yet.</p>
          </div>
          <SeeEventsButton />
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-6 px-40">
          <SeeEventsButton />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchasedTickets.map(ticket => (
              <EventTicket key={ticket.id} {...ticket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
