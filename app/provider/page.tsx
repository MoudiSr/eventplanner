import { getAllServicesByProvider } from "@/actions/services";
import ProviderMain from "@/components/provider/provider-main";
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

    const services = await getAllServicesByProvider(session.user.id);

    return (
        <>
            <ProviderMain services={services} />
        </>
    )
}

export default Page;
