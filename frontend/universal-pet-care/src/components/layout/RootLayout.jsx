import React from "react";
import { Outlet } from "react-router-dom";
import BackgroundImageSlider from "../common/BackgroundImageSlider";
import NavBar from "./Navbar";

const RootLayout = () => {
  return (
    <main>
      <NavBar />
      <BackgroundImageSlider />
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
