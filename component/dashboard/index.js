import React, { useEffect, useState } from "react";
import InventoryCount from "./inventorycount";
import OrderNumbers from "./ordernumbers";
import ProductCount from "./productcount";
import RecipeCount from "./recipecount";
import { postRequest, getRequest } from "../../utils/api.requests";
import {
  BASE_URL,
  GET_ENTITIES_COUNT,
  RECENT_ORDERS_URL,
} from "../../utils/api.endpoints";
import { useRouter } from "next/router";
import { getDate, toUpperCase } from "../../utils/helper";
const entities_count_url = BASE_URL + GET_ENTITIES_COUNT;
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

const Auth = new AuthHelperMethods();

function DashboardIndex() {
  const router = useRouter();
  const [entitiesCount, setEntitiesCount] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const user = Auth.getAdmin();
  const [profile, setProfile] = useState({
    firstname: user.firstName,
    lastname: user.lastName,
  });

  useEffect(() => {
    loadEntitiesCount();

    loadRecentOrders();
  }, []);

  const loadRecentOrders = async () => {
    try {
      const result = await getRequest(RECENT_ORDERS_URL);

      setRecentOrders(result.response);
    } catch (err) {
      console.log(err);
    }
  };

  const loadEntitiesCount = async () => {
    try {
      const result = await getRequest(entities_count_url);

      setEntitiesCount(result.response);
    } catch (err) {}
  };

  const goToOrder = (e, id) => {
    e.preventDefault();
    router.push("/order/" + id);
  };

  const goToProfitable = () => {
    router.push("/profitable");
  };

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      {/* dashboard */}
      <div className="mt-9 flex items-center">
        <Icon
          icon="ri:dashboard-fill"
          className=" h-auto w-12 rounded-lg  bg-bgPurple p-3 text-primary md:w-16"
        />
        <div className="ml-6">
          <h2 className="">
            <span className="block text-2xl font-bold md:text-3xl">
              Dashboard
            </span>
          </h2>
          <h3 className="font-Raleway text-base font-medium md:mt-2">
            Welcome👋, {profile.firstname}
          </h3>
        </div>
      </div>
      {/* quicknavigation link */}
      <div className=" mt-20 hidden w-10/12 justify-between text-base text-secondary md:flex">
        <h3 className="after:mt-2 after:block after:h-1 after:w-full after:bg-bgPurple after:content-['']">
          <Link href="/orders" className="flex items-center">
            Orders
          </Link>
        </h3>
        <h3 className="cursor-pointer overflow-hidden transition after:mt-2 after:block after:h-1 after:w-full after:-translate-x-full after:bg-bgPurple after:content-[''] hover:after:translate-x-0">
          <Link href="/products" className="flex items-center">
            Products
          </Link>
        </h3>
        <h3 className="cursor-pointer overflow-hidden transition after:mt-2 after:block after:h-1 after:w-full after:-translate-x-full after:bg-bgPurple after:content-[''] hover:after:translate-x-0">
          <Link href="/recipes" className="flex items-center">
            Recipes
          </Link>
        </h3>
        <h3 className="cursor-pointer overflow-hidden transition after:mt-2 after:block after:h-1 after:w-full after:-translate-x-full after:bg-bgPurple after:content-[''] hover:after:translate-x-0">
          <Link href="/inventory" className="flex items-center">
            Inventory
          </Link>
        </h3>
        <h3 className="cursor-pointer overflow-hidden transition after:mt-2 after:block after:h-1 after:w-full after:-translate-x-full after:bg-bgPurple after:content-[''] hover:after:translate-x-0">
          <Link href="/account" className="flex items-center">
            Account
          </Link>
        </h3>
        <h3 className="cursor-pointer overflow-hidden transition after:mt-2 after:block after:h-1 after:w-full after:-translate-x-full after:bg-bgPurple after:content-[''] hover:after:translate-x-0">
          <Link href="/settings" className="flex items-center">
            Settings
          </Link>
        </h3>
      </div>
      {/* quicklaunch */}
      <div className="relative my-12 flex w-full flex-col items-center justify-between gap-y-4 gap-x-9 rounded-lg bg-bg-index bg-cover bg-no-repeat px-8 py-10 text-primary md:flex-row md:py-3 ">
        <div className="z-20 text-center leading-7 md:text-left">
          <p className="font-Raleway">
            To see how changes in Ingredient and Material costs affect your
            recipes and products.
          </p>
        </div>
        <div className="z-10 md:mt-0">
          <button
            onClick={goToProfitable}
            className="flex w-52 items-center justify-center gap-2 rounded-lg bg-bgPurple p-3 text-lg font-medium  text-primary shadow-2xl transition hover:bg-darkPurple/80"
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
        </div>
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-full w-full rounded-lg bg-secondary/80"></div>
      </div>

      <div className="my-10 flex w-full items-center justify-between gap-x-7 overflow-x-scroll px-4 py-2 scrollbar-hide">
        <OrderNumbers
          fulfilledOrdersCount={
            entitiesCount && entitiesCount.fulfilledOrdersCount
          }
          pendingOrdersCount={entitiesCount && entitiesCount.pendingOrdersCount}
        />
        <ProductCount count={entitiesCount && entitiesCount.productsCount} />
        <RecipeCount count={entitiesCount && entitiesCount.recipesCount} />
        <InventoryCount count={entitiesCount && entitiesCount.inventoryCount} />
      </div>

      {/* <div className=" mt-12 rounded-3xl bg-primary px-12 py-5 pb-16 shadow-lg"></div> */}
      <div className=" mb-14 flex w-full flex-col rounded-xl border border-bgPurple bg-primary pb-12">
        <div className="flex w-full items-center justify-center rounded-t-xl bg-bgPurple p-4">
          <h2 className="text-primary">Recent Orders</h2>
        </div>
        <div className="mt-3 w-full overflow-x-auto px-8 lg:px-16">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="mb-6 h-16">
                <th className="w-31 border-r border-bgPurple px-4 text-left">
                  Name
                </th>
                <th className="w-21 border-r border-bgPurple px-4 text-left">
                  Status
                </th>
                <th className="w-21 border-r border-bgPurple px-4 text-left">
                  Fulfillment Date
                </th>
                <th className="w-21 pl-16 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders &&
                recentOrders.length > 0 &&
                recentOrders.map((recentOrder, i) => {
                  return (
                    <tr
                      onClick={(e) => goToOrder(e, recentOrder._id)}
                      className="bg-grayish/50"
                      key={i}
                    >
                      <td className="cursor-pointer rounded-tl-xl rounded-bl-xl border-r border-bgPurple px-4 text-left lg:pl-16">
                        {toUpperCase(recentOrder.name)}
                      </td>
                      <td className="border-r border-bgPurple px-4 text-left lg:pl-16">
                        {recentOrder.status}
                      </td>
                      <td className="border-r border-bgPurple px-4 text-left lg:pl-16">
                        {getDate(recentOrder.fulfillment_date)}
                      </td>
                      <td className="rounded-br-xl rounded-tr-xl px-4 text-left lg:pl-16">
                        {getDate(recentOrder.created)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardIndex;
