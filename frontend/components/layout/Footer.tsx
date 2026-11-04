import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyWebsite
        </Link>

        {/* Navigation */}
        <div className="flex gap-6">
          <Link href="/">Trang chủ</Link>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/contact">Liên hệ</Link>
        </div>
      </nav>
    </header>
  );
}