import StudentHeader from "@/components/layout/StudentHeader";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header riêng của Sinh viên */}
            <StudentHeader isLoggedIn={true} />

            {/* Nội dung chính lùi xuống 16 (64px) để tránh bị Header che */}
            <div className="flex-1 pt-16">
                {children}
            </div>
        </div>
    );
}