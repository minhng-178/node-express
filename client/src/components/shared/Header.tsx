import { Link } from "react-router-dom";

import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

import { Button } from "@/components/ui/button";
import logo from "@/assets/hof.svg";

function Header() {
  const user = null;
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="w-36">
          <img src={logo} width={50} height={25} alt="logo" />
        </Link>

        {user && (
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        )}

        <div className="flex w-32 justify-end gap-3">
          {user ? (
            <MobileNav /> //&& <UserButton user={user} dispatch={dispatch} />
          ) : (
            <Button asChild className="rounded-full" size="lg">
              <Link to="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
