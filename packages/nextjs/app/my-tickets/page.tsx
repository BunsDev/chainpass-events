"use client";

import type { NextPage } from "next";
import TicketList from "~~/components/TicketList";

const EventsPage: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-4xl my-0">My tickets</h1>
        </header>

        <main className="p-4">
          <TicketList />
        </main>
      </div>
    </>
  );
};

export default EventsPage;
