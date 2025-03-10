"use client";

import React from "react";
import { MoreVertical } from "lucide-react";

function DashboardHeader({ onToggleSidebar }) {
    return (
        <div className="w-full h-16 bg-white shadow-md flex items-center px-5 md:hidden">
            {/* ☰ Open Button */}
            <button className="text-gray-600 hover:text-black" onClick={onToggleSidebar}>
                <MoreVertical size={24} />
            </button>
        </div>
    );
}

export default DashboardHeader;
