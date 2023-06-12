// Next
import { type AppType } from "next/app";
import Image from "next/image";

// Next-Auth
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// TRPC
import { api } from "~/utils/api";

// Components
import Navbar from "~/components/Navbar";

// Styles
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="fixed h-full w-full" style={{ zIndex: -1 }}>
        <Image
          src="/zeldaBackground.webp"
          alt="Background Image"
          className="object-cover"
          fill
        />
      </div>
      <Navbar />

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
