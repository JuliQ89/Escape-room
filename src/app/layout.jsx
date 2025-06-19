import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <title>Escape room</title>
      </head>
      <body className="h-screen">{children}</body>
    </html>
  );
}
