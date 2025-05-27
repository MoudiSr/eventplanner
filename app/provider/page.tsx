import { getAllServicesByProvider } from "@/actions/services";
import ProviderMain from "@/components/provider/provider-main";

const Page = async () => {
    const services = await getAllServicesByProvider("cmb52yf770000txl8q23jk2zm");

    return (
        <>
            <ProviderMain services={services} />
        </>
    )
}

export default Page;