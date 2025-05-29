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
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { createEvent, getAllEventsByCustomer } from "@/actions/events";
import { createReservation } from "@/actions/reservations";
import { toast } from "sonner";
import { Event } from "./customer/customer-main";

const NavBar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { cart, clearCart } = useCart();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const [addNewEventOpen, setAddNewEventOpen] = useState(false);
    const [addExistingEventOpen, setAddExistingEventOpen] = useState(false);

    const addNewEvent = async () => {
        if (session?.user.role !== "CUSTOMER") {
            toast.warning("You must be logged in as a customer to create an event.");
            handleCloseAddNewEvent();
            handleCloseSheet();
            return;
        }

        if (cart.length === 0) {
            toast.warning("Please add services to the cart before creating an event.");
            handleCloseAddNewEvent();
            handleCloseSheet();
            return;
        }

        if (!title || !type || !description || !date) {
            toast.warning("Please fill in all fields correctly.");
            return;
        }

        const event = await createEvent(title, description, date, type, "PENDING", String(session?.user.id));

        if (event.error) {
            toast.warning("Error creating event.");
            return
        }

        const eventId = event.event?.id

        if (!eventId) {
            toast.warning("Failed to get event ID.");
            return;
        }

        if (event.event === undefined) {
            toast.warning("Failed to get event ID.");
            return
        }

        try {
            await Promise.all(
                cart.map(service =>
                    createReservation(service, event.event, "PENDING")
                )
            )
            handleCloseAddNewEvent();
            handleCloseSheet();
            toast.success("Event and reservations created successfully!");

        } catch (error) {
            toast.warning("Failed to create reservations. Please try again.");
            handleCloseAddNewEvent();
            return;
        }
    }

    const addExistingEvent = async (event: Event) => {
        if (session?.user.role !== "CUSTOMER") {
            toast.warning("You must be logged in as a customer to add services to an existing event.");
            handleCloseAddExistingEventOpen();
            handleCloseSheet();
            return;
        }
        if (cart.length === 0) {
            toast.warning("Please add services to the cart before adding to an existing event.");
            handleCloseAddExistingEventOpen();
            handleCloseSheet();
            return;
        }

        if (!event || !event.id) {
            toast.warning("Please select an event.");
            return;
        }

        try {
            await Promise.all(
                cart.map(service =>
                    createReservation(service, event, "PENDING")
                )
            );
            handleCloseAddExistingEventOpen();
            handleCloseSheet();
            toast.success("Services added to the existing event successfully!");
        } catch (error) {
            toast.warning("Failed to add services to the existing event. Please try again.");
            handleCloseAddExistingEventOpen();
        }
    }

    const handleCloseAddNewEvent = () => {
        setAddNewEventOpen(false);
        setTitle("");
        setDescription("");
        setDate("");
        setType("");
    }

    const handleCloseAddExistingEventOpen = () => {
        setAddExistingEventOpen(false);
        setTitle("");
        setDescription("");
        setDate("");
        setType("");
    }

    const [sheetOpen, setSheetOpen] = useState(false);

    const handleCloseSheet = () => {
        setSheetOpen(false);
        clearCart();
    }

    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(false);

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (session?.user?.role !== "CUSTOMER" || !sheetOpen) return;

            setLoadingEvents(true);
            try {
                const events = await getAllEventsByCustomer(session.user.id);
                setUserEvents(events || []);
            } catch (error) {
                toast.error("Failed to fetch events. Please try again later.");
                setUserEvents([]);
            } finally {
                setLoadingEvents(false);
            }
        };

        fetchUserEvents();
    }, [session, sheetOpen]);



    return (
        <header>
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div>
                    <h1>Momentry</h1>
                </div>
                <div className="flex items-center gap-4">
                    {pathname === "/services" && (
                        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                                        <Dialog open={addNewEventOpen} onOpenChange={setAddNewEventOpen}>
                                            <DialogTrigger asChild>
                                                <Button className="flex-1/2">New Event</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add new event with the selected services</DialogTitle>
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
                                                    <DialogTitle>Add services to an existing event</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto">
                                                    {loadingEvents ? (
                                                        <p>Loading events...</p>
                                                    ) : userEvents.length === 0 ? (
                                                        <p>No events found.</p>
                                                    ) : (
                                                        userEvents.map(event => (
                                                            <div key={event.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-1 mb-4">
                                                                <span className="text-lg font-semibold">{event.title}</span>
                                                                <span className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</span>
                                                                <span className="text-gray-600">Type: {event.type}</span>
                                                                <Button
                                                                    className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
                                                                    onClick={() => {
                                                                        addExistingEvent(event);
                                                                    }}
                                                                >
                                                                    Choose
                                                                </Button>
                                                            </div>
                                                        ))
                                                    )}

                                                </div>
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