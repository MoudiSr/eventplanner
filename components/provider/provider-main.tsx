
export type Service = {
    id: string;
    title: string;
    type: string;
    price: number;
    providerId: string;
    createdAt: Date;
    provider: {
        id: string;
        username: string;
    };
};

const ProviderMain = ({ services }: {
    services: Service[];
}) => {
    return (
        <>
            {services.length !== 0 ? services.map((service) => (
                <div key={service.id} className="p-4 border rounded mb-4">
                    <h2 className="text-lg font-semibold">{service.title}</h2>
                    <p className="text-sm text-gray-600">Type: {service.type}</p>
                    <p className="text-sm text-gray-600">Price: ${service.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Created At: {new Date(service.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Provider ID: {service.providerId}</p>
                </div>
            )) : <h1>No available services</h1>}
            <div className="flex justify-end mt-4">
                <a href="/provider/createService" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create New Service</a>
            </div>
        </>
    )
}
export default ProviderMain;