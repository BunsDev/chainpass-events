"use client";

import type { NextPage } from "next";
import { CreateEvent } from "~~/components/CreateEvent";
import { IncomingEvents } from "~~/components/IncomingEvents";

const EventsPage: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-4xl my-0">Upcoming Events</h1>
          <p className="text-neutral">
            We are excited to invite you to our upcoming events! Whether you're looking to expand your knowledge,
            network with like-minded individuals, or simply have a great time, our events offer something for everyone.
            Join us and be a part of our vibrant community. Don’t miss out on these opportunities to learn, connect, and
            grow. Check out the list of events below and sign up for the ones that interest you the most. We look
            forward to seeing you there!
          </p>
        </header>

        <main className="p-4">
          <CreateEvent />
          <div className="my-4"></div>

          <IncomingEvents />
        </main>
      </div>
    </>
  );
};

export default EventsPage;
