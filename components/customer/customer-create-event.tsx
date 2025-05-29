'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createService } from "@/actions/services";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { createEvent } from "@/actions/events";
import { useSession } from "next-auth/react";

const CustomerCreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const { data: session } = useSession();

    const handleSubmit = async () => {
        if (session?.user.role !== "CUSTOMER") {
            alert("You must be logged in as a customer to create an event.");
            return;
        }

        if (!title || !type || !description || !date) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const event = await createEvent(title, description, date, type, "PENDING", String(session?.user.id));
        if ('error' in event) {
            alert(event.error);
        } else {
            alert(event.message);
            setTitle("");
            setType("");
            setDescription("");
            setDate("");
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <h1>Create Event</h1>
            <Input
                type="text"
                placeholder="Service Title"
                className="mb-4 w-full"
                value={title}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                type="date"
                placeholder="Service Date"
                className="mb-4 w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                    handleSubmit();
                }}
            >
                Create Event
            </Button>
        </div>
    );
}

export default CustomerCreateEvent;