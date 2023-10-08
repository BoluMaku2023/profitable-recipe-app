import Head from "next/head";
import Image from "next/image";
import LogoText from "../component/general/logotext";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import kickstart from "../data/kickstart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Profitable</title>
        <meta
          name="description"
          content="A marketplace platform for ingredient and recipe management. Connect your inventory to our platform, accessing products from suppliers in bulk or a la carte, delivering them when you need them and tracking customer sales online. Profit gives users access to faster quoting, up-to-date availability and price detail on any order."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-secondary">
        {/*  header */}
        <div className="py-12 px-6 xl:px-16">
          <div className="mx-auto flex max-h-[120px] max-w-7xl items-center justify-between ">
            <LogoText
              width={30}
              height={40}
              cssStyles="text-base md:text-xl font-medium text-bgYellow block"
            />
            <div className="hidden items-center gap-x-4 xl:flex">
              <h3 className="flex h-12 w-[120px] cursor-pointer items-center justify-center rounded-[5px] bg-bgPurple p-2 font-semibold text-primary transition duration-[2ms] ease-in-out hover:bg-bgPurple/80">
                <Link
                  href="/signin"
                  className="flex h-full w-full items-center justify-center"
                >
                  Login
                </Link>
              </h3>
              <h3 className="flex h-12 w-[120px] cursor-pointer items-center justify-center rounded-[5px] border border-primary p-2 font-semibold text-primary transition ease-in-out hover:bg-primary hover:text-secondary">
                <Link
                  href="/signup"
                  className="flex h-full w-full items-center justify-center"
                >
                  Signup
                </Link>
              </h3>
            </div>
          </div>
        </div>

        {/* hero */}
        <div className="py-[77px] px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-y-12 lg:flex-row lg:justify-between lg:gap-y-0">
            <div className="flex flex-col items-center gap-y-[21px] text-primary lg:items-start">
              <Fade direction="up">
                <h2 className="font-Raleway text-4xl leading-[55px] lg:w-[489px] xl:text-5xl xl:leading-[64px]">
                  A marketplace platform for ingredient and recipe management.
                </h2>
                <h3>
                  Helped more than 200+ cooks to sell their ingredients and
                  recipes. Built to work for you and your cooks.
                </h3>
                <div className="mt-6 flex items-center gap-x-4">
                  <h3 className="hidden h-12 w-[120px] cursor-pointer items-center justify-center rounded-[5px] bg-bgPurple p-2 text-sm font-medium text-primary transition duration-[2ms] ease-in-out hover:bg-bgPurple/80 lg:flex">
                    <Link
                      href="/signin"
                      className="flex h-full w-full items-center justify-center"
                    >
                      Login
                    </Link>
                  </h3>
                  <h3 className="flex h-12 w-[300px] cursor-pointer items-center justify-center rounded-[5px] border border-primary p-2 text-sm font-medium text-primary transition ease-in-out hover:bg-primary hover:text-secondary lg:w-[120px]">
                    <Link
                      href="/signup"
                      className="flex h-full w-full items-center justify-center"
                    >
                      Get Started
                    </Link>
                  </h3>
                </div>
              </Fade>
            </div>
            {/* hero_images*/}
            <Fade direction="right">
              <div className="relative flex w-full items-center justify-center gap-x-2 lg:w-[702px] lg:gap-x-4">
                <div className="flex flex-col items-end justify-end gap-y-4">
                  <div className="h-[68px] w-[55px] rounded-lg opacity-80 xl:h-[240px] xl:w-[192px]">
                    <Image
                      src="/images/anh-nguyen-kcA-c3f_3FE-unsplash.jpg"
                      width={296}
                      height={480}
                      alt="mariana_pix"
                      priority
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative h-[34px] w-[34px] rounded-lg opacity-50 xl:h-[120px] xl:w-[120px]">
                    <Image
                      src="/images/microsoft-edge-4cA0t0_7LOc-unsplash.jpg"
                      width={296}
                      height={480}
                      alt="mariana_pix"
                      priority
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="h-[237px] w-[165px] animate-pulse rounded-lg transition-all ease-linear hover:scale-110 lg:h-[480px] lg:w-[296px]">
                  <Image
                    src="/images/mariana-medvedeva-iNwCO9ycBlc-unsplash.jpg"
                    width={296}
                    height={480}
                    alt="mariana_pix"
                    priority
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="relative h-[68px] w-[55px] rounded-lg opacity-70 xl:h-[240px] xl:w-[192px]">
                    <Image
                      src="/images/lily-banse--YHSwy6uqvk-unsplash.jpg"
                      width={296}
                      height={480}
                      alt="mariana_pix"
                      priority
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>

                  <div className="relative h-[34px] w-[34px] rounded-lg opacity-50 xl:h-[120px] xl:w-[120px]">
                    {/* <div className="bg-secondary/80 w-full h-full absolute top-0 bottom-0 left-0 right-0 z-40"></div> */}
                    <Image
                      src="/images/chad-montano-eeqbbemH9-c-unsplash.jpg"
                      width={296}
                      height={480}
                      alt="mariana_pix"
                      priority
                      className="z-10 h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        {/*  Provide Best Recipe Management System*/}
        <div className=" bg-bgPurple px-6 xl:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between py-[122px] text-primary lg:flex-row">
            <Fade direction="left">
              <div>
                <h3 className=" w-full font-Raleway text-[22px] lg:w-[472px] xl:w-[275px] xl:text-[48px]">
                  Provide Best Recipe Management System
                </h3>
              </div>
            </Fade>
            <Fade direction="right">
              <div>
                <h3 className="font-Raleway text-[22px]">
                  Some key features of Profitable:
                </h3>
                <ul className="mt-6 ml-3 w-full text-base leading-8 xl:mt-4 xl:ml-12 xl:w-[504px]">
                  <li className="list-disc">
                    Build consistent recipes, monitor & control costs, make more
                    profits!
                  </li>
                  <li className="list-disc">
                    Dynamically create recipes with features such as
                    substitutes, modifiers, style, design etc.
                  </li>
                  <li className="list-disc">Create Recipes out of Recipes.</li>
                  <li className="list-disc">Manage orders as they arrive.</li>
                  <li className="list-disc">Monitor items low level.</li>
                </ul>
              </div>
            </Fade>
          </div>
        </div>
        {/* why_profitable */}
        <div className="bg-primary px-6 md:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between py-[75px]">
            <div className=" flex items-center justify-center">
              <h3 className="font-Raleway text-[22px] lg:text-5xl">
                Why Profitable?
              </h3>
            </div>
            <div className="mt-[88px] grid grid-cols-1 gap-y-[40px] lg:grid-cols-2 lg:gap-x-[151px] lg:gap-y-[88px]">
              {/* reduce_cost*/}
              <div className="flex items-center gap-x-6">
                <div className="hidden h-[88px] w-[99.55px] xl:block">
                  <Image
                    src="/images/Reduce Cost.png"
                    alt="reduce_cost"
                    height={87}
                    width={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-[35px]">
                  <h3 className="font-Raleway text-2xl">Reduce Cost</h3>
                  <p className="w-full xl:w-[373px]">
                    Creating recipe banks can help reduce mistakes and increase
                    precision. Additionally, the software can take into account
                    the cost of ingredients when determining prices.
                  </p>
                </div>
              </div>
              {/*  */}
              {/*Maintain Consistency*/}
              <div className="flex items-center gap-x-6">
                <div className="hidden h-[88px] w-[99.55px] xl:block">
                  <Image
                    src="/images/Maintain Consistency.png"
                    alt="reduce_cost"
                    height={87}
                    width={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-[35px]">
                  <h3 className="font-Raleway text-2xl">
                    Maintain Consistency
                  </h3>
                  <p className="w-full xl:w-[373px]">
                    The system can help a multi-chain food businesses maintain
                    consistency in dishes across all locations by distributing
                    standardized recipes to all employees.
                  </p>
                </div>
              </div>

              {/* Right Pricing*/}
              <div className="flex  items-center gap-x-6">
                <div className="hidden h-[88px] w-[99.55px] xl:block">
                  <Image
                    src="/images/best-price.png"
                    alt="reduce_cost"
                    height={87}
                    width={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-[35px]">
                  <h3 className="font-Raleway text-2xl">Right Pricing</h3>
                  <p className="w-full xl:w-[373px]">
                    Effective recipe management can help forecast material costs
                    and predict consumption patterns. This can help adjust dish
                    prices based on customer consumption. An automated system
                    can assist with managing dynamic costing and determining the
                    appropriate pricing for each outlet.
                  </p>
                </div>
              </div>

              {/*Maintain Consistency*/}
              <div className="flex items-center gap-x-6">
                <div className="hidden h-[88px] w-[88.7px] xl:block">
                  <Image
                    src="/images/easy.png"
                    alt="reduce_cost"
                    height={87}
                    width={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-[35px]">
                  <h3 className="place-items-end font-Raleway text-2xl">
                    Easy to use
                  </h3>
                  <p className="w-full xl:w-[373px]">
                    Profitable’s recipe management system is both accurate and
                    easy to use. Regular updates ensure that it stays up to date
                    and meets changing needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Kick Start Your Profitable Journey With Us */}
        <div className="bg-secondary px-6 text-primary md:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-[122px] text-primary">
            <h3 className="flex items-center justify-center text-center font-Raleway  text-[22px] lg:text-left lg:text-5xl">
              Kick Start Your Profitable Journey With Us
            </h3>
            <p className="mx-auto mt-6 mb-12 flex w-[] items-center justify-center text-center lg:w-[724px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className="mx-auto grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {kickstart.map((kickitem) => {
                return (
                  <div key={kickitem.title} className="flex flex-col">
                    <div className="relative h-[296px] w-[296px]">
                      <Image
                        src={kickitem.src}
                        width={296}
                        height={296}
                        alt={kickitem.title}
                        priority
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="my-8 mt-8 flex items-center justify-center">
                      {kickitem.title}
                    </h3>
                  </div>
                );
              })}
            </div>
            <h3 className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-[5px]  bg-bgPurple p-2 text-sm font-medium text-primary transition ease-in-out hover:bg-bgPurple/80 hover:text-primary md:w-[220px]">
              <Link href="/signin">Try Profitable</Link>
            </h3>
          </div>
        </div>
        <div className="bg-primary px-6 xl:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-[80px] xl:py-[122px] ">
            <h3 className="flex items-center justify-center font-Raleway text-5xl">
              Contact Us
            </h3>
            <form className="mt-10 flex w-full flex-col items-center gap-y-7">
              <div className="flex w-full flex-col items-center gap-y-6 gap-x-16 xl:flex-row xl:gap-x-0">
                <div className="flex w-full flex-col gap-y-3">
                  <label htmlFor="firstName">FirstName</label>
                  <input
                    type="text"
                    placeholder="enter your first name "
                    className="h-12 rounded-lg border border-bgPurple px-4 outline-none placeholder:text-xs focus:border-dogwoodRose"
                    id="firstName"
                  />
                </div>
                <div className="flex w-full flex-col gap-y-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className=" h-12 rounded-lg border border-bgPurple px-4 outline-none placeholder:text-xs focus:border-dogwoodRose"
                    placeholder="enter your last name"
                  />
                </div>
                <div className="flex w-full flex-col gap-y-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="enter your email here"
                    className=" h-12 rounded-lg border border-bgPurple px-4 outline-none placeholder:text-xs focus:border-dogwoodRose"
                  />
                </div>
              </div>

              <textarea
                name=""
                placeholder="enter your message"
                id=""
                cols="30"
                rows="10"
                className="h-[150px] w-full rounded-lg border border-bgPurple p-8 outline-none"
              ></textarea>
              <button
                type="submut"
                onClick={(e) => e.preventDefault()}
                className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-[5px]  bg-bgPurple p-2 text-sm font-medium text-primary transition ease-in-out hover:bg-bgPurple/80 hover:text-primary md:w-[220px]"
              >
                <Link
                  href="#"
                  className="flex h-full w-full items-center justify-center"
                >
                  Send
                </Link>
              </button>
            </form>
          </div>
        </div>
        <div className="bg-[E3E4EC] px-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-20 text-primary xl:py-[122px]">
            <div className="grid w-full grid-cols-1 lg:grid-cols-4  lg:gap-x-16">
              <div className="flex flex-col gap-y-6">
                {/* brand_logo */}
                <LogoText />
                <p className="hidden leading-7 lg:block">
                  Helped more than 200+ cooks to sell their ingredients and
                  recipes. Built to work for you and your cooks.
                </p>
                <h3 className="hidden font-Raleway text-bgPurple lg:block">
                  Copyright MData Solutions
                </h3>
              </div>
              {/* in_touch */}
              <div className="mt-6 flex flex-col gap-y-9 lg:mt-0 xl:gap-y-3">
                <h3 className="font-Raleway text-bgPurple">Get in Touch</h3>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faLocationDot} className="h-6 w-6" />
                  <h3>Ourstudio@hello.com</h3>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faPhone} className="h-6 w-6" />
                  <h3>+1 386-688-3295</h3>
                </div>
              </div>
              {/*  */}
              <div className="mt-10 flex flex-col gap-y-6 xl:mt-0">
                <div className="flex gap-x-5 text-2xl">
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="transi h-10 w-10 rounded-full border border-primary p-2 transition ease-in-out hover:border-none hover:bg-bgPurple hover:bg-bgPurple/80"
                    />
                  </Link>
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="transi h-10 w-10 rounded-full border border-primary p-2 transition ease-in-out hover:border-none hover:bg-bgPurple hover:bg-bgPurple/80"
                    />
                  </Link>
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faTiktok}
                      className="transi h-10 w-10 rounded-full border border-primary p-2 transition ease-in-out hover:border-none hover:bg-bgPurple hover:bg-bgPurple/80"
                    />
                  </Link>
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="transi h-10 w-10 rounded-full border border-primary p-2 transition ease-in-out hover:border-none hover:bg-bgPurple hover:bg-bgPurple/80"
                    />
                  </Link>
                </div>
                <h3 className="leading-7">
                  Don't forget to follow us on social media, don't miss the
                  latest news from us.
                </h3>
              </div>
              {/*  */}
              <div className="XL:mt-0 mt-6 flex flex-col gap-y-3">
                <label
                  htmlFor="emailSub"
                  className="mb-3 font-Raleway text-bgPurple"
                >
                  Join our Newsletter
                </label>
                <input
                  type="email"
                  name=""
                  id="emailSub"
                  className=" h-12 rounded-lg border border-bgPurple px-4 outline-none placeholder:text-xs focus:border-dogwoodRose"
                />
                <h3 className="flex h-12 w-full cursor-pointer items-center justify-center  rounded-[5px] bg-bgPurple p-2 text-sm font-medium text-primary transition ease-in-out hover:bg-bgPurple/80 hover:text-primary">
                  <Link
                    href="#"
                    className="flex h-full w-full items-center justify-center"
                  >
                    Subscribe
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
