'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createService } from "@/actions/services";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";

const ProviderCreateService = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);

    const handleSubmit = async () => {
        if (!title || !type || price <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const service = await createService(title, type, price, "cmb52yf770000txl8q23jk2zm");
        if ('error' in service) {
            alert(service.error);
        } else {
            alert(service.message);
            setTitle("");
            setType("");
            setPrice(0);
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
                type="number"
                placeholder="Service Price"
                className="mb-4 w-full"
                onChange={(e) => setPrice(Number(e.target.value))}
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

export default ProviderCreateService;