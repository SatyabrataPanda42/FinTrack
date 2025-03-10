"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";

function SideNav({ isOpen, setIsOpen }) {
    const path = usePathname();

    const menulist = [
        { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
        { id: 2, name: "Income", icon: PiggyBank, path: "/dashboard/income" },
        { id: 3, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
        { id: 4, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" }
    ];

    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
            {/* ❌ Close Button (Only on Small Screens) */}
            <button
                className="absolute top-5 right-5 text-gray-600 hover:text-black md:hidden"
                onClick={() => setIsOpen(false)}
            >
                <X size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center p-5">
                <Image src="/logo.svg" alt="Logo" width={130} height={100} priority />
            </div>

            {/* Menu Items */}
            <div className="mt-7">
                {menulist.map((menu) => (
                    <Link key={menu.id} href={menu.path} passHref>
                        <h2 className={`flex gap-2 items-center text-gray-900
                            font-medium p-5 cursor-pointer rounded-md hover:text-white 
                            hover:bg-secondary transition duration-200 mb-3 
                            ${path === menu.path && "text-primary bg-green-100"}`}
                            onClick={() => setIsOpen(false)} // Close sidebar on click
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SideNav;
