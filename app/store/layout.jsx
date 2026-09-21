import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Merchant Stall - Jade Chamber Commerce",
    description: "Jade Chamber Merchant Guild Management Portal",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
