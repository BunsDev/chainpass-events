import React from "react";
import Image from "next/image";

export interface EventTicketProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

const EventTicket: React.FC<EventTicketProps> = ({ title, description, date }) => {
  return (
    <div className="ticket rounded-lg shadow-md py-4 px-10 flex items-center justify-center gap-2">
      <Image src={"/logogm2.jpeg"} alt="Ticket" width={300} height={300} className="border-image" />
      <div className=" p-4 py-8 w-full h-40">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default EventTicket;
