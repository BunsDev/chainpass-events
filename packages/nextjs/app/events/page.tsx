"use client";

import { useEffect, useState } from "react";
import { CalendarX } from "lucide-react";
import type { NextPage } from "next";
import { CreateEvent } from "~~/components/CreateEvent";
import { Event } from "~~/components/Event";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { EventModel } from "~~/models/event.model";
import { notification } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isFetchingEvents, setIsFetchingEvents] = useState<boolean>(false);
  const { data: minterContract, isLoading } = useScaffoldContract({
    contractName: "Minter",
  });

  const { data: totalEvents } = useScaffoldReadContract({
    contractName: "Minter",
    functionName: "getTotalEvents",
    watch: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsFetchingEvents(true);
      if (!isLoading) {
        try {
          const eventsFetched = [];
          if (totalEvents && totalEvents > 0) {
            for (let i = 0; i < totalEvents; i++) {
              eventsFetched.push(await minterContract?.read.getEvent([BigInt(i)]));
            }
            setEvents(eventsFetched as EventModel[]);
          }
        } catch (error: any) {
          notification.error("Error fetching total events:", error);
        }
      }
      setIsFetchingEvents(false);
    };
    fetchData();
  }, [totalEvents, isLoading]);

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

        {isFetchingEvents || isLoading ? (
          <div className="flex justify-center items-center mt-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {events && events?.length !== 0 && (
              <div className="mt-6">
                <CreateEvent />
              </div>
            )}
            <>
              {events && events.length === 0 ? (
                <div className="flex flex-col gap-4 items-center justify-center py-10 border-2 border-dashed rounded-3xl w-full mt-12 bg-gradient-to-r from-[rgba(241,241,241,0.08)] to-[rgba(7,7,7,0)] backdrop-blur-xl ">
                  <CalendarX size="70" />
                  <CreateEvent />
                  <p className="text-white text-lg">There are no available events</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-12">
                  {events.map((event, index) => (
                    <Event key={index} eventId={index} event={event} />
                  ))}
                </div>
              )}
            </>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
