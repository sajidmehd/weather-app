/** @format */
"use client";

import React, { useState } from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";

function Navbar() {
  // const [city, setCity] = useState("");

  // const [place, setPlace] = useState("berlin");
  // const [_, setLoadingCity] = useState(false);

  // const API_KEY = "13e936f37776c8974193a683f099f69f";

  // function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
  //   setLoadingCity(true);
  //   e.preventDefault();
  //   setPlace(city);
  // }

  // async function handleInputChang(value: string) {
  //   setCity(value);
  //   if (value.length >= 3) {
  //     try {
  //       const response = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
  return (
    <>
      <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
        {/* <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
          <span className="flex items-center justify-center gap-2  ">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny />
          </span>
          <section className="flex gap-2 items-center">
            {/* <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm"> Berlin </p> */}
            {/* SearchBox */}

            {/* <SearchBox
              value={city}
              onSubmit={handleSubmiSearch}
              onChange={(e) => handleInputChang(e.target.value)}
            />
          </section> */}
        {/* </div> */} */}
      </nav>
    </>
  );
}

export default Navbar;
