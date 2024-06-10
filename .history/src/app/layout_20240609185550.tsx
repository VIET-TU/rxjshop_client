import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
// import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const pathname = usePathname()
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">

      <ReactQueryProvider>
					{pathname.includes('auth') || pathname.includes('dashboard') ? (
						children
					) : (
		
					
							  <SiteHeader />
        {children}
        <CommonClient />
        <Footer />
								<ToastContainer />
			
			
					)}
				</ReactQueryProvider>
      
      </body>
    </html>
  );
}
