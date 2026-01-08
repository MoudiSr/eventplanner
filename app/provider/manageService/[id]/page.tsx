import ProviderManageService from "@/components/provider/provider-manage-service";
import { getServiceById } from "@/actions/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect("/login");
    }

    const service = await getServiceById(params.id);
    if (!service) {
        redirect("/provider");
    }

    if (service.providerId !== session.user.id) {
        redirect("/provider");
    }

    return (
        <>
            <ProviderManageService
                service={{
                    id: service.id,
                    title: service.title,
                    type: service.type,
                    price: Number(service.price),
                    providerId: service.providerId,
                }}
            />
        </>
    );
};

export default Page;
