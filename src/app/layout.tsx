import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "@/components/Loading";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <GlobalState>
          <Navbar />
          <NextTopLoader color="#10f310" height={4} showSpinner={false} />
          <LoadingPage >
          <main className="flex flex-col mt-[80px]">{children}</main>
          </LoadingPage>
        </GlobalState>
      </body>
    </html>
  );
}
