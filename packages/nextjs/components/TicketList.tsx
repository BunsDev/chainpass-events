/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SeeEventsButton from "./SeeEventsButton";
import { Ticket } from "lucide-react";
import EventTicket from "~~/components/EventTicket";
import { notification } from "~~/utils/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { EventModel } from "~~/models/event.model";
import { useAccount } from "wagmi";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { data: minterContract } = useScaffoldContract({
    contractName: "Minter",
  });

  const { address } = useAccount();

  const { data: totalTickets, isSuccess } = useScaffoldReadContract({
    contractName: "Minter",
    functionName: "getUserTickets",
    args: [address],
    watch: true,
  });

  useEffect(() => {
    const fetchTickets = async () => {
        try {
          setIsLoading(true)
          const ticketsFetched = [];
          if (totalTickets && totalTickets.length > 0) {
            for (let i = 0; i < totalTickets.length; i++) {
              ticketsFetched.push(await minterContract?.read.getEvent([BigInt(totalTickets[i].eventId)]));
            }
            setTickets(ticketsFetched as EventModel[]);
          }
        } catch (error: any) {
          notification.error("Error fetching total events:", error);
        } finally {
          setIsLoading(false)
        }
    }
    fetchTickets();
  }, [totalTickets, isSuccess]);

  if (isLoading || !isSuccess) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  return (
    <div className="w-full">
      {tickets.length === 0 ? (
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
            {tickets.map((ticket, index) => (
              <EventTicket key={index} {...ticket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
