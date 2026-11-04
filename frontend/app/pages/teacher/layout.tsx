import TeacherHeader from "@/components/layout/TeacherHeader";

export default function TeacherBaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
            {/* Header riêng của Giảng viên */}
            <TeacherHeader />

            {/* Nội dung chính lùi xuống 16 (64px) */}
            <div className="flex-1 pt-16">
                {children}
            </div>
        </div>
    );
}