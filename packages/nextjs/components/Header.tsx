"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import Image from "next/image";
import { Head } from "next/document";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type DefaultMenu = {
  menuLinks: HeaderMenuLink[]
}

const homeMenuLinks : HeaderMenuLink[]= [
  {
    label: "Key Benefits",
    href: "/#keybenefits",
  },
  {
    label: "Roadmap",
    href: "/#roadmap",
  },
];

const defaultMenuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "My Tickets",
    href: "/my-tickets",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = ({ menuLinks }: DefaultMenu) => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href} className={`text-sm ${isActive ? "border-b-2 border-secondary font-bold" : ""}`}>
            <Link className={`${isActive ? "bg-transparent" : ""} hover:bg-transparent`} href={href} passHref scroll>
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const menuLinks = pathname === '/' ? homeMenuLinks : defaultMenuLinks;

  return (
    <div className="sticky bg-gradient-header lg:static top-0 navbar min-h-0 border-b-2 border-zinc-900 flex-shrink-0 justify-between z-20 px-0 sm:px-2  bg-gradient-to-r from-[rgba(255,255,255,.1)] to-[rgba(255,255,255,0)]  backdrop-blur-[5px]">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "" : ""}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 rounded-box w-52 "
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks menuLinks={menuLinks} />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex flex-wrap ml-4 gap-4 items-center">
            <Image src={"/logo.svg"} alt="Chain Pass logo" width={30} height={31} />
            <span className="font-bold leading-tight text-xl">ChainPass</span>
          </div>
        </Link>
      </div>
      <div>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks menuLinks={menuLinks} />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};