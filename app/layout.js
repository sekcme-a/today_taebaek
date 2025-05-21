import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
import { ThemeProvider } from "@/config/material-tailwind-theme-provider";
import metadata from "./metadata";
const inter = Inter({ subsets: ["latin"] });

export { metadata };

const theme = {
  input: {
    defaultProps: {
      color: "black",
      className: "text-black placeholder:text-gray-400",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={[
          `${inter.className} bg-[#343541] text-white vsc-initialized`,
        ]}
      >
        <ReactQueryClientProvider>
          <ThemeProvider value={theme}>{children}</ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
