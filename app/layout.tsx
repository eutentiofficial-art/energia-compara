import "./../styles/globals.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Energia Compara",
  description: "Comparatore luce e gas"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
