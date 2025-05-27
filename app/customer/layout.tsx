const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div>
                <nav className="bg-gray-50 h-full shadow-md p-6 w-64">
                    <h1 className="text-xl font-bold">Customer Dashboard</h1>
                    <ul className="mt-4 space-y-2">
                        <li><a href="/customer/" className="py-2 hover:bg-white">Events</a></li>
                        <li><a href="/customer/createEvent" className="py-2 hover:bg-white">Create Event</a></li>
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-4 bg-gray-50 min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ProviderLayout;