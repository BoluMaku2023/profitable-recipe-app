import AuthHelperMethods from "../../utils/AuthHelperMethods";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoText from "./logotext";
import { CloseSharp, Logout } from "@mui/icons-material";

const Auth = new AuthHelperMethods();

const MobileNavMenu = ({ close }) => {
  // navigate user back to signin page
  const router = useRouter();
  const doLogout = () => {
    Auth.logout();
    router.push("/signin");
  };

  const goToIndex = () => {
    router.push("/");
  };
  return (
    <>
      <div className="fixed inset-0 h-full w-full bg-overlay"></div>
      <div className="absolute top-7 right-7 z-50 cursor-pointer rounded-full bg-ghostWhite p-2">
        <CloseSharp className="cursor-pointer" onClick={close} />
      </div>
      <div className=" absolute top-0 left-0 flex h-full min-h-screen w-full flex-col  gap-y-10 bg-darkPurple p-4 py-6 text-primary lg:max-w-250">
        <LogoText
          width={30}
          height={40}
          onClick={goToIndex}
          cssStyles=" text-base font-medium text-bgYellow sm:block"
        />
        <div className="flex flex-col gap-y-8 px-4 text-base ">
          <h3 className=" ">
            <Link href="/dashboard">Dashboard</Link>
          </h3>
          <h3 className=" ">
            <Link href="/orders">Orders</Link>
          </h3>
          <h3 className=" ">
            <Link href="/products">Products</Link>
          </h3>
          <h3 className="">
            <Link href="/recipes">Recipes</Link>
          </h3>
          <h3 className="">
            <Link href="/inventory">Inventory</Link>
          </h3>
          <h3 className="">
            <Link href="/account" className="flex items-center">
              Account
            </Link>
          </h3>
          <h3 className="">
            <Link href="/profitable" className="flex items-center">
              Profitable
            </Link>
          </h3>
          <h3 className="">
            <Link href="/settings" className="flex items-center">
              Settings
            </Link>
          </h3>
        </div>
        <div className="absolute bottom-10 px-4">
          <button
            onClick={doLogout}
            className="flex h-fit w-12 items-center justify-center rounded-md bg-dogwoodRose p-3 text-lg font-medium text-primary hover:bg-dogwoodRose/60 sm:w-52"
          >
            <Logout />
            <span className="mx-4 hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavMenu;
