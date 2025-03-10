"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { useRouter } from "next/navigation";

function Login_signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login & register
  const handleSubmit = async (e, action) => {
    e.preventDefault();
    setError("");

    const endpoint = action === "login" ? "login" : "register";
    const requestData = action === "login"
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`https://fintrack-u5iw.onrender.com/api/users/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();  // ✅ Ensure 'data' is assigned before logging
      console.log(`${action} successful:`, data);

      alert(`${action === "login" ? "Login" : "Registration"} successful!`);

      if (action === "login") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        router.push("/dashboard"); // Redirect after login
      }
    } catch (err) {
      setError(err.message);
      console.error(`❌ ${action} error:`, err);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl p-10 shadow-xl bg-white rounded-2xl"
      >
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg p-1">
            <TabsTrigger value="login" className="text-xl py-3 hover:bg-gray-300 hover:text-black transition-colors duration-200 ease-in-out rounded-lg">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="text-xl py-3 hover:bg-gray-300 hover:text-black transition-colors duration-200 ease-in-out rounded-lg">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, "login")} className="mt-8 space-y-6">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Input type="email" name="email" placeholder="Email" className="text-lg h-14 px-5" value={formData.email} onChange={handleChange} required />
              <Input type="password" name="password" placeholder="Password" className="text-lg h-14 px-5" value={formData.password} onChange={handleChange} required />
              <Button type="submit" className="w-full h-14 text-lg">Login</Button>
            </form>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register">
            <form onSubmit={(e) => handleSubmit(e, "register")} className="mt-8 space-y-6">
              <Input type="text" name="name" placeholder="Full Name" className="text-lg h-14 px-5" value={formData.name} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Email" className="text-lg h-14 px-5" value={formData.email} onChange={handleChange} required />
              <Input type="password" name="password" placeholder="Password" className="text-lg h-14 px-5" value={formData.password} onChange={handleChange} required />
              <Button type="submit" className="w-full h-14 text-lg">Register</Button>
            </form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

export default Login_signup;
