"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import HomeCard from "~~/components/HomeCard";
import ProductPlan from "~~/components/ProductPlan";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="text-center mt-20 max-w-4xl mx-auto px-4 md:-px-0">
        <main className="flex flex-col items-center justify-center text-center px-4 py-16 space-y-12 gap-24">
          <div className="space-y-8">
          <h1 className="text-6xl font-bold">
            The Next-Gen{" "}
            <span className="inline-block align-middle animate-cube-spin ">
              <Image src="/home/title-cube.svg" alt="Cube" width={54} height={63} />
            </span>{" "}
            DApp for Seamless Event Ticketing
          </h1>
          <p className="text-md">
            An innovative, <span className="font-semibold">decentralized platform</span> designed to revolutionize the
            way organizers and attendees manage event tickets
          </p>
          <div className="flex w-[400px] mx-auto mt-6">
            <button className="btn btn-neutral mr-1 font-normal flex-1 " onClick={() => router.push("/events")}>
              Events
            </button>
            <button className="btn btn-primary font-normal flex-1" onClick={() => router.push("/my-tickets")}>
              My Tickets
            </button>
          </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">OUR NETWORKS</h2>
            <div className="flex space-x-8 animate-pulse" id="keybenefits" >
              <Image src="/home/ethereum-logo.svg" alt="Ethereum" width={230} height={55} />
              <Image src="/home/polygon-logo.svg" alt="Polygon" width={230} height={55} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-500">KEY BENEFITS</h2>
            <p className="text-3xl">Attention Grabbing Headline ✨</p>
          </div>
          <div className="flex justify-center space-x-4">
            <HomeCard
              icon="/home/ticket-icon.svg"
              title="Cross-Blockchain"
              description="Ticket transfer between different blockchains, guaranteeing security and reliability."
            />
            <HomeCard
              icon="/home/secure-icon.svg"
              title="Secure"
              description="Tickets issued as NFTs eliminate the risk of counterfeiting and unauthorized resale."
            />
            <HomeCard
              icon="/home/magnifier-icon.svg"
              title="Transparent"
              description="Monitor ticket issuance and distribution in real time with full transparency."
            />
          </div>

          <div className=" space-x-4" id="roadmap">
            <ProductPlan/>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
