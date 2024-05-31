import React, { useEffect, useState } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { EventModel } from "~~/models/event.model";
import { notification } from "~~/utils/scaffold-eth";

interface IEventProps {
  event: EventModel;
  eventId: number;
}

export const Event: React.FC<IEventProps> = ({ event, eventId }) => {
  const { name, ticketSupply, ticketsMinted, description } = event;
  const { writeContractAsync, isSuccess, isPending } = useScaffoldWriteContract("Minter");
3
  const getAvailableTickets = () => {
    return Number(ticketSupply) - Number(ticketsMinted);
  };
  const handlePurchaseTicket = async (id: number) => {
    try {
      await writeContractAsync({
        functionName: "claimTicket",
        args: [BigInt(id)],
      });
    } catch (error) {
      notification.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notification.success("Ticket claimed!");
      event.ticketsMinted++;
    }
  }, [isSuccess]);

  return (
    <div className="card backdrop-blur-xl">
      <div className="card-body p-4 rounded-2xl">
        <figure className="max-h-[125px] rounded-[10px]">
          <Image
            src={"/logogm2.jpeg" }
            alt="Event"
            className="w-full"
            width={400}
            height={400}
          />
        </figure>
        <div className="text-left mb-4 spacing-y-2  text-sm">
          <h2 className="card-title mb-2 text-2xl">{name}</h2>
          <p>
            <span className="opacity-70">Description:</span> {description}
          </p>
          <p>
            <span className="opacity-70">Available Tickets:</span> {getAvailableTickets()}
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
        <button
            className="btn btn-primary"
            disabled={isPending || getAvailableTickets() === 0}
            onClick={() => handlePurchaseTicket(eventId)}
          >   Get Your Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
