import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import EmptyResult from "../general/emptyResult";
import { AppContext } from "../../pages/AppContext";
import AddMaterials from "./addmaterials";
import AddRecipes from "./addrecipes";
import EditProductRecipe from "./editRecipe";
import EditProductMaterial from "./editMaterial";
import DeleteDialog from "../general/deletedialog";
import Pagination from "../general/pagination";
import EditProduct from "./edit";
import { Icon } from "@iconify/react";
import {
  toUpperCase,
  getAmount,
  defaultPaginationObject,
  getMaterialQuantityCost,
} from "../../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  putRequest,
  getRequest,
  deleteRequest,
} from "../../utils/api.requests";

import {
  BASE_URL,
  GET_PRODUCT,
  ALL_MATERIALS_URL,
  ALL_RECIPES_URL,
  DELETE_PRODUCT_MATERIAL,
  DELETE_PRODUCT_RECIPE,
  EDIT_PRODUCT_RECIPE_URL,
  EDIT_PRODUCT_MATERIAL_URL,
  DELETE_PRODUCT_URL,
  EDIT_PRODUCT_URL,
  GET_MATERIAL_UNITS_URL,
} from "../../utils/api.endpoints";
import Link from "next/link";
import BlockingLoadingComponent from "../general/blockingloading";

const get_product_url = BASE_URL + GET_PRODUCT;

const DetailsTab = "Details";
const RecipesTab = "Recipes";
const MaterialsTab = "Materials";

