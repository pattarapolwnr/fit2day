import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "FIT2DAY",
  description: "Fitness Tracking and Planning AP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer />
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
          {children}
        </div>
      </body>
    </html>
  );
}
