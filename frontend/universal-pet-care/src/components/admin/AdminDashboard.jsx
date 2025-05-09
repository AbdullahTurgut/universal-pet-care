import React, { useEffect, useState } from "react";
import { AdminOverview } from "./AdminOverview";
import { AdminDashboardSidebar } from "./AdminDashboardSidebar";
import { VeterinarianComponent } from "./VeterinarianComponent";
import { PatientComponent } from "./PatientComponent";

export const AdminDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeContent, setActiveContent] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleNavigate = (component) => {
    setActiveContent(component);
    localStorage.setItem("activeContent", component);
  };

  useEffect(() => {
    const storedActiveContent =
      localStorage.getItem("activeContent") || "overview";
    setActiveContent(storedActiveContent);
  });

  return (
    <main className="admin-body">
      <div className="grid-container">
        <AdminDashboardSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          onNavigate={handleNavigate}
          activeTab={activeContent}
        />
        <div className="main-container">
          {activeContent === "overview" && <AdminOverview />}
          {activeContent === "veterinarians" && <VeterinarianComponent />}
          {activeContent === "patients" && <PatientComponent />}
        </div>
      </div>
    </main>
  );
};
