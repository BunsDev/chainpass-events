"use client";

import type { NextPage } from "next";
import TicketList from "~~/components/TicketList";

const EventsPage: NextPage = () => {
  return (
    <>
      <div className="text-center mt-4 w-8/12 mx-auto  p-10">
        <header className=" text-white p-4 mb-4">
          <h1 className="text-5xl  font-bold">My tickets</h1>
        </header>

        <TicketList />
      </div>
    </>
  );
};

export default EventsPage;
