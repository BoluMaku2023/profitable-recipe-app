import { useState } from "react";
import { getAmount, toUpperCase } from "../../utils/helper";
import AddName from "./materialscreens/AddName";
import AddStock from "./materialscreens/AddStock";
import AddPurchase from "./materialscreens/AddPurchase";
import AddConversion from "./materialscreens/AddConversion";
import Summary from "./materialscreens/Summary";

const AddMaterial = ({ units, closeAddMaterial, addMaterialToInventory }) => {
  const [material, setMaterial] = useState({
    name: "",
    purchase_quantity: "",
    purchase_unit: units[0],
    price: 0,
    quantity_in_stock: 0,
    lowLevel: 0,
    pieces: 0,
  });

  const [currentUI, setCurrentUI] = useState(1);

  const setName = (aName) => {
    setMaterial({ ...material, name: aName });
  };

  const setConversion = (conversion) => {
    setMaterial({ ...material, pieces: conversion });
  };

  const setPurchase = ({ unit, amount, price }) => {
    unit = units.filter((aUnit) => aUnit?._id == unit).shift();

    setMaterial({
      ...material,
      purchase_unit: unit,
      price: price,
      purchase_quantity: amount,
    });
  };

  const setInStock = ({ inStock, lowLevel }) => {
    setMaterial({
      ...material,
      quantity_in_stock: inStock,
      lowLevel: lowLevel,
    });
  };

  const moveCurrentUI = (num) => {
    setCurrentUI(num);
  };

  const saveMaterial = (finalMaterial) => {
    console.log(finalMaterial);
    addMaterialToInventory(finalMaterial);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-40 flex items-center justify-center bg-secondary/50 px-8">
      <div>
        {/* {currentUI == 1 && (
          <AddName
            setName={setName}
            moveCurrentUI={moveCurrentUI}
            closeAddMaterial={closeAddMaterial}
          />
        )}

        {currentUI == 2 && (
          <AddConversion
            setConversion={setConversion}
            moveCurrentUI={moveCurrentUI}
            closeAddMaterial={closeAddMaterial}
          />
        )}

        {currentUI == 3 && (
          <AddPurchase
            setPurchase={setPurchase}
            moveCurrentUI={moveCurrentUI}
            units={units}
            closeAddMaterial={closeAddMaterial}
          />
        )}

        {currentUI == 4 && (
          <AddStock
            unit_name={material.purchase_unit?.name}
            material_name={material.name}
            setInStock={setInStock}
            moveCurrentUI={moveCurrentUI}
            closeAddMaterial={closeAddMaterial}
          />
        )}

        {currentUI == 5 && ( */}
        <Summary
          saveMaterial={saveMaterial}
          newMaterial={material}
          units={units}
          closeAddMaterial={closeAddMaterial}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default AddMaterial;
