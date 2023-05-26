// Next
import Link from "next/link";

// Next-Auth
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar fixed z-50 bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Hyrule Help
        </Link>
      </div>
      <div className="flex-none gap-2">
        {session?.user ? (
          <button className="btn-primary btn" onClick={() => void signOut()}>
            Sign Out
          </button>
        ) : (
          <button className="btn-primary btn" onClick={() => void signIn()}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
