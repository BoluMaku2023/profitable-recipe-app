import React from "react";

import ProductsList from "./ProductsList";

import styles from "../../styles/Products.module.css";

import AddRecipe from "../general/addrecipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPen,
  faAdd,
  faTrash,
  faSearch,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ProductsIndex = () => {
  const [showAdd, setShowAdd] = useState(false);

  const showAddProduct = () => {
    setShowAdd(true);
  };

  const closeAddProduct = () => {
    setShowAdd(false);
  };

  return (
    <>
      <div>
        <div className={styles.productsTop}>
          <h2 className="pageTitle">Products</h2>
          <div>
            <h4>Total cost</h4>
            <h4>#50,000</h4>
          </div>
          <div className="pageHolderContentTopRight">
            <button
              onClick={showAddProduct}
              className={`squareButtonPrimary ${styles.productsButton}`}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              onClick={showAddProduct}
              className={`squareButtonPrimary ${styles.productsButton}`}
            >
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
        </div>
        <div className={styles.productsTop}>
          <h4>Description - </h4>
        </div>

        <div className={styles.productsListHolder}>
          <ProductsList />
        </div>
      </div>

      {showAdd && <AddRecipe closeAddProduct={closeAddProduct} />}
    </>
  );
};

export default ProductsIndex;
