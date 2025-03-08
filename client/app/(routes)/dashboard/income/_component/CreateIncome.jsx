"use client"
import React, { useState, useEffect } from "react";
import EmojiPicker from 'emoji-picker-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "../../../../../components/ui/dialog"
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import Income from '../page'
import { toast } from "sonner"
import { useRouter } from "next/navigation";

function CreateIncome({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("🤭");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();

  // ✅ Ensure `localStorage` is accessed only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    }
  }, []);

  const onCreateIncome = async () => {
    try {
      if (!user || !user._id) {
        alert("User ID not found. Please log in.");
        return;
      }
  
      const response = await fetch("http://localhost:5000/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title: name, description: description, amount: amount }),
      });
  
      if (!response.ok) throw new Error("Failed to create income");
  
      const data = await response.json();
      console.log("Income Created:", data);
  
      // Reset Form
      setName("");
      setAmount("");
      setDescription("");
      setEmojiIcon("🤭");
  
      // ✅ Call refreshData AFTER successful creation
      refreshData();
  
    } catch (error) {
      console.error("Error in onCreateIncome:", error);
      alert(error.message);
    }
  };
  

  return (
    <div className="p-5 border-2 rounded-lg bg-white shadow-sm flex flex-col items-center justify-center h-[150px] cursor-pointer hover:shadow-lg">
      <Dialog asChild>
        <DialogTrigger>
          <div className="w-full flex flex-col items-center justify-center ">
            <h2 className="text-3xl">+</h2>
            <h2 className="text-lg font-medium">Create New Income</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Income</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Income Name</h2>
                  <Input placeholder="e.g. Salary" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Income Description</h2>
                  <Input placeholder="e.g. Credited on 1/5/2025" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Income Amount</h2>
                  <Input type="number" placeholder="e.g. 50000/-" onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => {
                  onCreateIncome();
                  refreshData();
                  toast("Income has been Created", {
                    action: {
                      label: "Exit",
                      onClick: () => console.log("Exit"),
                    },
                  });
                }}
                className="mt-5 w-full"
              >
                Create Income
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default CreateIncome;


//
