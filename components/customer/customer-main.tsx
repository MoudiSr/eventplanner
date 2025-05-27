'use client';

export type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    type: string;
    status: string;
    customer: {
        id: string;
        username: string;
    };
    reservation: {
        id: string;
        status: string;
    };
};

const CustomerMain = ({ events }: {
    events: Event[];
}) => {
    return (
        <>
            {events.length !== 0 ? events.map((event) => (
                <div key={event.id} className="p-4 border rounded mb-4 cursor-pointer" onClick={() => window.location.href = `/customer/event/${event.id}`}>
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <p className="text-sm text-gray-600">Description: {event.description}</p>
                    <p className="text-sm text-gray-600">Type: {event.type}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>
            )) : <h1>No available services</h1>}
            <div className="flex justify-end mt-4">
                <a href="/customer/createEvent" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create New Event</a>
            </div>
        </>
    )
}
export default CustomerMain;