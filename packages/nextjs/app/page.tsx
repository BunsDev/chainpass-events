"use client";

import { CalendarX } from "lucide-react";
import type { NextPage } from "next";
import { CreateEvent } from "~~/components/CreateEvent";

const Home: NextPage = () => {
  return (
    <>
      <div className="text-center flex items-center flex-col flex-grow mt-20 gap-2  max-w-4xl mx-auto px-4 md:-px-0">
        <div className="space-y-2">
          <span className="block text-md text-secondary">GET READY</span>
          <h1 className="text-[52px] font-bold">
            Upcoming Events <span>🔥</span>
          </h1>
        </div>
        <p className="text-lg">
          Expand your knowlegde with like-minded.{" "}
          <span className=" text-lg font-bold">
            Check out the list of events below and sign up for the ones that interest you the most.
          </span>
        </p>
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-3xl w-full mt-12 bg-gradient-to-r from-[rgba(241,241,241,0.08)] to-[rgba(7,7,7,0)]  backdrop-blur-xl ">
          <CalendarX size="70" />
          <p className="text-white text-lg">There are no available events</p>
          <CreateEvent />
        </div>
      </div>
    </>
  );
};

export default Home;
