import { getAllEventsByCustomer } from "@/actions/events";
import CustomerMain from "@/components/customer/customer-main";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Page = async () => {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session?.user?.id) {
        return null;
    }

    const events = await getAllEventsByCustomer(session.user.id);

    return (
        <>
            <CustomerMain events={events} />
        </>
    )
}

export default Page;
