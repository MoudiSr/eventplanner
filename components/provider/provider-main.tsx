import Link from "next/link";

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

const ProviderMain = ({ services }: { services: Service[]; }) => {
    const totalServices = services.length;
    const premiumServices = services.filter((service) => service.price > 500).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl space-y-8">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Provider Hub</p>
                        <h1 className="text-3xl font-bold text-slate-900">Your Services</h1>
                        <p className="mt-1 text-sm text-slate-600">Showcase your offerings and keep track of what clients can book.</p>
                    </div>
                    <Link
                        href="/provider/createService"
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        + Create Service
                    </Link>
                </header>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-medium text-slate-500">Total Services</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{totalServices}</p>
                        <p className="text-xs text-slate-500">Active services available to customers.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-medium text-slate-500">Premium Offers</p>
                        <p className="mt-2 text-3xl font-bold text-emerald-600">{premiumServices}</p>
                        <p className="text-xs text-slate-500">Services priced above $500.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-medium text-slate-500">Average Price</p>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">
                            {totalServices === 0 ? "$0" : `$${(services.reduce((sum, service) => sum + service.price, 0) / totalServices).toFixed(0)}`}
                        </p>
                        <p className="text-xs text-slate-500">Snapshot of your pricing strategy.</p>
                    </div>
                </div>

                {services.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
                        <div className="rounded-full bg-indigo-50 p-3 text-indigo-600">🛠️</div>
                        <h2 className="mt-4 text-lg font-semibold text-slate-900">No services published</h2>
                        <p className="mt-2 max-w-md text-sm text-slate-600">
                            Add your first service to start receiving reservations from customers.
                        </p>
                        <Link
                            href="/provider/createService"
                            className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Publish a service
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {services.map((service) => (
                            <Link
                                key={service.id}
                                href={`/provider/manageService/${service.id}`}
                                className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{service.type}</p>
                                        <h2 className="mt-1 text-xl font-semibold text-slate-900 group-hover:text-indigo-700">{service.title}</h2>
                                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">Offered by {service.provider.username}</p>
                                    </div>
                                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        ${service.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500">📅</span>
                                        <span>{new Date(service.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500">🧰</span>
                                        <span>{service.type}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProviderMain;
