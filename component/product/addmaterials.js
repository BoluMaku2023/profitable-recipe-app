import { useEffect, useState, useContext } from "react";
import EmptyResult from "../general/emptyResult";
import MaterialToAdd from "./materialToAdd";
import { AppContext } from "../../pages/AppContext";
import { defaultPaginationObject } from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchInput from "../general/searchInput";
import { postRequest, getRequest } from "../../utils/api.requests";
import {
  BASE_URL,
  MATERIALS_TO_ADD,
  ADD_MATERIALS_TO_PRODUCT,
} from "../../utils/api.endpoints";
import BlockingLoadingComponent from "../general/blockingloading";

const add_materials_url = BASE_URL + ADD_MATERIALS_TO_PRODUCT;

const AddMaterials = ({
  hideAddMaterial,
  loadProductMaterials,
  product,
  units,
}) => {
  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [materials, setMaterials] = useState([]);

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    page:0, 
    limit: process.env.NEXT_PUBLIC_PAGINATION_LIMIT || 1000, 
    totalPagesCount: 1
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMaterialsToAddSearch();
  }, [searchTerm]);

  const onChange = (e, material) => {
    const value = e.target.value;

    material.quantity = value;

    const foundIndex = materials.docs.findIndex(
      (aMaterial) => aMaterial._id == material._id
    );

    if (foundIndex != -1) {
      const sm = selectedMaterials;

      sm.splice(foundIndex, 1, material);

      setMaterials({ ...materials, docs: sm });
    }
  };

  const getMaterialsToAdd = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        MATERIALS_TO_ADD + "?product_id=" + product._id
      );

      const new_result = result.response.map((material) => {
        return { ...material, quantity: 0 };
      });

      setMaterials(new_result);

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const emptySearchAndGetMaterials = async () => {
    setSearchTerm("");

    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        MATERIALS_TO_ADD +
          "?product_id=" +
          product._id +
          "&search_term=" +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.map((material) => {
        return { ...material, quantity: 0 };
      });

      setMaterials({ ...result.response, docs: new_result });

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const getMaterialsToAddSearch = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        MATERIALS_TO_ADD +
          "?product_id=" +
          product._id +
          "&search_term=" +
          searchTerm +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((material) => {
        return { ...material, quantity: 0 };
      });

      setMaterials({ ...result.response, docs: new_result });

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const addMaterialToSelected = (material) => {
    setError("");

    const sm = selectedMaterials;

    const foundIndex = selectedMaterials.findIndex(
      (aMaterial) => aMaterial.material == material._id
    );

    if (foundIndex == -1) {
      sm.push({
        material: material._id,
        quantity: material.quantity,
        unit: material.unit,
      });
    } else {
      sm.splice(foundIndex, 1);
    }

    setSelectedMaterials(sm);
  };

  const doAddMaterials = async () => {
    if (selectedMaterials.length > 0) {
      setBlockingLoading(true);

      setError("");

      try {
        const response = await postRequest(add_materials_url, {
          id: product._id,
          materials: selectedMaterials,
        });

        setBlockingLoading(false);

        loadProductMaterials();

        hideAddMaterial();
      } catch (err) {
        console.log(err);
        setBlockingLoading(false);
      }
    } else {
      if (materials.length > 0) {
        setError("Add materials to product by clicking/tapping the add button");
      }
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto w-full items-center justify-center bg-secondary/50 px-8">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="flex max-h-[700px] min-w-250 max-w-5xl flex-col overflow-y-scroll rounded-lg bg-primary scrollbar-hide">
        <div className="flex w-full flex-col items-start justify-between rounded-t-lg rounded-r-lg bg-primary p-6 shadow-md">
          <div>
            <h4 className="text-xl font-bold text-bgPurple">
              Add Materials to {product.name}
            </h4>
            <h5 className="my-2 ">Select Materials to add</h5>
          </div>
          <div className="mt-4 flex w-full justify-between gap-x-6">
            <SearchInput
              search_value={searchTerm}
              searchClicked={getMaterialsToAddSearch}
              onSearchChanged={onSearchChanged}
              closeSearchClicked={emptySearchAndGetMaterials}
            />
            <div className="flex items-center">
              <button
                onClick={doAddMaterials}
                className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
              >
                Save
              </button>
              <button
                onClick={hideAddMaterial}
                className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 flex h-full w-full flex-col items-center justify-between rounded-b-lg rounded-l-lg p-4 shadow-lg">
          <h5 className="bg-dogwoodRose">
            {error && error.length > 0 && error}
          </h5>
          <table className="w-full table-auto border-separate border-spacing-y-2 px-3 pt-0  pb-8">
            {!appContext.state.isLoading ? (
              <>
                {materials && materials.docs && materials.docs.length > 0 ? (
                  <thead>
                    <tr className="bg-bgPurple text-sm">
                      <th className=" py-4 text-primary">Name</th>
                      <th className="px-2 text-primary">Quantity To Add</th>
                      <th className="py-4 text-primary">Unit</th>
                      <th></th>
                    </tr>
                    {materials.docs.map((material, inKey) => {
                      return (
                        <MaterialToAdd
                          addToSelected={addMaterialToSelected}
                          material={material}
                          onChange={onChange}
                          selectedMaterials={selectedMaterials}
                          units={units}
                          key={inKey}
                        />
                      );
                    })}
                  </thead>
                ) : (
                  <EmptyResult
                    message={
                      "No Materials found to add. Add materials to inventory"
                    }
                    onEmptyButtonClicked={getMaterialsToAddSearch}
                    emptyButtonText={"Try Again"}
                  />
                )}
              </>
            ) : (
              <Skeleton count={10} height={0} />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddMaterials;
