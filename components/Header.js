import Image from "next/image";
import React, { useState } from "react";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

const Header = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleSearch = () => {
    //     router.push({
    //         pathname: '/search',
    //         query: {
    //             location:searchTerm,
    //             startDate: startDate.toISOString(),
    //             endDate: endDate.toISOString(),
    //             noOfGuests,
    //         },
    // })
    setOpen(false);
    setSearchTerm("");
  };

  const resetSearch = () => {
    setSearchTerm("");
    setOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 grid grid-cols-3 
            bg-white shadow-md p-5 md:px-10"
    >
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt="header"
        />
      </div>
      <div
        className="flex items-center rounded-full py-2 
                md:shadow-sm md:border-2"
      >
        <input
          placeholder={placeholder || "Start your search"}
          onChange={(e) => handleSearchTerm(e)}
          value={searchTerm}
          className="pl-5 outline-none text-sm text-gray-600 placeholder-gray-400
                    bg-transparent flex-grow"
          type="text"
        />
        <SearchIcon
          className="hidden md:inline-flex h-8 
                    bg-red-400 text-white rounded-full p-2 
                    cursor-pointer md:mx-2"
        />
      </div>

      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {open && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min={1}
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex">
            <button onClick={resetSearch} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={handleSearch} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
