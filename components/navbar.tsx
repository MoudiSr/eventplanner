'use client';
import { AlignJustify, ShoppingBag } from "lucide-react";
import NavBarLinks from "./navbar-links";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCart } from "./context/cart-context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { createEvent, getAllEventsByCustomer } from "@/actions/events";
import { createReservation } from "@/actions/reservations";
import { toast } from "sonner";
import { Event } from "./customer/customer-main";
import Link from "next/link";

const NavBar = () => {
    const { data: session } = authClient.useSession();
    const pathname = usePathname();

    const { cart, clearCart } = useCart();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const [addNewEventOpen, setAddNewEventOpen] = useState(false);
    const [addExistingEventOpen, setAddExistingEventOpen] = useState(false);
    const handleSignOut = async () => {
        await authClient.signOut();
    };

    const addNewEvent = async () => {
        if (session?.user?.role !== "CUSTOMER") {
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

        const event = await createEvent(title, description, date, type, "PENDING", String(session?.user?.id));

        if (event.error) {
            toast.warning("Error creating event.");
            return;
        }

        const eventId = event.event?.id;

        if (!eventId) {
            toast.warning("Failed to get event ID.");
            return;
        }

        if (event.event === undefined) {
            toast.warning("Failed to get event ID.");
            return;
        }

        try {
            await Promise.all(
                cart.map(service =>
                    createReservation(service, event.event, "PENDING")
                )
            );
            handleCloseAddNewEvent();
            handleCloseSheet();
            toast.success("Event and reservations created successfully!");

        } catch (error) {
            toast.warning("Failed to create reservations. Please try again.");
            handleCloseAddNewEvent();
            return;
        }
    };

    const addExistingEvent = async (event: Event) => {
        if (session?.user?.role !== "CUSTOMER") {
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
    };

    const handleCloseAddNewEvent = () => {
        setAddNewEventOpen(false);
        setTitle("");
        setDescription("");
        setDate("");
        setType("");
    };

    const handleCloseAddExistingEventOpen = () => {
        setAddExistingEventOpen(false);
        setTitle("");
        setDescription("");
        setDate("");
        setType("");
    };

    const [sheetOpen, setSheetOpen] = useState(false);

    const handleCloseSheet = () => {
        setSheetOpen(false);
        clearCart();
    };

    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(false);

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (session?.user?.role !== "CUSTOMER" || !session?.user?.id || !sheetOpen) return;

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

    const navLinks = useMemo(() => [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        session?.user?.role === "CUSTOMER" ? { href: "/customer", label: "Profile" } : null,
        session?.user?.role === "PROVIDER" ? { href: "/provider", label: "Profile" } : null,
    ].filter(Boolean) as { href: string; label: string; }[], [session]);

    const primaryAction = session ? (
        <Button
            variant="ghost"
            onClick={handleSignOut}
            className="border border-white/15 text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
        >
            Log out
        </Button>
    ) : (
        <div className="hidden items-center gap-2 sm:flex">
            <Link href="/logIn">
                <Button variant="ghost" className="border border-white/15 text-white hover:border-white/40 hover:bg-white/10 hover:text-white">
                    Sign in
                </Button>
            </Link>
            <Link href="/signUp">
                <Button className="bg-gradient-to-r from-[#7aa2ff] via-[#86f2d3] to-[#b46bff] text-black shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-400/40">
                    Get started
                </Button>
            </Link>
        </div>
    );

    return (
        <header className="sticky top-4 z-50">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]/80 text-white shadow-xl shadow-indigo-900/30 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(134,242,211,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(122,162,255,0.14),transparent_40%)]" />
                    <div className="relative flex items-center justify-between px-4 py-3 sm:px-6">
                        <Link href="/" className="group flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#86f2d3] via-[#7aa2ff] to-[#b46bff] text-black shadow-lg shadow-indigo-500/30">EP</span>
                            <span className="hidden text-sm uppercase tracking-[0.16em] text-white/70 transition group-hover:text-white sm:block">Event Planner</span>
                        </Link>

                        <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`transition hover:text-white ${pathname === link.href ? "text-white" : ""}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            {pathname === "/services" && (
                                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                                    <SheetTrigger asChild>
                                        <Button className=" text-white border-white/40 bg-white/10 hover:bg-white/15">
                                            <span className="mr-2 rounded-full bg-white/10 px-2 py-1 text-xs text-white/80">{cart.length}</span>
                                            <ShoppingBag className="size-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="flex w-full flex-col gap-4 bg-slate-950 border-0 text-white sm:max-w-lg">
                                        <SheetHeader>
                                            <SheetTitle className="flex items-center gap-3">
                                                <span className="text-white">Selected Services</span>
                                                <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">{cart.length}</span>
                                            </SheetTitle>
                                        </SheetHeader>
                                        <div className="flex-1 space-y-3 overflow-y-auto px-2">
                                            {cart.map(service => (
                                                <div key={service.id} className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-lg font-semibold text-white">{service.title}</span>
                                                        <span className="text-sm text-white/70">${service.price.toFixed(2)}</span>
                                                    </div>
                                                    <p className="text-sm text-white/60">Provider: {service.provider.username}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 shadow-inner">
                                            <p className="text-sm text-white/70">Add services to event</p>
                                            <div className="flex w-full flex-col gap-2 sm:flex-row">
                                                <Dialog open={addNewEventOpen} onOpenChange={setAddNewEventOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button className="w-full bg-[#86f2d3] text-black hover:bg-[#7ae8c8]">New Event</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-slate-950 text-white border-0">
                                                        <DialogHeader>
                                                            <DialogTitle>Add new event with the selected services</DialogTitle>
                                                            <DialogDescription className="text-white/70">Provide event details to create your booking.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-3">
                                                            <Input
                                                                type="text"
                                                                placeholder="Event title"
                                                                className="w-full border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}
                                                            />
                                                            <Select onValueChange={setType} value={type}>
                                                                <SelectTrigger className="w-full border-white/20 bg-white/5 text-white">
                                                                    <SelectValue placeholder="Event type" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-slate-950 text-white">
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
                                                                placeholder="Event description"
                                                                className="w-full border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}
                                                            />
                                                            <Input
                                                                type="date"
                                                                className="w-full border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                                                value={date}
                                                                onChange={(e) => setDate(e.target.value)}
                                                            />
                                                            <Button
                                                                className="bg-gradient-to-r from-[#7aa2ff] via-[#86f2d3] to-[#b46bff] text-black shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-400/40"
                                                                onClick={() => {
                                                                    addNewEvent();
                                                                }}
                                                            >
                                                                Create Event
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                <Dialog open={addExistingEventOpen} onOpenChange={setAddExistingEventOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button className="w-full bg-white/10 text-white hover:bg-white/15">Existing Event</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-slate-950 text-white">
                                                        <DialogHeader>
                                                            <DialogTitle>Add services to an existing event</DialogTitle>
                                                            <DialogDescription className="text-white/70">Select an event to attach the current cart.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex max-h-[50vh] flex-col gap-4 overflow-y-auto pr-1">
                                                            {loadingEvents ? (
                                                                <p className="text-white/70">Loading events...</p>
                                                            ) : userEvents.length === 0 ? (
                                                                <p className="text-white/70">No events found.</p>
                                                            ) : (
                                                                userEvents.map(event => (
                                                                    <div key={event.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                                                        <span className="text-lg font-semibold text-white">{event.title}</span>
                                                                        <div className="mt-1 space-y-1 text-sm text-white/60">
                                                                            <span>Date: {new Date(event.date).toLocaleDateString()}</span>
                                                                            <div className="flex items-center justify-between">
                                                                                <span>Type: {event.type}</span>
                                                                                <Button
                                                                                    className="bg-[#86f2d3] text-black hover:bg-[#7ae8c8]"
                                                                                    onClick={() => {
                                                                                        addExistingEvent(event);
                                                                                    }}
                                                                                >
                                                                                    Choose
                                                                                </Button>
                                                                            </div>
                                                                        </div>
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

                            {primaryAction}

                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button className="bg-white/10 text-white hover:bg-white/15 md:hidden" size="icon">
                                        <AlignJustify className="size-5" />
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className="bg-slate-950 text-white">
                                    <DrawerHeader>
                                        <DrawerTitle>Navigation Menu</DrawerTitle>
                                        <DrawerDescription>Browse the platform</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="px-4">
                                        <NavBarLinks />
                                    </div>
                                    <DrawerFooter>
                                        {session ? (
                                            <Button onClick={handleSignOut} className="w-full bg-red-500 text-white hover:bg-red-600">Log Out</Button>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <Link href="/logIn">
                                                    <Button className="w-full bg-white/10 text-white hover:bg-white/15">Sign in</Button>
                                                </Link>
                                                <Link href="/signUp">
                                                    <Button className="w-full bg-[#86f2d3] text-black hover:bg-[#7ae8c8]">Get started</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBar;
