'use client';
import { useCart } from "../context/cart-context";
import { Service } from "../provider/provider-main";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type CategorizedServices = {
    [type: string]: Service[];
};

const ServicesMain = ({ services }: { services: Service[] }) => {

    const categorized: CategorizedServices = services.reduce((acc, service) => {
        if (!acc[service.type]) acc[service.type] = [];
        acc[service.type].push(service);
        return acc;
    }, {} as CategorizedServices);

    const { addToCart } = useCart();

    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="text-3xl font-bold">Available Services</h1>
            <Separator />
            {Object.entries(categorized).map(([type, services]) => (
                <div key={type}>
                    <h2 className="text-xl font-semibold mb-4 underline">{type.toUpperCase()} Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(service => (
                            <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <p className="text-gray-600">Price: ${service.price.toFixed(2)}</p>
                                <p className="text-gray-600">Provider: {service.provider.username}</p>
                                <Button className="mt-2 w-full" onClick={() => addToCart(service)}>Choose service</Button>
                            </div>
                            
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicesMain;
