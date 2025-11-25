const Page = () => {
    return (
        <div className="space-y-8 text-white">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Service manager</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Refine and monitor your offerings</h1>
                <p className="mt-2 text-sm text-white/70">Pick a service from your dashboard cards to edit pricing, descriptions, and see incoming bookings.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-white/80">How to get started</p>
                    <p className="mt-2 text-sm text-white/70">Open the provider dashboard and choose a service card. We’ll bring you back here with details ready to edit.</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 shadow-xl shadow-emerald-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-emerald-50">Stay responsive</p>
                    <p className="mt-2 text-sm text-emerald-100/80">Update pricing and availability after peak seasons to keep your offers competitive.</p>
                </div>
                <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-indigo-50">Need a new service?</p>
                    <p className="mt-2 text-sm text-indigo-100/80">Use the Create Service flow to publish fresh packages whenever inspiration strikes.</p>
                </div>
            </div>

            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center shadow-2xl shadow-indigo-900/30 backdrop-blur">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-indigo-100">🛠️</div>
                <h2 className="mt-4 text-xl font-semibold text-white">Select a service to manage</h2>
                <p className="mt-2 max-w-2xl mx-auto text-sm text-white/70">From the provider dashboard, click any service card to review bookings, adjust pricing, or update the description. We’ll route you back here with the selected service loaded.</p>
            </div>
        </div>
    );
};

export default Page;