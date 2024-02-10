import React from "react";
import Hero from "../../assets/images/hero.png";

function HeroSection() {
  return (
    <div className="m-0 p-0 ">
      <div className="relative">
        <img
          className="w-full h-64 md:h-auto object-cover"
          src={Hero}
          alt="Hero Image"
        />
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-2xl text-white md:text-5xl">Shop and enjoy</h1>
        </div> */}
      </div>
    </div>
  );
}

export default HeroSection;