const ProductIndex = ({ id }) => {
  const appContext = AppContext();

  const router = useRouter();
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [selectedTab, setSelectedTab] = useState(DetailsTab);
  const [whatIsOpen, setWhatIsOpen] = useState(false);

  const [product, setProduct] = useState({});
  const [materials, setMaterials] = useState({});
  const [recipes, setRecipes] = useState({});
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [materialUnits, setMaterialUnits] = useState(null);

  const [materialPaginate, setMaterialPaginate] = useState(
    defaultPaginationObject
  );
  const [recipePaginate, setRecipePaginate] = useState(defaultPaginationObject);

  const [entityInFocus, setEntityInFocus] = useState({});

  const [isDelete, setIsDelete] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

  const [showDeleteRecipe, setShowDeleteRecipe] = useState(false);
  const [showEditRecipe, setShowEditRecipe] = useState(false);
  const [showEditMaterial, setShowEditMaterial] = useState(false);
  const [hover, setHover] = useState("");

  //Product
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);

  useEffect(() => {
    getMaterialUnits();
    loadAllAsync();
  }, []);

  useEffect(() => {
    loadProductMaterials();
  }, [materialPaginate.page]);

  useEffect(() => {
    loadProductRecipes();
  }, [recipePaginate.page]);

  const loadAllAsync = async () => {
    await loadProduct();
    await loadProductMaterials();
    await loadProductRecipes();
  };

  useEffect(() => {
    if (
      recipes &&
      recipes.docs &&
      recipes.docs.length == 0 &&
      materials.docs &&
      materials.docs.length == 0
    ) {
      appContext.setMessage({
        visible: true,
        message: "Please add Recipes and Materials to this product",
        title: "Message",
        type: "INFO",
      });
    }
  }, [materials, recipes]);

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  const switchSelectedTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  /*
    New functions
    */

  const getMaterialUnits = async () => {
    appContext.setBlockingLoading(true);

    try {
      let result = await getRequest(GET_MATERIAL_UNITS_URL);

      if (!!result) {
        setMaterialUnits(result.response);
      }
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred fetching material units",
        title: "Material Units Not Loaded",
        type: "ERROR",
      });
    }
  };

  const loadProduct = async () => {
    appContext.setBlockingLoading(true);
    try {
      const result = await getRequest(get_product_url + "?id=" + id);

      setProduct(result.response);

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
    }
  };

  const loadProductRecipes = async () => {
    appContext.setBlockingLoading(true);
    try {
      const result = await getRequest(
        ALL_RECIPES_URL +
          `?id=${id}&page=${recipePaginate.page + 1}&limit=${
            recipePaginate.limit
          }`
      );
      console.log(result.response);
      setRecipes(result.response);

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const loadProductMaterials = async () => {
    appContext.setBlockingLoading(true);
    try {
      const result = await getRequest(
        ALL_MATERIALS_URL +
          `?id=${id}&page=${materialPaginate.page + 1}&limit=${
            materialPaginate.limit
          }`
      );

      setMaterials(result.response);

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const checkRecipesAdded = () => {
    if (!recipes || !recipes.docs || recipes.docs.length == 0) {
      return false;
    }

    return true;
  };

  const checkMaterialsAdded = () => {
    if (!materials || !materials.docs || materials.docs.length == 0) {
      return false;
    }

    return true;
  };

  const openEditProduct = () => {
    if (appContext.state.isLoading) {
      return;
    }

    if (!checkMaterialsAdded() && !checkRecipesAdded()) {
      appContext.setMessage({
        visible: true,
        message: "Please add Recipes and Materials before editing the product",
        title: "Message",
        type: "INFO",
      });
      return;
    }

    setShowEditProduct(true);
  };

  const hideEditProduct = () => {
    setShowEditProduct(false);
  };

  const editProduct = async (editedProduct) => {
    setBlockingLoading(true);

    try {
      await putRequest(EDIT_PRODUCT_URL, { id: id, ...editedProduct });

      setBlockingLoading(false);

      hideEditProduct();

      loadProduct();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      appContext.setMessage({
        visible: true,
        message: "Could not edit product successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const openAddRecipe = () => {
    setShowAddRecipe(true);
  };

  const hideAddRecipe = () => {
    setShowAddRecipe(false);
  };

  const openAddMaterial = () => {
    setShowAddMaterial(true);
  };

  const hideAddMaterial = () => {
    setShowAddMaterial(false);
  };

  const openEditMaterial = (e, materialToEdit) => {
    e.preventDefault();
    setEntityInFocus(materialToEdit);
    setShowEditMaterial(true);
  };

  const hideEditMaterial = () => {
    setShowEditMaterial(false);
    setEntityInFocus({});
  };

  const editProductMaterial = async (newEditedMaterial) => {
    console.log(newEditedMaterial);

    setBlockingLoading(true);

    try {
      await putRequest(EDIT_PRODUCT_MATERIAL_URL, {
        id: id,
        material_id: newEditedMaterial.id,
        quantity: newEditedMaterial.quantity,
        unit: newEditedMaterial.unit,
      });

      setBlockingLoading(false);

      hideEditMaterial();

      loadProductMaterials();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      appContext.setMessage({
        visible: true,
        message: "Could not edit product material successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const openDeleteProduct = () => {
    setShowDeleteProduct(true);
  };

  const hideDeleteProduct = () => {
    setShowDeleteProduct(false);
  };

  const deleteProduct = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_PRODUCT_URL, { id: id });

      setBlockingLoading(false);

      hideDeleteProduct();

      router.push("/products");
    } catch (err) {
      setBlockingLoading(false);

      hideDeleteProduct();

      appContext.setMessage({
        visible: true,
        message: `Could not delete ${product.name} successfully`,
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const showEditProductRecipe = (e, recipeToEdit) => {
    e.preventDefault();
    setEntityInFocus(recipeToEdit);
    setShowEditRecipe(true);
  };

  const hideEditProductRecipe = () => {
    setEntityInFocus({});
    setShowEditRecipe(false);
  };

  const editProductRecipe = async (newEditedRecipe) => {
    setBlockingLoading(true);

    console.log(newEditedRecipe);

    try {
      await putRequest(EDIT_PRODUCT_RECIPE_URL, {
        id: id,
        recipe_id: newEditedRecipe._id,
        quantity: newEditedRecipe.yield.quantity,
        unit: newEditedRecipe.yield.unit,
      });

      setBlockingLoading(false);

      hideEditProductRecipe();

      loadProductRecipes();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      appContext.setMessage({
        visible: true,
        message: "Could not edit product recipe successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const showDeleteProductRecipe = (e, productRecipe) => {
    e.preventDefault();
    setEntityInFocus(productRecipe);
    setShowDeleteRecipe(true);
  };

  const hideDeleteProductRecipe = () => {
    setEntityInFocus({});
    setShowDeleteRecipe(false);
  };

  const deleteProductRecipe = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_PRODUCT_RECIPE, {
        id: id,
        recipe_id: entityInFocus._id,
      });

      setBlockingLoading(false);

      hideDeleteProductRecipe();

      loadProductRecipes();
    } catch (err) {
      setBlockingLoading(false);

      hideDeleteProductRecipe();

      appContext.setMessage({
        visible: true,
        message: "Could not delete product recipe successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const showDeleteProductMaterial = (e, aMaterial) => {
    setEntityInFocus(aMaterial);

    setIsDelete({
      visible: true,
      title: "Confirm Action",
      message: `Confirm that you want to delete ${toUpperCase(
        aMaterial.name
      )} from ${product.name}`,
      type: "Product",
    });
  };

  const hideDeleteProductMaterial = () => {
    setIsDelete({ visible: false, title: "", message: ``, type: "" });
  };

  const deleteProductMaterial = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_PRODUCT_MATERIAL, {
        id: id,
        material_id: entityInFocus.id,
      });

      setBlockingLoading(false);

      hideDeleteProductMaterial();

      loadProductMaterials();
    } catch (err) {
      setBlockingLoading(false);

      hideDeleteProductMaterial();

      appContext.setMessage({
        visible: true,
        message: "Could not delete product material successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const goToRecipe = (e, recipe_id) => {
    e.preventDefault();
    router.push("/recipe/" + recipe_id);
  };

  const getRecipesCost = () => {
    if (!recipes || !recipes.docs) return 0;

    return recipes.docs.reduce((acc, recipe) => {
      return acc + recipe.cost;
    }, 0);
  };

  const getMaterialsCost = () => {
    if (!materials || !materials.docs) return 0;

    return materials.docs.reduce((acc, material) => {
      return acc + material.totalCost;
    }, 0);
  };

  const getTotalCost = () => {
    return Number((getRecipesCost() + getMaterialsCost())?.toFixed(2));
  };

  const getTotalCostPrice = () => {
    return (
      getTotalCost() +
      parseInt(product.labour_cost) +
      parseInt(product.overhead_cost)
    );
  };

  const profitMargin = () => {
    const totalCost =
      getTotalCost() +
      parseInt(product.labour_cost ? product.labour_cost : 0) +
      parseInt(product.overhead_cost ? product.overhead_cost : 0);

    const profit = product.profit_margin
      ? (product.profit_margin / 100) * totalCost
      : 0;

    return profit;
  };

  const getProposedSellingCost = () => {
    const totalCost =
      getTotalCost() +
      parseInt(product.labour_cost ? product.labour_cost : 0) +
      parseInt(product.overhead_cost ? product.overhead_cost : 0);

    const profit = product.profit_margin
      ? (product.profit_margin / 100) * totalCost
      : 0;

    return totalCost + profit;
  };

  const handleMaterialsPageClick = async (event) => {
    setMaterialPaginate({ ...materialPaginate, page: event.selected });
  };

  const handleRecipesPageClick = async (event) => {
    setRecipePaginate({ ...recipePaginate, page: event.selected });
  };

  return (
    <div className="mt-20 h-screen py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex items-center justify-between">
        <Link href="/products">
          <Icon icon="material-symbols:arrow-back" className="text-3xl" />
        </Link>

        {/* quick btn */}
        <div className="flex gap-x-5">
          <button
            className="mx-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary"
            onClick={openEditProduct}
          >
            <div className="flex items-center justify-center">
              <Icon icon="material-symbols:edit" />
            </div>
          </button>

          <button onClick={openAddRecipe} className=" bg-bgPurple text-primary">
            Recipe
          </button>
          <button
            onClick={openAddMaterial}
            className=" bg-bgPurple text-primary"
          >
            Material
          </button>
          <button
            onClick={openDeleteProduct}
            className=" bg-bgPurple text-primary"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      {/* product-content  */}
      <div className=" mt-10 w-full">
        <div>
          <h2 className="text-lg font-bold text-bgPurple">Product Name</h2>
          <h3 className="my-3 w-fit rounded-lg bg-bgPurple/10 p-3 text-base">
            <span>{product && product.name}</span>
          </h3>
        </div>
        {/* details , recipe, materials */}
        <div className=" my-6 flex w-full items-center">
          <h3
            onClick={(e) => switchSelectedTab(e, DetailsTab)}
            className={`${
              selectedTab == DetailsTab ? "bg-bgPurple/100 text-primary" : ""
            } flex h-full w-full cursor-pointer items-center justify-center bg-secondary/50 py-4`}
          >
            {DetailsTab}
          </h3>
          <h3
            onClick={(e) => switchSelectedTab(e, RecipesTab)}
            className={`${
              selectedTab == RecipesTab ? "bg-bgPurple/100 text-primary" : ""
            } flex h-full w-full cursor-pointer items-center justify-center bg-secondary/50 py-4`}
          >
            {RecipesTab}
          </h3>
          <h3
            onClick={(e) => switchSelectedTab(e, MaterialsTab)}
            className={`${
              selectedTab == MaterialsTab ? "bg-bgPurple/100 text-primary" : ""
            } flex h-full w-full cursor-pointer items-center justify-center bg-secondary/50 py-4`}
          >
            {MaterialsTab}
          </h3>
        </div>

        {/*  switchTabListview  */}
        {selectedTab == DetailsTab ? (
          <>
            <div className=" my-3 mt-7 flex w-full items-center justify-between gap-x-6">
              <div className=" flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Product Cost
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  {product && getAmount(getTotalCost())}
                </h3>
              </div>

              <div className=" flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Overhead Cost
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  {product && getAmount(product?.overhead_cost)}
                </h3>
              </div>

              <div className=" flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Labour Cost
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  <span>{product && getAmount(product.labour_cost)}</span>
                </h3>
              </div>
            </div>
            {/* product_profit & Actual_profit*/}
            <div className="mt-7 flex w-full items-center gap-x-6">
              <div className=" flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Total Cost
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  <span>{product && getAmount(getTotalCostPrice())}</span>
                </h3>
              </div>

              {/* product_profit_margin */}
              <div className="flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Profit Percentage (%)
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  {product && product.profit_margin ? product.profit_margin : 0}
                  %
                </h3>
              </div>
              {/* Actutal_profit_margin */}
              <div className=" flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Profit Margin (N)
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  {getAmount(profitMargin())}
                </h3>
              </div>
            </div>
            {/* proposed_selling & actual_selling */}
            <div className=" mt-7 flex items-center gap-x-6">
              {/* Proposed_Selling_Price */}
              <div className=" flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Proposed Selling Price
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  {product && getAmount(getProposedSellingCost())}
                </h3>
              </div>

              {/* Actual_selling_price */}
              <div className="flex w-1/2 flex-col">
                <h2 className="relative text-lg font-bold text-bgPurple">
                  Actual Selling Price
                  <sup className="absolute top-0 text-xl text-dogwoodRose">
                    *
                  </sup>
                </h2>
                <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
                  {product && getAmount(product.actual_selling_price)}
                </h3>
              </div>
            </div>
          </>
        ) : selectedTab == RecipesTab ? (
          <div className="w-full">
            {recipes && recipes.docs && recipes.docs.length > 0 ? (
              <table className="w-full table-fixed border-separate border-spacing-y-2">
                <thead className="w-full">
                  <tr className="bg-bgPurple/90 text-primary">
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Name</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">
                      Quantity
                    </th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Unit</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Cost</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {recipes &&
                    recipes.docs &&
                    recipes.docs.length > 0 &&
                    recipes.docs.map((aRecipe) => {
                      return (
                        <tr
                          key={aRecipe._id}
                          className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                        >
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {toUpperCase(aRecipe.name)}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {aRecipe.quantity}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {aRecipe.yield ? aRecipe.yield.unit.name : ""} (
                            {aRecipe.yield
                              ? aRecipe.yield.unit.abbreviation
                              : ""}
                            )
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            ₦ {aRecipe.cost?.toFixed(2)}
                          </td>
                          <td className="flex items-center justify-center gap-x-2 py-3 md:px-16">
                            <button
                              onClick={(e) => showEditProductRecipe(e, aRecipe)}
                              className="flex w-8 items-center justify-center bg-bgPurple text-primary"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                              onClick={(e) =>
                                showDeleteProductRecipe(e, aRecipe)
                              }
                              className="flex w-8  items-center justify-center bg-dogwoodRose text-primary"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div>
                <EmptyResult
                  message={"No Recipes found for this product"}
                  onEmptyButtonClicked={loadProductRecipes}
                  emptyButtonText={"Try Again"}
                />{" "}
              </div>
            )}
            {recipes && recipes.docs && (
              <Pagination
                pageCount={recipePaginate.totalPagesCount}
                handlePageClick={handleRecipesPageClick}
                currentPage={recipePaginate.page}
              />
            )}
          </div>
        ) : (
          <div className="w-full">
            {materials && materials.docs && materials.docs.length > 0 ? (
              <table className="w-full table-fixed border-separate border-spacing-y-2">
                <thead className="bg-bgPurple/90 text-primary">
                  <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                    <th className="w-21 py-3 pl-7 text-left md:pl-16"> Name</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">
                      Quantity
                    </th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Unit</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Price</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {materials &&
                    materials.docs &&
                    materials.docs.length > 0 &&
                    materials.docs.map((aMaterial) => {
                      return (
                        <tr
                          key={aMaterial._id}
                          className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                        >
                          <td className="w-21 py-3 pl-7 text-left md:pl-16">
                            {toUpperCase(aMaterial.name)}
                          </td>
                          <td className="w-21 py-3 pl-7 text-left md:pl-16">
                            {aMaterial.quantity}
                          </td>
                          <td className="w-21 py-3 pl-7 text-left md:pl-16">
                            {aMaterial.purchase_quantity.unit.name} (
                            {aMaterial.purchase_quantity.unit.abbreviation})
                          </td>
                          <td className="w-21 py-3 pl-7 text-left md:pl-16">
                            ₦ {aMaterial.totalCost.toFixed(2)}
                          </td>
                          <td className="flex items-center gap-x-2 py-3">
                            <button
                              onClick={(e) => openEditMaterial(e, aMaterial)}
                              className="flex w-8 items-center justify-center bg-bgPurple text-primary"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                              onClick={(e) =>
                                showDeleteProductMaterial(e, aMaterial)
                              }
                              className="flex w-8  items-center justify-center bg-dogwoodRose text-primary"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div>
                <EmptyResult
                  message={"No Materials found for this product"}
                  onEmptyButtonClicked={loadProductMaterials}
                  emptyButtonText={"Try Again"}
                />
              </div>
            )}

            {materials && materials.docs && (
              <Pagination
                pageCount={materialPaginate.totalPagesCount}
                handlePageClick={handleMaterialsPageClick}
                currentPage={materialPaginate.page}
              />
            )}
          </div>
        )}

        {/* ending div */}
      </div>

      {showAddMaterial && (
        <AddMaterials
          units={materialUnits}
          loadProductMaterials={loadProductMaterials}
          product={product}
          hideAddMaterial={hideAddMaterial}
        />
      )}

      {showAddRecipe && (
        <AddRecipes
          loadProductRecipes={loadProductRecipes}
          product={product}
          hideAddRecipe={hideAddRecipe}
        />
      )}

      {isDelete.visible && (
        <DeleteDialog
          onPerformDeleteClicked={deleteProductMaterial}
          onCancelDeleteClicked={hideDeleteProductMaterial}
          type={isDelete.type}
          message={isDelete.message}
          title={isDelete.title}
        />
      )}

      {showEditRecipe && (
        <EditProductRecipe
          recipe={entityInFocus}
          onPerformEditClicked={editProductRecipe}
          onCancelEditClicked={hideEditProductRecipe}
        />
      )}

      {showEditMaterial && (
        <EditProductMaterial
          units={materialUnits}
          material={entityInFocus}
          onPerformEditClicked={editProductMaterial}
          onCancelEditClicked={hideEditMaterial}
        />
      )}

      {showDeleteRecipe && (
        <DeleteDialog
          onPerformDeleteClicked={deleteProductRecipe}
          onCancelDeleteClicked={hideDeleteProductRecipe}
          message={`Confirm that you want to remove ${entityInFocus.name} from ${product.name}?`}
          title={"Confirm Action"}
        />
      )}

      {showDeleteProduct && (
        <DeleteDialog
          onPerformDeleteClicked={deleteProduct}
          onCancelDeleteClicked={hideDeleteProduct}
          message={`Confirm that you want to delete ${product.name}?`}
          title={"Confirm Action"}
        />
      )}

      {showEditProduct && (
        <EditProduct
          totalCost={getTotalCost}
          productToEdit={product}
          closeEdit={hideEditProduct}
          editProduct={editProduct}
          profit={profitMargin}
          proposedSellingPrice={getAmount(getProposedSellingCost())}
        />
      )}
    </div>
  );
};

export default ProductIndex;
