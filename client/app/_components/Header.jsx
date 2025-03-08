"use client"; 
import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

function Header() { 
  const router = useRouter();

  return (
    <div className="p-5 py-1 flex justify-between items-center border shadow-sm">
      <Image 
        src="/logo.svg" // Ensure logo is in 'public/' folder
        alt="Logo"
        width={70}
        height={70}
        priority // Optimize for fast loading
      />
      <Button onClick={() => router.push("/login")}>Login / SignUp</Button>
    </div>
  );
}

export default Header;
