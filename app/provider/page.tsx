import { getAllServicesByProvider } from "@/actions/services";
import ProviderMain from "@/components/provider/provider-main";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Page = async () => {
    const session = await getServerSession(authOptions);
    const services = await getAllServicesByProvider(session.user.id);

    return (
        <>
            <ProviderMain services={services} />
        </>
    )
}

export default Page;