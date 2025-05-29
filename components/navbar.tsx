'use client';
import { AlignJustify, ShoppingBag } from "lucide-react";
import NavBarLinks from "./navbar-links";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCart } from "./context/cart-context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { createEvent } from "@/actions/events";
import { createReservation } from "@/actions/reservations";

const NavBar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { cart } = useCart();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const addNewEvent = async () => {
        if (!title || !type || !description || !date) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const event = await createEvent(title, description, date, type, "PENDING", String(session?.user.id));
        if (event.error) {
            alert(event.error)
            return
        }

        const eventId = event.event?.id
        
        if (!eventId) {
            alert("Failed to get event ID.");
            return;
        }

        if (event.event === undefined) {
            return
        }

        try {
            await Promise.all(
                cart.map(service => 
                    createReservation(service, event.event, "PENDING")
                )
            )
        } catch (error) {
            console.error("Error creating reservations:", error);
            alert("Failed to create reservations. Please try again.");
            return;
        }
    }

    return (
        <header>
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div>
                    <h1>Momentry</h1>
                </div>
                <div className="flex items-center gap-4">
                    {pathname === "/services" && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline">
                                    {"(" + cart.length + ")"}
                                    <ShoppingBag className="size-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>{"(" + cart.length + ")"} Selected Services</SheetTitle>
                                </SheetHeader>
                                <div className="p-2">
                                    {cart.map(service => (
                                        <div key={service.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-1 mb-4">
                                            <span className="text-lg font-semibold">{service.title}</span>
                                            <span className="text-gray-600">Price: ${service.price.toFixed(2)}</span>
                                            <span className="text-gray-600">Provider: {service.provider.username}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute bottom-0 w-full p-2">
                                    <span>Add services to event</span>
                                    <div className="flex w-full gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="flex-1/2">New Event</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add new event with these services</DialogTitle>
                                                </DialogHeader>
                                                <div>
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
                                                            addNewEvent();
                                                        }}
                                                    >
                                                        Create Event
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="flex-1/2">Existing Event</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be undone. This will permanently delete your account
                                                        and remove your data from our servers.
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                    )}
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="bg-background text-foreground hover:bg-background hover:text-foreground"><AlignJustify className="size-6" /></Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Navigation Menu</DrawerTitle>
                                <DrawerDescription>Check our services</DrawerDescription>
                            </DrawerHeader>
                            <NavBarLinks />
                            <DrawerFooter>
                                {session && <Button onClick={() => signOut()} className="w-full bg-red-500 text-white hover:bg-red-600">Log Out</Button>}
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </nav>
        </header>
    )
}
export default NavBar;