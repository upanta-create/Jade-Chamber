import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import CanaryBanner from "@/components/CanaryBanner";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "Jade Chamber | Enterprise Multi-Vendor Platform",
    description: "Modern multi-vendor commerce platform powered by Next.js 15, PostgreSQL, Redis Distributed Caching, ArgoCD GitOps, and Progressive Canary Delivery.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased bg-slate-50 text-slate-800 min-h-screen selection:bg-emerald-600 selection:text-white`}>
                <StoreProvider>
                    <CanaryBanner />
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
