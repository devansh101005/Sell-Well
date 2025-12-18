import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "sell_well. - Store Dashboard",
    description: "sell_well. - Store Dashboard",
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
