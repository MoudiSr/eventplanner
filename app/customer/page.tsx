import { getAllEventsByCustomer } from "@/actions/events";
import CustomerMain from "@/components/customer/customer-main";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


const Page = async () => {
    const session = await getServerSession(authOptions);
    const events = await getAllEventsByCustomer(session.user.id);
    console.log(events)

    return (
        <>
            <CustomerMain events={events} />
        </>
    )
}

export default Page;