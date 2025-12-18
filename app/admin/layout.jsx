import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "sell_well. - Admin",
    description: "sell_well. - Admin",
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
