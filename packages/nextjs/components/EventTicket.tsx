import React from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { EventModel } from "~~/models/event.model";


const EventTicket: React.FC<EventModel> = (event) => {
  const {name, date, description} = event
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp)); // Convierte el BigInt a un número y luego a un objeto Date
    return date.toLocaleDateString(); // Puedes personalizar el formato si lo deseas
  };

  return (
    <div className="ticket rounded-lg shadow-md py-4 px-10 flex items-center justify-center gap-2">
      <Image src={"/logogm2.jpeg"} alt="Ticket" width={300} height={300} className="border-image" />
      <div className=" p-4 py-8 w-full h-40 flex flex-col items-start justify-center">
        <h2 className="card-title text-2xl">{name}</h2>
        <div className="flex flex-row gap-2 items-center justify-center">
          <CalendarDays />
          <p className="text-lg">{formatDate(date)}</p>
        </div>
        <p className="text-pretty text-left">{description}</p>
      </div>
    </div>
  );
};

export default EventTicket;
