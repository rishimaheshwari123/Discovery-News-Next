import "./globals.css";
import Wrapper from "./wrapper";


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
