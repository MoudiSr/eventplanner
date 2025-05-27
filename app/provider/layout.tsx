const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div>
                <nav className="bg-gray-50 h-full shadow-md p-6 w-64">
                    <h1 className="text-xl font-bold">Provider Dashboard</h1>
                    <ul className="mt-4 space-y-2">
                        <li><a href="/provider/" className="py-2 hover:bg-white">Services</a></li>
                        <li><a href="/provider/createService" className="py-2 hover:bg-white">Create Service</a></li>
                        <li><a href="/provider/customerReservations" className="py-2 hover:bg-white">Reservations</a></li>
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