import { getAllServices } from "@/actions/services";
import ServicesMain from "@/components/services/services-main";

const Page = async () => {
    const services = await getAllServices();

    return (
        <>
            <ServicesMain services={services} />
        </>
    )
}
export default Page;