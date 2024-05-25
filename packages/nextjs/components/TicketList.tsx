import React from "react";
import { useGlobalState } from "~~/services/store/store";

const TicketList: React.FC = () => {
  const { purchasedTickets } = useGlobalState(state => ({
    purchasedTickets: state.purchasedTickets,
  }));

  return (
    <div>
      {purchasedTickets.length === 0 ? (
        <div className="text-center">
          <p>{`You don't have any tickets.`}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchasedTickets.map(ticket => (
            <div key={ticket.id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={ticket.imageUrl} alt="Ticket" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{ticket.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
