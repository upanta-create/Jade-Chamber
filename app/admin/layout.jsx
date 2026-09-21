import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Overseer Pavilion - Jade Chamber Admin",
    description: "Jade Chamber Commerce Administration & Merchant Guild Governance",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
