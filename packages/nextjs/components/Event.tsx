import React, { useState } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { v4 as uuidv4 } from "uuid";
import { EventModel } from "~~/models/event.model";
import { useGlobalState } from "~~/services/store/store";

export const Event: React.FC<EventModel> = ({ id, title, description, imageUrl, availableTickets }) => {
  const { purchaseTicket } = useGlobalState(state => ({
    purchaseTicket: state.purchaseTicket,
  }));

  const handlePurchaseTicket = (id: string) => {
    try {
      const ticketId = uuidv4();
      // TODO: Connect to blockchain and mint token, if successful allow do local logic.

      purchaseTicket(ticketId, id);
    } catch {}
  };

  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className="card backdrop-blur-xl">
      <div className="card-body p-4 rounded-2xl">
        <figure className="max-h-[125px] rounded-[10px]">
          <Image
            src={imgError ? "/logogm2.jpeg" : imageUrl}
            alt="Event"
            className="w-full"
            width={400}
            height={400}
            onError={() => setImgError(true)}
          />
        </figure>
        <div className="text-left mb-4 spacing-y-2  text-sm">
          <h2 className="card-title mb-2 text-2xl">{title}</h2>
          <p>
            <span className="opacity-70">Description:</span> {description}
          </p>
          <p>
            <span className="opacity-70">Available Tickets:</span> {availableTickets}
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" onClick={() => handlePurchaseTicket(id)}>
            Get Your Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
