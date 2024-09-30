import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Web App",
  description: "Generated by David Gündüz",
};

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning */}
      <body className={`${inter.className} relative flex min-h-screen flex-col bg-white text-black dark:bg-slate-900 dark:text-white`}>
        <Providers>
          <Header />
          <main className="flex-grow  mt-[80px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
