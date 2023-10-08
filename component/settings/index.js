import { useEffect, useState } from "react";
import AddUnit from "./addunit";
import AddChildUnit from "./addchildunit";
import { AppContext } from "../../pages/AppContext";
import { useRouter } from "next/router";
import { toUpperCase, getBaseUnits } from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  EDIT_PROFILE_URL,
  GET_UNITS_URL,
  DELETE_UNIT_URL,
} from "../../utils/api.endpoints";
import {
  deleteRequest,
  getRequest,
  putRequest,
} from "../../utils/api.requests";
import { faTrash, faAdd, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "../general/deletedialog";
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { Icon } from "@iconify/react";
import BlockingLoadingComponent from "../general/blockingloading";

const Auth = new AuthHelperMethods();
const SettingsIndex = () => {
  const router = useRouter();

  const user = Auth.getAdmin();
  const [blockingLoading, setBlockingLoading] = useState(false);

  const appContext = AppContext();

  const [isEdit, setIsEdit] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddChildUnit, setShowAddChildUnit] = useState(false);

  const [showDeleteUnit, setShowDeleteUnit] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState(false);

  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [percentage, setPercentage] = useState(
    !user.profit_margin || user.profit_margin == 0 ? "" : user.profit_margin
  );

  const [entityInFocus, setEntityInfocus] = useState(null);

  const [baseUnit, setBaseUnit] = useState("none");

  useEffect(() => {
    getUnits();
  }, []);

  useEffect(() => {
    const baseUnits = getBaseUnits(units);

    if (baseUnits.length > 0 && !baseUnit) {
      setBaseUnit(baseUnits[0]);
    }
  }, [units]);

  const closeDeleteUnit = () => {
    setEntityInfocus({});
    setShowDeleteUnit(false);
  };

  const openDeleteUnit = (e, unit) => {
    e.preventDefault();
    setEntityInfocus(unit);
    setShowDeleteUnit(true);
  };

  const closeEditUnit = () => {
    setShowEditUnit(false);
  };

  const deleteUnit = async () => {
    setBlockingLoading(true);

    try {
      let result = await deleteRequest(DELETE_UNIT_URL, {
        unitId: entityInFocus._id,
      });

      closeDeleteUnit();

      if (!!result) {
        getUnits();
      }

      setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred deleteing the unit",
        title: "Unit Not Deleted",
        type: "ERROR",
      });
    }
  };

  const openEditUnit = () => {
    setShowEditUnit(true);
  };

  const openAddUnit = () => {
    setShowAddUnit(true);
  };

  const closeAddUnit = () => {
    setShowAddUnit(false);
  };

  const openAddChildUnit = (e, parentUnit) => {
    e.preventDefault();
    setEntityInfocus(parentUnit);
    setShowAddChildUnit(true);
  };

  const closeAddChildUnit = () => {
    setEntityInfocus(null);
    setShowAddChildUnit(false);
  };

  const showValidInput = () => {
    setIsInput(true);
  };

  const hideValidInput = () => {
    setIsInput(false);
  };

  const switchIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const getUnits = async () => {
    appContext.setBlockingLoading(true);

    try {
      let result = await getRequest(GET_UNITS_URL);

      if (!!result) {
        setUnits(result.response);
        setFilteredUnits(result.response);
      }

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred fetching units",
        title: "Units Not Loaded",
        type: "ERROR",
      });
    }
  };

  const cancelInput = () => {
    hideValidInput();

    setPercentage(user.profit_margin);

    setIsEdit(!isEdit);
  };

  const onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setPercentage(value);
  };

  const onBaseUnitChange = (e) => {
    let value = e.target.value;

    if (value == "none") {
      setFilteredUnits(units);
    } else {
      const filteredtItems = units.filter((aUnit) => {
        return aUnit?.parent == value && !aUnit?.isBase;
      });

      setFilteredUnits(filteredtItems);
    }

    setBaseUnit(value);
  };

  const saveInput = async () => {
    setBlockingLoading(true);
    hideValidInput();

    try {
      if (percentage === "") {
        showValidInput();
      } else {
        user.profit_margin = percentage;

        const result = await putRequest(EDIT_PROFILE_URL, user);

        Auth.setAdmin(user);

        setBlockingLoading(false);

        setIsEdit(!isEdit);
      }
    } catch (err) {
      console.log(err);
      setBlockingLoading(false);
    }
  };

  return (
    <div className="mt-20 py-12 px-8 lg:mt-0 lg:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className=" mt-10 flex items-center">
        <Icon
          icon="material-symbols:settings"
          className=" h-auto w-16 rounded-lg bg-bgPurple p-3 text-primary"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">
            <span className="block text-3xl font-bold">Settings</span>
          </h2>
        </div>
      </div>

      <div className="mt-16">
        <div>
          {/* profit_margin_group */}
          <div className=" w-full max-w-800">
            <h4 className="mb-7 text-xl font-bold text-bgPurple">
              Profit margin
            </h4>
            <div>
              <input
                className=" h-12 rounded-lg border 
                border-bgPurple bg-bgPurple/10 px-3 outline-none placeholder:text-xs focus:border-dogwoodRose "
                onChange={onChange}
                value={percentage}
                type="number"
                min={"0"}
                name="percentage"
                placeholder="Enter margin percentage"
              />
              {isInput && (
                <h5 className="my-3 text-sm text-dogwoodRose">
                  Input field cannot be empty.
                </h5>
              )}
            </div>
          </div>
          <div className="mt-8 flex items-center">
            <button
              onClick={saveInput}
              className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
            >
              Save
            </button>
            <button
              onClick={cancelInput}
              className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
            >
              Cancel
            </button>
          </div>
        </div>
        {/* currency_section_grouped */}
        <div className="xl:flex-rol mt-8 w-full flex-col justify-between gap-x-12 xl:w-900">
          {/* currency_section */}
          <div className="w-full xl:w-1/2">
            <h4 className="mb-7 text-xl font-bold text-bgPurple">Currency</h4>
            <div>
              <input
                className=" h-12 rounded-lg border border-bgPurple bg-bgPurple/10 px-3 outline-none placeholder:text-xs focus:border-dogwoodRose "
                onChange={onChange}
                value=""
                type="number"
                min={"0"}
                name="percentage"
                placeholder="Nigeria Naira {N}"
              />
              {/* curreny_type */}
              <button className="my-6 flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple">
                Save
              </button>
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <h4 className="mb-7 text-xl font-bold text-bgPurple">
              Currency Calculator
            </h4>
            {/* input_amount */}
            <div className="flex items-center">
              <input
                className=" h-12 rounded-lg border border-bgPurple bg-bgPurple/10 px-3 outline-none placeholder:text-xs focus:border-dogwoodRose "
                onChange={onChange}
                value=""
                type="number"
                min={"0"}
                name="percentage"
                placeholder="Input amount"
              />
              {/* curreny_type */}
              <div className="transition-colorsfocus:border-dogwoodRose relative ml-6 flex h-12 w-32 cursor-pointer items-center justify-between rounded-lg bg-bgPurple px-3 shadow-lg outline-none">
                <select className="absolute left-0 top-0 bottom-0 right-0 w-full appearance-none rounded-lg bg-bgPurple px-3 text-primary outline-none">
                  <option> NGN</option>
                  <option className=" w-28 px-4">EUR</option>
                  <option className="w-28 px-4">USD</option>
                </select>
                <Icon
                  icon="mdi:caret"
                  className="absolute right-2 rotate-180 text-lg font-semibold  text-primary"
                />
              </div>
            </div>

            {/* Converted_amount */}
            <div className="mt-8 flex">
              <input
                className=" block h-12 rounded-lg border border-bgPurple bg-bgPurple/10 px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
                value=""
                type="number"
                min={"0"}
                name="percentage"
                placeholder="Converted amount"
              />
              {/* currency_type */}
              <div className="transition-colorsfocus:border-dogwoodRose relative ml-6 flex w-32 cursor-pointer items-center justify-between rounded-lg bg-primary px-3 shadow-lg outline-none">
                <select className="absolute left-0 right-0 w-full appearance-none px-3 outline-none">
                  <option> NGN</option>
                  <option className=" w-28 px-4">EUR</option>
                  <option className="w-28 px-4">USD</option>
                </select>
                <Icon
                  icon="mdi:caret"
                  className=" absolute right-2 rotate-180 text-lg  font-semibold"
                />
              </div>
            </div>
            <button className="my-6 flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple">
              Convert
            </button>
          </div>
          {/* convert_btn */}
        </div>

        <div className="mt-16">
          <div>
            <h4 className="mb-7 text-xl font-bold text-bgPurple">Base Units</h4>
          </div>

          <div>
            <div>
              {!appContext.state.isLoading && units && units.length > 0 && (
                <div>
                  <div className="flex flex-col">
                    <h4 className="mb-3 text-base font-semibold">
                      Base Units Filter
                    </h4>
                    <div className="flex flex-col items-start justify-between xl:flex-row  xl:items-center">
                      <select
                        onChange={onBaseUnitChange}
                        className="h-12 w-full rounded-lg border border-bgPurple bg-bgPurple/10 px-5 py-1 outline-none xl:w-500"
                        name="parent"
                      >
                        <option value="none">None</option>
                        {getBaseUnits(units).map((aBaseUnit) => {
                          return (
                            <option key={aBaseUnit?._id} value={aBaseUnit?._id}>
                              {aBaseUnit?.name} ({aBaseUnit?.abbreviation})
                            </option>
                          );
                        })}
                      </select>
                      <button
                        onClick={openAddUnit}
                        className="mt-6 flex max-h-24 items-center  justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple xl:mt-0"
                      >
                        <FontAwesomeIcon icon={faAdd} /> Add Units
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!appContext.state.isLoading ? (
                <table className="mt-12 table-fixed border-separate border-spacing-y-2 w-full">
                  <thead className="w-full">
                    <tr className="bg-bgPurple py-4 text-primary">
                      <th className="rounded-tl-lg border-r-2 border-primary px-3 py-4">
                        Name
                      </th>
                      <th className="border-r-2 border-primary p-3">
                        Abbreviation
                      </th>
                      <th className="border-r-2 border-primary p-3">Amount</th>
                      <th className=" rounded-tr-lg"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnits &&
                      filteredUnits.length > 0 &&
                      filteredUnits.map((unit) => {
                        return (
                          <tr
                            className="border-separate w-full border-spacing-2 bg-bgPurple/10"
                            key={unit?._id}
                          >
                            <td className="border-r-2 truncate border-primary p-4 text-center">
                              {unit && toUpperCase(unit?.name)}
                              {unit?.isBase && "(base unit)"}
                            </td>
                            <td className="border-r-2 border-primary p-4 text-center">
                              {unit?.abbreviation}
                            </td>
                            <td className="border-r-2 border-primary p-4 text-center">
                              {unit?.amount}
                            </td>
                            <td className=" flex items-center flex-wrap p-4 gap-2 justify-center">
                              {unit?.isDefault ? (
                                <></>
                              ) : (
                                <button className=" bg-bgPurple p-2 text-primary">
                                  <FontAwesomeIcon icon={faPen} />
                                </button>
                              )}

                              {unit?.isDefault ? (
                                <></>
                              ) : (
                                <button
                                  onClick={(e) => openDeleteUnit(e, unit)}
                                  className=" bg-dogwoodRose p-2 text-primary"
                                  disabled={true}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              )}

                              {unit?.isBase && (
                                <button
                                  onClick={(e) => openAddChildUnit(e, unit)}
                                  className=" h-12 w-12 bg-primary p-2  text-bgPurple shadow-md"
                                >
                                  <FontAwesomeIcon icon={faAdd} />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              ) : (
                <div className="skeletonHolder">
                  <Skeleton count={8} height={50} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddUnit && (
        <AddUnit
          closeAddUnit={closeAddUnit}
          getUnits={getUnits}
          baseUnits={getBaseUnits(units)}
        />
      )}

      {showAddChildUnit && (
        <AddChildUnit
          closeAddChildUnit={closeAddChildUnit}
          getUnits={getUnits}
          parentUnitDetails={entityInFocus}
        />
      )}

      {showDeleteUnit && (
        <DeleteDialog
          message={"Confirm that you want to delete " + entityInFocus.name}
          onPerformDeleteClicked={deleteUnit}
          onCancelDeleteClicked={closeDeleteUnit}
          type={"Unit"}
        />
      )}
    </div>
  );
};

export default SettingsIndex;
