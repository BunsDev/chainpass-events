"use client";

import { CalendarX } from "lucide-react";
import type { NextPage } from "next";
import { CreateEvent } from "~~/components/CreateEvent";
import { Event } from "~~/components/Event";
import { useGlobalState } from "~~/services/store/store";

const Home: NextPage = () => {
  const { incomingEvents } = useGlobalState(state => ({
    incomingEvents: state.incomingEvents,
  }));

  return (
    <>
      <div className="text-center mt-20 max-w-4xl mx-auto px-4 md:-px-0">
        <div className="">
          <span className="block text-md text-secondary">GET READY</span>
          <h1 className="text-[52px] font-bold font-title">
            Upcoming Events <span>🔥</span>
          </h1>
        </div>
        <p className="text-lg mt-8">
          Expand your knowlegde with like-minded.{" "}
          <span className=" text-lg font-bold">
            Check out the list of events below and sign up for the ones that interest you the most.
          </span>
        </p>
        {incomingEvents?.length !== 0 && (
          <div className="mt-6">
            <CreateEvent />
          </div>
        )}
        <>
          {incomingEvents?.length == 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-3xl w-full mt-12 bg-gradient-to-r from-[rgba(241,241,241,0.08)] to-[rgba(7,7,7,0)]  backdrop-blur-xl ">
              <CalendarX size="70" />
              <CreateEvent />
              <p className="text-white text-lg">There are no available events</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mt-12">
                {incomingEvents.map(event => (
                  <Event key={event.id} {...event} />
                ))}
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Home;
