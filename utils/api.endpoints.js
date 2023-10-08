//export const BASE_URL = "http://localhost:4000"
export const BASE_URL = "https://backend-theprofittable2022.koyeb.app";
export const API_VERSION = "/api/v1";

//Auth

export const LOGIN_URL = API_VERSION + "access/login";

export const EDIT_PROFILE_URL =
  BASE_URL + API_VERSION + "access/update_account";

//Dasboard

export const GET_ENTITIES_COUNT = API_VERSION + "/entities_count";

//Units

export const GET_UNITS_URL = BASE_URL + API_VERSION + "/units";

export const CREATE_UNITS_URL = BASE_URL + API_VERSION + "/units";

export const CREATE_CHILD_UNIT_URL = BASE_URL + API_VERSION + "/units/child";

export const DELETE_UNIT_URL = BASE_URL + API_VERSION + "/units";

export const EDIT_UNIT_URL = BASE_URL + API_VERSION + "/units";

export const INGREDIENT_UNITS_URL =
  BASE_URL + API_VERSION + "/units/ingredient";

export const GET_MATERIAL_UNITS_URL =
  BASE_URL + API_VERSION + "/units/material";

//Products

// export const CREATE_PRODUCT = API_VERSION + "/login";

export const GET_ALL_PRODUCTS = API_VERSION + "/products";

export const SEARCH_PRODUCTS_URL = API_VERSION + "/products/search";

export const GET_PRODUCT = API_VERSION + "/product";

export const ADD_PRODUCT = API_VERSION + "/products/add";

export const EDIT_PRODUCT_URL = BASE_URL + API_VERSION + "/product/edit";

export const ADD_MATERIALS_TO_PRODUCT = API_VERSION + "/product/add_materials";

export const ADD_RECIPES_TO_PRODUCT = API_VERSION + "/product/add_recipes";

export const ALL_RECIPES_URL = BASE_URL + API_VERSION + "/product/recipes";

export const ALL_MATERIALS_URL = BASE_URL + API_VERSION + "/product/materials";

export const DELETE_PRODUCT_MATERIAL =
  BASE_URL + API_VERSION + "/product/delete_material";

export const DELETE_PRODUCT_RECIPE =
  BASE_URL + API_VERSION + "/product/delete_recipe";

export const DELETE_PRODUCT_URL = BASE_URL + API_VERSION + "/products/delete";

export const PRODUCTS_TO_ADD_URL =
  BASE_URL + API_VERSION + "/products/products_to_add";

export const EDIT_PRODUCT_RECIPE_URL =
  BASE_URL + API_VERSION + "/product/edit_recipe";

export const EDIT_PRODUCT_MATERIAL_URL =
  BASE_URL + API_VERSION + "/product/edit_material";

//Profit Table

export const PRODUCTS_PROFITABLE_URL =
  BASE_URL + API_VERSION + "/profit_table/product_changes";

export const APPLY_PROFITABLE_CHANGES_URL =
  BASE_URL + API_VERSION + "/profit_table/apply_changes";

//Recipes

export const CREATE_RECIPE = API_VERSION + "/recipes/add";

export const GET_ALL_RECIPES = API_VERSION + "/recipes";

export const GET_RECIPE = API_VERSION + "/recipe";

export const UPLOAD_RECIPES = BASE_URL + API_VERSION + "/recipes/upload";

export const SEARCH_RECIPES_URL = BASE_URL + API_VERSION + "/recipes/search";

export const ALL_RECIPE_INGREDIENTS_URL =
  BASE_URL + API_VERSION + "/recipe/ingredients";

export const ADD_INGREDIENTS_TO_RECIPE_URL =
  BASE_URL + API_VERSION + "/recipe/add_ingredients";

export const EDIT_RECIPE_URL = BASE_URL + API_VERSION + "/recipe/edit";

export const DELETE_RECIPE_URL = BASE_URL + API_VERSION + "/recipe/delete";

export const EDIT_RECIPE_INGREDIENT_URL =
  BASE_URL + API_VERSION + "/recipe/edit_ingredient";

export const DELETE_RECIPE_INGREDIENT_URL =
  BASE_URL + API_VERSION + "/recipe/delete_ingredient";

//Inventory

export const GET_ALL_INVENTORY = API_VERSION + "/inventory";

export const UPLOAD_MATERIALS =
  BASE_URL + API_VERSION + "/inventory/materials/upload";

export const UPLOAD_INGREDIENTS =
  BASE_URL + API_VERSION + "/inventory/ingredients/upload";

export const SEARCH_INVENTORY_URL =
  BASE_URL + API_VERSION + "/inventory/search";

export const CREATE_INGREDIENT = API_VERSION + "/inventory/add_ingredient";

export const CREATE_MATERIAL = API_VERSION + "/inventory/add_material";

export const EDIT_INGREDIENT_URL =
  BASE_URL + API_VERSION + "/inventory/edit_ingredient";

export const EDIT_MATERIALS_URL =
  BASE_URL + API_VERSION + "/inventory/edit_material";

export const EDIT_MATERIAL_URL =
  BASE_URL + API_VERSION + "/inventory/edit_material";

export const DELETE_INGREDIENT_URL =
  BASE_URL + API_VERSION + "/inventory/delete_ingredient";

export const DELETE_MATERIAL_URL =
  BASE_URL + API_VERSION + "/inventory/delete_material";

//To Add
export const INGREDIENTS_TO_ADD = API_VERSION + "/inventory/ingredients_to_add";

export const MATERIALS_TO_ADD =
  BASE_URL + API_VERSION + "/inventory/materials_to_add";

export const RECIPES_TO_ADD =
  BASE_URL + API_VERSION + "/inventory/recipes_to_add";

//Orders

export const ALL_ORDERS_URL = BASE_URL + API_VERSION + "/orders";

export const ORDERS_TO_ADD = BASE_URL + API_VERSION + "/order/orders_to_add";

export const DELETE_ORDER_URL = BASE_URL + API_VERSION + "/orders/delete";

export const CREATE_ORDER_URL = BASE_URL + API_VERSION + "/orders/add";

export const SEARCH_ORDERS_URL = BASE_URL + API_VERSION + "/orders/search";

export const ORDER_PRODUCTS_URL = BASE_URL + API_VERSION + "/order/products";

export const GET_ORDER_URL = BASE_URL + API_VERSION + "/order";

export const EDIT_ORDER_URL = BASE_URL + API_VERSION + "/order/edit";

export const FULFILL_ORDER_URL = BASE_URL + API_VERSION + "/order/fulfill";

export const UNFULFILL_ORDER_URL = BASE_URL + API_VERSION + "/order/unfulfill";

export const ADD_PRODUCTS_TO_ORDER_URL =
  BASE_URL + API_VERSION + "/order/add_products";

export const EDIT_ORDER_PRODUCT_URL =
  BASE_URL + API_VERSION + "/order/edit_product";

export const DELETE_ORDER_PRODUCT_URL =
  BASE_URL + API_VERSION + "/order/delete_product";

export const ORDER_SHOPPING_LIST_URL =
  BASE_URL + API_VERSION + "/order/shopping-list";

export const ORDERS_SHOPPING_LIST_URL =
  BASE_URL + API_VERSION + "/orders/shopping-list";

export const RECENT_ORDERS_URL = BASE_URL + API_VERSION + "/recent_orders";

export const MAKE_RECIPE = BASE_URL + API_VERSION + "/recipe/make";

export const STOCKUP =
  BASE_URL + API_VERSION + "/inventory";
