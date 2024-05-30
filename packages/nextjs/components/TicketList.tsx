import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Ticket } from "lucide-react";
import { useGlobalState } from "~~/services/store/store";

const TicketList: React.FC = () => {
  const { purchasedTickets } = useGlobalState(state => ({
    purchasedTickets: state.purchasedTickets,
  }));

  return (
    <div>
      {purchasedTickets.length === 0 ? (
        <div className="text-center flex items-center flex-col justify-center gap-4">
          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-3xl w-1/2 mt-12 bg-gradient-to-r from-[rgba(241,241,241,0.08)] to-[rgba(7,7,7,0)]  backdrop-blur-xl ">
            <Ticket width={80} height={80} />
            <p className="text-white text-lg">You don't have any ticket yet.</p>
          </div>
          <Link href={"/"}>
            <button className="btn btn-primary w-40">
              <span>
                {" "}
                <Eye width={25} height={25} />
              </span>
              See Events
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchasedTickets.map(ticket => (
            <div key={ticket.id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <Image src={ticket.imageUrl} alt="Ticket" width={400} height={400} />
              </figure>
              <div className="bg-secondary   p-4  py-8 rounded-b-2xl">
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
