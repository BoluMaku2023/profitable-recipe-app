import AuthHelperMethods from "./AuthHelperMethods";

const Auth = new AuthHelperMethods();

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const stringRegex = /^[a-zA-Z\-]+$/;

export const phoneNumberRegex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

export const getPriceOfQuantity = (
  originalPrice,
  originalQuantity,
  unitamount,
  iunitAmount
) => {
  return (originalPrice * originalQuantity * unitamount) / iunitAmount;
};

export const defaultPaginationObject = {
  page: 0,
  limit: process.env.NEXT_PUBLIC_PAGINATION_LIMIT || 20,
  totalPagesCount: 1,
};

export const downloadFile = (data, file_name) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", file_name);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
};

export const getDate = (d) => {
  let date = new Date(d);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  return dt + " - " + month + " - " + year;
};

export const toUpperCase = (aString) => {
  return !aString ? null : aString.charAt(0).toUpperCase() + aString.slice(1);
};

export const checkValidProductToAdd = (product) => {
  if (!product.name || product.name.length == 0) {
    return false;
  }

  return true;
};

export const checkValidLabourCost = (product) => {
  if (!product.labour_cost || product.labour_cost == 0) {
    return false;
  }

  return true;
};

export const checkValidOverheadCost = (product) => {
  if (!product.overhead_cost || product.overhead_cost == 0) {
    return false;
  }

  return true;
};

export const getBankDetails = () => {
  return [
    {
      bank_name: "Access Bank Plc",
      bank_code: "044",
      short_code: "ABP",
    },
    {
      bank_name: "Diamond Bank",
      bank_code: "063",
      short_code: "DBP",
    },
    {
      bank_name: "Ecobank Nigeria",
      bank_code: "050",
      short_code: "ECO",
    },
    {
      bank_name: "Enterprise Bank Plc",
      bank_code: "084",
      short_code: "ENB",
    },
    {
      bank_name: "Fidelity Bank Plc",
      bank_code: "070",
      short_code: "FBP",
    },
    {
      bank_name: "First Bank of Nigeria Plc",
      bank_code: "011",
      short_code: "FBN",
    },
    {
      bank_name: "First City Monument Bank",
      bank_code: "214",
      short_code: "FCMB",
    },
    {
      bank_name: "Guaranty Trust Bank Plc",
      bank_code: "058",
      short_code: "GTB",
    },
    {
      bank_name: "Heritage Bank",
      bank_code: "030",
      short_code: "HBP",
    },
    {
      bank_name: "Jaiz Bank",
      bank_code: "301",
      short_code: "JAIZ",
    },
    {
      bank_name: "Keystone Bank Ltd",
      bank_code: "082",
      short_code: "KSB",
    },
    {
      bank_name: "Mainstreet Bank Plc",
      bank_code: "014",
      short_code: "MSB",
    },
    {
      bank_name: "Polaris Bank",
      bank_code: "076",
      short_code: "SKYE",
    },
    {
      bank_name: "Stanbic IBTC Plc",
      bank_code: "039",
      short_code: "STANBIC",
    },
    {
      bank_name: "Sterling Bank Plc",
      bank_code: "232",
      short_code: "SBP",
    },
    {
      bank_name: "Union Bank Nigeria Plc",
      bank_code: "032",
      short_code: "UBN",
    },
    {
      bank_name: "United Bank for Africa Plc",
      bank_code: "033",
      short_code: "UBA",
    },
    {
      bank_name: "Unity Bank Plc",
      bank_code: "215",
      short_code: "UNITY",
    },
    {
      bank_name: "WEMA Bank Plc",
      bank_code: "035",
      short_code: "WEMA",
    },
    {
      bank_name: "Zenith Bank International",
      bank_code: "057",
      short_code: "ZIB",
    },
  ];
};

export const getTrueAmount = (currency, amount) => {
  amount = parseInt(amount);
  if (currency.currency.code == "NGN") {
    return amount * 100;
  } else {
    return amount;
  }
};

export const getTruePM = (time) => {
  switch (time) {
    case "12":
      return "12";
      break;
    case "1":
      return "13";
      break;
    case "2":
      return "14";
      break;
    case "3":
      return "15";
      break;
    case "4":
      return "16";
      break;
    case "5":
      return "17";
      break;
    case "6":
      return "18";
      break;
    case "7":
      return "19";
      break;
    case "8":
      return "20";
      break;
    case "9":
      return "21";
      break;
    case "10":
      return "22";
      break;
    case "11":
      return "23";
      break;
  }
};

