"use client";

import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(path);
    };

    const getItemClass = (path: string) => {
        return isActive(path)
            ? "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dce9ff] text-[#00236f] font-bold text-sm shadow-xs transition-all w-full text-left cursor-pointer"
            : "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#444651] hover:bg-[#dce9ff]/50 hover:text-[#0b1c30] text-sm transition-all w-full text-left cursor-pointer";
    };

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-72 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex flex-col justify-between overflow-y-auto">
            <div className="p-4">
                <div className="px-2 pb-2 mb-2 text-xs text-[#515f74] uppercase font-bold tracking-wider">
                    Nghiệp vụ giảng viên
                </div>
                <nav className="flex flex-col gap-1">
                    <button
                        className={getItemClass('/pages/teacher/dashboard/exam/createExam')}
                        type="button"
                        onClick={() => {
                            router.push('/pages/teacher/dashboard/exam/createExam');
                        }}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${isActive('/pages/teacher/dashboard/exam/createExam') ? 'text-[#00236f]' : ''}`}>
                            edit_document
                        </span>
                        <span>Tạo bài thi</span>
                    </button>
                    <button
                        className={getItemClass('/pages/teacher/dashboard/exam/historyCreateExam')}
                        type="button"
                        onClick={() => {
                            router.push('/pages/teacher/dashboard/exam/historyCreateExam');
                        }}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${isActive('/pages/teacher/dashboard/exam/historyCreateExam') ? 'text-[#00236f]' : ''}`}>
                            history_edu
                        </span>
                        <span>Lịch sử bài thi đã tạo</span>
                    </button>
                    <button
                        className={
                            isActive('/pages/teacher/dashboard/exam/receiveExam')
                                ? "flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#dce9ff] text-[#00236f] font-bold text-sm shadow-xs transition-all w-full text-left cursor-pointer"
                                : "flex items-center justify-between px-4 py-2.5 rounded-xl text-[#444651] hover:bg-[#dce9ff]/50 hover:text-[#0b1c30] text-sm transition-all w-full text-left cursor-pointer"
                        }
                        type="button"
                        onClick={() => {
                            router.push('/pages/teacher/dashboard/exam/receiveExam');
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/pages/teacher/dashboard/exam/receiveExam') ? 'text-[#00236f]' : ''}`}>
                                assignment_turned_in
                            </span>
                            <span>Nhận bài của sinh viên</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#57657b] text-[11px] font-bold">18</span>
                    </button>
                </nav>

                <div className="mt-6 px-2 pb-2 mb-2 text-xs text-[#515f74] uppercase font-bold tracking-wider">
                    Tiện ích &amp; Khảo thí
                </div>
                <nav className="flex flex-col gap-1">
                    <button
                        className={getItemClass('/pages/teacher/dashboard/schedule')}
                        type="button"
                        onClick={() => {
                            router.push('/pages/teacher/dashboard/schedule');
                        }}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${isActive('/pages/teacher/dashboard/schedule') ? 'text-[#00236f]' : ''}`}>
                            visibility
                        </span>
                        <span>Lịch coi thi &amp; giám sát</span>
                    </button>
                    <button
                        className={getItemClass('/pages/teacher/dashboard/exam/bankQuestion')}
                        type="button"
                        onClick={() => {
                            router.push('/pages/teacher/dashboard/exam/bankQuestion');
                        }}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${isActive('/pages/teacher/dashboard/exam/bankQuestion') ? 'text-[#00236f]' : ''}`}>
                            inventory_2
                        </span>
                        <span>Ngân hàng đề thi</span>
                    </button>
                    <button
                        className={getItemClass('/pages/teacher/dashboard/support')}
                        type="button"
                        onClick={() => {
                            router.push('/pages/teacher/dashboard/support');
                        }}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${isActive('/pages/teacher/dashboard/support') ? 'text-[#00236f]' : ''}`}>
                            gavel
                        </span>
                        <span>Hỗ trợ &amp; Quy chế khảo thí</span>
                    </button>
                </nav>
            </div>

            <div className="p-4 m-4 rounded-xl bg-[#eff4ff] border border-[#c5c5d3] flex flex-col gap-1">
                <div className="flex items-center gap-1 text-[#00236f] text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>Khảo thí Bảo mật Cao</span>
                </div>
                <p className="text-xs text-[#515f74]">
                    Giám sát mã hóa đầu cuối &amp; phát hiện gian lận tự động theo chuẩn ISO/IEC 27001.
                </p>
            </div>
        </aside>
    );
}