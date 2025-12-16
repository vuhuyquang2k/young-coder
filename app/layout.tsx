import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Young Coder | Full-Stack Developer Portfolio",
    description: "Lập trình viên Full-Stack với chuyên môn Spring Boot, Laravel, ReactJS, NextJS, VueJS. Đam mê tạo ra những sản phẩm web hiện đại và hiệu suất cao.",
    keywords: ["developer", "full-stack", "spring boot", "laravel", "reactjs", "nextjs", "vuejs", "web development", "youngcoder"],
    authors: [{ name: "Young Coder" }],
    openGraph: {
        title: "Young Coder | Full-Stack Developer",
        description: "Full-Stack Developer Portfolio - Spring Boot, Laravel, ReactJS, NextJS, VueJS",
        url: "https://youngcoder.me",
        siteName: "Young Coder",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Young Coder | Full-Stack Developer",
        description: "Full-Stack Developer Portfolio",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body style={{ backgroundColor: '#0a0a0f' }}>
                <div className="bg-grid" />
                {children}
            </body>
        </html>
    );
}
