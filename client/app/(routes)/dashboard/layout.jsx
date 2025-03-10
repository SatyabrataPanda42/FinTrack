"use client";
import React, { useState } from "react";
import SideNav from "./_component/SideNav";
import DashboardHeader from "./_component/DashboardHeader";

function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar with Close Button */}
            <SideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex flex-col flex-1 md:ml-64">
                {/* Header with Menu Button */}
                <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Page Content */}
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}

export default DashboardLayout;
