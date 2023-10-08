import LogoText from "./logotext";
import Link from "next/link";
import User from "../general/user";
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import {
  faHouse,
  faCartShopping,
  faList,
  faUser,
  faShoppingBasket,
  faBagShopping,
  faFileExport,
  faBars,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import MobileNavMenu from "./mobilenavmenu";
import Image from "next/image";

const Auth = new AuthHelperMethods();

const Nav = () => {
  const router = useRouter();
  const [mobileMenu, setShowMobileMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const mobileMenuHandler = () => {
    setShowMobileMenu(!mobileMenu);
  };
  const showPopUpMenu = () => {
    setShowPopup(!showPopup);
  };
  const goToProfitable = () => {
    router.push("/profitable");
  };
  const goToIndex = () => {
    router.push("/");
  };
  // navigate user back to signin page
  const doLogout = () => {
    Auth.logout();
    router.push("/signin");
  };
  // fetch currcnt Date
  const newDate = new Date();

  useEffect(() => {
    const handleRouteChange = () => {
      setShowMobileMenu(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 z-20 hidden w-28 flex-col items-center overflow-y-scroll bg-primary text-base shadow-lg xl:flex xl:w-64">
        <div className="relative flex w-full items-center justify-center bg-bgPurple px-1 py-6 sm:justify-between sm:p-3">
          <LogoText />
        </div>
        <User />
        <div className="hidden w-full flex-col  px-8 text-base outline-none sm:my-5 xl:flex ">
          <h3 className="my-2 w-full py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/dashboard" className="flex items-center">
              <Icon
                icon="material-symbols:dashboard-rounded"
                width="24"
                height="24"
              />
              <span className="mx-4 hidden sm:block"> Dashboard</span>
            </Link>
          </h3>
          <h3 className="my-2  py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/orders" className="flex items-center">
              <Icon
                icon="material-symbols:shopping-cart"
                width="24"
                height="24"
              />
              <span className=":block mx-4 hidden sm:block"> Orders</span>
            </Link>
          </h3>
          <h3 className="my-2  py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/products" className="flex items-center">
              <Icon icon="dashicons:products" width="24" height="24" />
              <span className="mx-4 hidden sm:block"> Products</span>
            </Link>
          </h3>
          <h3 className="my-2  py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/recipes" className="flex items-center">
              <Icon icon="icon-park-solid:cooking" width="24" height="24" />
              <span className="mx-4 hidden sm:block"> Recipes</span>
            </Link>
          </h3>
          <h3 className="my-2  py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/inventory" className="flex items-center">
              <Icon icon="ic:twotone-inventory" width="24" height="24" />
              <span className="mx-4 hidden sm:block">Inventory</span>
            </Link>
          </h3>
          <h3 className="my-2  py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/account" className="flex items-center">
              <Icon
                icon="material-symbols:account-circle"
                width="24"
                height="24"
              />
              <span className="mx-4 hidden sm:block">Account</span>
            </Link>
          </h3>
          <h3 className="my-2  py-3 transition hover:bg-purpleMountain/20 sm:my-2">
            <Link href="/settings" className="flex items-center">
              <Icon icon="material-symbols:settings" width="24" height="24" />
              <span className="mx-4 hidden sm:block">Settings</span>
            </Link>
          </h3>
        </div>
        <div className="hidden flex-col items-center xl:flex">
          <button
            onClick={goToProfitable}
            className=" my-3 hidden w-52 items-center justify-center gap-2 rounded-lg bg-bgPurple p-3 text-lg font-medium text-primary  shadow-2xl transition hover:bg-darkPurple/80 sm:block lg:flex"
          >
            <div className="relative">
              <Image
                src="/images/recipe_logo.png"
                width={20}
                height={20}
                alt="ProfitTable_logos"
                className="w-6 animate-spin object-contain"
              />
            </div>{" "}
            Profitable
          </button>
          <button
            onClick={doLogout}
            className="h-fits mt-5 flex w-12 items-center justify-center rounded-md bg-dogwoodRose p-3 text-lg font-medium text-primary hover:bg-dogwoodRose/60 sm:mt-2 sm:w-52"
          >
            <FontAwesomeIcon icon={faFileExport} />
            <span className="mx-4 hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
      <div className="fixed top-0 right-0 z-40 flex w-full items-center justify-between bg-bgPurple px-8 py-6 shadow-sm xl:hidden">
        <LogoText
          width={30}
          height={40}
          onClick={goToIndex}
          cssStyles=" text-base font-medium text-bgYellow sm:block"
        />
        <div>
          <FontAwesomeIcon
            icon={faBars}
            onClick={mobileMenuHandler}
            className="text-4xl text-primary sm:relative sm:right-0 sm:text-primary"
          />
        </div>
        {mobileMenu ? (
          <MobileNavMenu close={() => setShowMobileMenu(false)} />
        ) : null}
      </div>
    </>
  );
};

export default Nav;
