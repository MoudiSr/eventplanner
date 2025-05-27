'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createService } from "@/actions/services";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { createEvent } from "@/actions/events";

const CustomerCreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("PENDING");

    const handleSubmit = async () => {
        if (!title || !type || !description || !date || status === "") {
            alert("Please fill in all fields correctly.");
            return;
        }

        const event = await createEvent(title, description, date, type, "PENDING", "cmb52yf770000txl8q23jk2zm");
        if ('error' in event) {
            alert(event.error);
        } else {
            alert(event.message);
            setTitle("");
            setType("");
            setDescription("");
            setDate("");
            setStatus("");
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <h1>Create Service</h1>
            <Input 
                type="text"
                placeholder="Service Title"
                className="mb-4 w-full"
                onChange={(e) => setTitle(e.target.value)}
            />
            <Select onValueChange={setType} value={type}>
                <SelectTrigger className="mb-4 w-full">
                    <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Event Types</SelectLabel>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="graduation">Graduation</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Input 
                type="text"
                placeholder="Service Description"
                className="mb-4 w-full"
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                type="date"
                placeholder="Service Date"
                className="mb-4 w-full"
                onChange={(e) => setDate(e.target.value)}
            />
            <Button 
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                    handleSubmit();
                }}
            >
                Create Service
            </Button>
        </div>
    );
}

export default CustomerCreateEvent;