import { Link } from "react-router-dom";
import logo from "@/assets/hof.svg";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link to="/">
          <img src={logo} alt="logo" width={50} height={25} />
        </Link>

        <p>2023 HoF. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
