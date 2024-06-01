import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";

const ProductPlan = () => {
  return (
    <ul className="timeline timeline-vertical">
      <li>
        <div className="timeline-end timeline-box">
          <h2 className="text-4xl">Product Plan 💥</h2>
        </div>
        <hr className="bg-purple-500" />
      </li>
      <li>
        <hr className="bg-purple-500" />
        <div className="timeline-start timeline-box">
          <ProductCard
          title={"Q3 2024: Blockchain Event Creation and Ticketing "}
            descriptionOne="Create Events Using Blockchain: Integrate blockchain technology to enable event organizers to create and manage events seamlessly."
            descriptionTwo="Ticket Issuance via Blockchain: Allow users to obtain tickets through a secure, decentralized platform, ensuring transparency and reducing fraud."
          />
        </div>
        <div className="timeline-middle">
          <Image src={"home/circle-checked.svg"} width={33} height={33} alt="circle-checked"></Image>
        </div>
        <hr className="timeline-color-unchecked" />
      </li>
      <li>
        <hr className="timeline-color-unchecked" />
        <div className="timeline-middle">
          <Image src={"home/circle-unchecked.svg"} width={33} height={33} alt="circle-checked"></Image>
        </div>
        <div className="timeline-end timeline-box">
          <ProductCard title={"Q4 2024: Exclusive Raffle Participation System"} 
          descriptionOne=
          "Raffle System for Ticket Holders: Implement a system that allows users to participate in exclusive raffles simply by holding a ticket or having hosted an event with us."
          descriptionTwo="Incentive-Based Participation: Encourage user engagement by offering unique rewards and experiences for raffle participants." />
        </div>
        <hr className="timeline-color-unchecked" />
      </li>
      <li>
        <hr className="timeline-color-unchecked" />
        <div className="timeline-start timeline-box">
          {" "}
          <ProductCard
          title={"Q1 2025: P2P Ticket Sales and Cryptocurrency Integration"}
          descriptionOne="P2P Ticket Sales: Develop a peer-to-peer ticket resale platform that allows users to buy and sell tickets securely."
          descriptionTwo="Cryptocurrency Payment Options: Introduce the ability for users to purchase tickets using various cryptocurrencies, broadening payment options and enhancing convenience." />
        </div>
        <div className="timeline-middle">
          <Image src={"home/circle-unchecked.svg"} width={33} height={33} alt="circle-checked"></Image>
        </div>
        <hr className="timeline-color-unchecked" />
      </li>
      <li>
        <hr className="timeline-color-unchecked" />

        <div className="timeline-middle">
          <Image src={"home/circle-unchecked.svg"} width={33} height={33} alt="circle-checked"></Image>
        </div>
        <div className="timeline-end timeline-box">
          {" "}
          <ProductCard
          title={"Q2 2025: Rating and Reputation System"}
          descriptionOne="User Rating System: Introduce a rating system that allows users to rate events and organizers, fostering trust and improving service quality."
          descriptionTwo="Reputation Benefits: Offer special benefits and incentives to users based on their reputation and activity within the platform, encouraging positive behavior and active participation."
          />
          
        </div>
      </li>
    </ul>
  );
};

export default ProductPlan;
