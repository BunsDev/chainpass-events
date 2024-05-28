"use client";

import type { NextPage } from "next";
import { CreateEvent } from "~~/components/CreateEvent";
import { IncomingEvents } from "~~/components/IncomingEvents";

const EventsPage: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 w-8/12  mx-auto  p-10 rounded-lg  spacing-y-2">
        <header className=" text-white p-4">
          <h1 className="text-5xl mb-4  font-bold ">Upcoming Events</h1>
          <p className="  text-zinc-200  leading-loose">
            We are excited to invite you to our upcoming events! Whether you're looking to expand your knowledge,
            network with like-minded individuals, or simply have a great time, our events offer something for everyone.
            Join us and be a part of our vibrant community. Don’t miss out on these opportunities to learn, connect, and
            grow. Check out the list of events below and sign up for the ones that interest you the most. We look
            forward to seeing you there!
          </p>
        </header>
        <CreateEvent />
      </div>

      <main className="mx-12 w-full">
        <IncomingEvents />
      </main>
    </>
  );
};

export default EventsPage;
