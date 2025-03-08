import { Button } from "../components/ui/button";
import Image from "next/image";
import Header from "./_components/Header"; // ✅ Import correctly with uppercase
import Hero from "./_components/Hero"; // ✅ Import correctly with uppercase
export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
