const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Hàm fetch tùy biến tự động đính kèm Token từ sessionStorage
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Nếu token hết hạn hoặc không có quyền (401), xóa session và chuyển hướng đăng nhập
    if (response.status === 401) {
        if (typeof window !== "undefined") {
            const role = sessionStorage.getItem("role");
            sessionStorage.clear();
            if (role === "TEACHER") {
                window.location.href = "/pages/teacher/auth";
            } else {
                window.location.href = "/pages/student/auth";
            }
        }
    }

    return response;
}

