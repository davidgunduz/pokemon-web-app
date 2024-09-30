import Image from "next/image";
import Link from "next/link";
import PokemonLogo from "@/images/International-Pokemon-logo.webp";
import ToggleTheme from "./common/ToggleTheme";
import PokemonSearchBar from "./pokemon/Searchbar";

// ----------------------------------------------------------------------

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div
        className="flex items-center justify-between min-w-full border-b-4 border-red-500 bg-red-600 shadow-md dark:bg-red-800"
        style={{
          paddingLeft: "max(4vw, calc(50vw - 37rem))",
          paddingRight: "max(4vw, calc(50vw - 37rem))",
        }}
      >
        {/* Left-aligned logo */}
        <Link href="/">
          <Image src={PokemonLogo} alt="Pokemon logo" className="relative w-20 h-auto md:w-28" />
        </Link>

        {/* Center-aligned search bar */}
        <div className="flex-1 flex justify-center">
          <PokemonSearchBar />
        </div>

        {/* Right-aligned toggle button */}
        <ToggleTheme />
      </div>

      <div
        style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
        className="mt-[-4px] h-5 w-1/3 border-b-4 border-red-500 bg-red-600 dark:border-red-600 dark:bg-red-800 lg:w-1/4"
      ></div>
    </header>
  );
};

export default Header;
