import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";

// Load fonts with Next.js optimization - prevents FOUC
const inter = Inter({
    subsets: ["latin", "vietnamese"],
    display: "swap",
    variable: "--font-inter",
    preload: true,
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jetbrains",
    preload: true,
});

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
        <html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <head>
                {/* Critical CSS inline to prevent FOUC */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        html, body {
                            background-color: #0a0a0f !important;
                            color: #ffffff;
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                        }
                    `
                }} />
            </head>
            <body className={inter.className}>
                <StyledJsxRegistry>
                    <div className="bg-grid" />
                    {children}
                </StyledJsxRegistry>
            </body>
        </html>
    );
}
