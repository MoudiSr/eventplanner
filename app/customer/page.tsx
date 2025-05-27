import { getAllEventsByCustomer } from "@/actions/events";
import CustomerMain from "@/components/customer/customer-main";

const Page = async () => {
    const events = await getAllEventsByCustomer("cmb52yf770000txl8q23jk2zm");

    return (
        <>
            <CustomerMain events={events} />
        </>
    )
}

export default Page;