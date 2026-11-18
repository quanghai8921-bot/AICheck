import Sidebar from "@/components/layout/Sidebar";

export default function TeacherDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full min-h-[calc(100vh-64px)]">
            {/* Sidebar cố định bên trái */}
            <Sidebar />

            {/* Nội dung Dashboard đẩy lùi 288px (pl-72) để né Sidebar */}
            <main className="flex-1 pl-72 w-full">
                {children}
            </main>
        </div>
    );
}