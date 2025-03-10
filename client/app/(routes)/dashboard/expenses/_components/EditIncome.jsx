"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../../../../components/ui/button";
import { PenBox } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "../../../../../components/ui/dialog";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fintrack-u5iw.onrender.com/api";

function EditIncome({ income, refreshData }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!income) return;

        console.log("Setting default values:", income);
        setTitle(income.title || "");
        setAmount(income.amount || "");
        setDescription(income.description || "");

        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) setToken(storedToken);
        }
    }, [income]);

    const onUpdateIncome = async () => {
        if (!income || !income._id) {
            alert("Income ID not found!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/income/${income._id}`, {
                method: "PUT", // ✅ Correct method
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, amount }), // ✅ Use title instead of name
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Failed to update income");
            }

            toast("Income has been updated!", {
                action: {
                    label: "Exit",
                    onClick: () => console.log("Exit"),
                },
            });

            refreshData(); // ✅ Check before calling
        } catch (error) {
            console.error("Error updating income:", error);
            alert(error.message);
        }
    };

    return (
        <Dialog asChild>
            <DialogTrigger>
                <Button className="flex gap-2">
                    <PenBox />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Income</DialogTitle>
                    <DialogDescription>
                        <div className="mt-5">
                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">Income Name</h2>
                                <Input
                                    placeholder="e.g. Salary"
                                    value={title} // ✅ Use title instead of name
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">Income Description</h2>
                                <Input
                                    placeholder="e.g. Credited on 1/5/2025"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">Income Amount</h2>
                                <Input
                                    type="number"
                                    placeholder="e.g. 50000/-"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            disabled={!(title && amount)}
                            onClick={onUpdateIncome}
                            className="mt-5 w-full"
                        >
                            Update Income
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditIncome;
