import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-22"> {/* padding to avoid Navbar overlap */}
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