export const StrengthChecker = (PasswordParameter) => {
  var strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  var mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  if (strongPassword.test(PasswordParameter)) {
    return "strong";
  } else if (mediumPassword.test(PasswordParameter)) {
    return "medium";
  } else {
    return "weak";
  }
};

export const dateFormatter = (dt) => {
  const date = new Date(dt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  }/${year}`;
};

export const getAmount = (amount) => {
  if (amount || amount == 0) {
    var a = Number(amount).toFixed(2).toString();
    let b = 0;
    let c = 0;

    if (a.includes(".")) {
      let s = a.split(".");
      b = s[0];
      c = s[1];
    }

    switch (b.length) {
      case 4:
        return "₦" + b.slice(0, 1) + "," + b.slice(1) + "." + c;
      case 5:
        return "₦" + b.slice(0, 2) + "," + b.slice(2) + "." + c;
      case 6:
        return "₦" + b.slice(0, 3) + "," + b.slice(3) + "." + c;
      case 7:
        return (
          "₦" + b.slice(0, 1) + "," + b.slice(1, 4) + "," + b.slice(4) + "." + c
        );
      case 8:
        return (
          "₦" + b.slice(0, 2) + "," + b.slice(2, 5) + "," + b.slice(5) + "." + c
        );
      case 9:
        return (
          "₦" + b.slice(0, 3) + "," + b.slice(3, 6) + "," + b.slice(6) + "." + c
        );
      case 10:
        return (
          "₦" +
          b.slice(0, 1) +
          "," +
          b.slice(1, 4) +
          "," +
          b.slice(4, 7) +
          "," +
          b.slice(7) +
          "." +
          c
        );
      case 11:
        return (
          "₦" +
          b.slice(0, 2) +
          "," +
          b.slice(2, 5) +
          "," +
          b.slice(5, 8) +
          "," +
          b.slice(8) +
          "." +
          c
        );
      case 12:
        return (
          "₦" +
          b.slice(0, 3) +
          "," +
          b.slice(3, 6) +
          "," +
          b.slice(6, 9) +
          "," +
          b.slice(9) +
          "." +
          c
        );
      default:
        return "₦" + b;
    }
  } else {
    return "₦0";
  }
};

export const getPlainUnits = (units) => {
  const allUnits = [];

  units.map((aUnit) => {
    let latestUnit = aUnit;

    do {
      allUnits.push({
        name: latestUnit?.name,
        abbreviation: latestUnit?.abbreviation,
      });
      latestUnit = latestUnit?.unit;
    } while (!!latestUnit);
  });

  return allUnits;
};

export const getBaseUnits = (units) => {
  const baseUnits = [];

  units &&
    units.map((aUnit) => {
      if (aUnit?.isBase) baseUnits.push(aUnit);
    });

  return baseUnits;
};

export const getChildQuantityFromParentQuantity = (
  desiredAmount,
  parentAmount,
  childAmount
) => {
  if (!childAmount || !parentAmount || !desiredAmount) {
    return desiredAmount;
  }

  if (childAmount == parentAmount) {
    return desiredAmount;
  }

  return (desiredAmount * parentAmount) / childAmount;
};

export const getMaterialQuantityCost = (
  materialUnitObject,
  desiredUnitObject,
  materialObject,
  desiredQuantity
) => {
  if (materialUnitObject?._id == desiredUnitObject?._id) {
    return getPriceOfQuantity(
      materialObject?.price,
      materialObject?.purchase_quantity?.amount,
      desiredQuantity
    );
  }

  if (materialUnitObject?.isBase) {
    //return getPriceOfQuantity(materialObject?.price, materialObject?.purchase_quantity?.amount,  )
    return (
      (desiredQuantity * materialObject?.price) /
      (materialObject?.purchase_quantity?.amount * materialObject?.pieces)
    );
  }

  if (desiredUnitObject?.isBase) {
    return (
      (desiredQuantity * materialObject?.price) /
      (materialObject?.purchase_quantity?.amount / materialObject?.pieces)
    );
  }

  return 0;
};

export const getMaterialUnit = (units, desiredUnitId) => {
  return units.filter((aUnit) => aUnit?._id == desiredUnitId).shift();
};
