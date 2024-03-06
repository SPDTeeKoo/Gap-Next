import Router from "next/router";
import Cookies from "js-cookie";

// type for setToken funtion arguments
interface TokenData {
  jwt: string;
  firstName: String;
  lastName: string;
  userType: string;
  isAdmin: boolean;
  brand_details: string | undefined;
  id: number;
}

// setting userInfo and jwt
export const setToken = (data: TokenData) => {
  if (
    typeof window === "undefined" ||
    !data ||
    !data.firstName ||
    !data.jwt ||
    !data.lastName ||
    !data.userType ||
    !data.id
  ) {
    return;
  }
  if (data.id !== undefined) {
    Cookies.set("id", data.id.toString()); // Convert to string bcz cookies only accept in string type data
  }
  if (
    data.firstName &&
    data.lastName &&
    data.userType &&
    data.isAdmin &&
    data.id &&
    data.jwt
  ) {
    alert("&&1");
    Cookies.set("firstName", data.firstName.toString()); // Convert to string bcz cookies only accept in string type data
    Cookies.set("lastName", data.lastName.toString()); // Convert to string bcz cookies only accept in string type data
    Cookies.set("userType", data.userType.toString()); // Convert to string bcz cookies only accept in string type data
    Cookies.set("isAdmin", data.isAdmin.toString()); // Convert to string bcz cookies only accept in string type data
    Cookies.set("id", data.id.toString()); // Convert to string bcz cookies only accept in string type data
    Cookies.set("jwt", data.jwt);
  }
  if (data.brand_details) {
    Cookies.set("brand_details", data.brand_details.toString());
  }
};

// // get token from browser =>for identifying user is login or not!
export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

// Get specific data from the "brandDetails" cookie
export const getUserDetailsFromLocalCookie = () => {
  const Fname = Cookies.get("firstName");
  const Lname = Cookies.get("lastName");
  const jwt = Cookies.get("jwt");
  const userType = Cookies.get("userType");

  if (Fname && Lname && jwt && userType) {
    // Parse the JSON string into an object
    // const brandDetails = JSON.parse(Fname);

    // Extract the specific properties you need
    // const { Fname, Lname, jwt, id } = brandDetails;

    // Return an object with the extracted properties
    return { Fname, Lname, jwt, userType };
  } else {
    return null; // Return null or handle this case accordingly
  }
};

// extracting all userdata

// removing data at logout
export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("firstName");
  Cookies.remove("lastName");
  Cookies.remove("brand_details");
  Cookies.remove("userType");
  Cookies.remove("isAdmin");
  Cookies.remove("brandDetails");
};

// get id from local cookie
export const getIdFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((data) => {
      return data;
    });
  } else {
    return;
  }
};

export function calculate20PercentOutOfEuro(amountInEuro: any) {
  // Check if the provided amount is a valid number
  if (isNaN(amountInEuro) || amountInEuro < 0) {
    return "Invalid input. Please provide a valid number.";
  }
  // Calculate 20% of the amount in Euro
  const twentyPercent = 0.2 * amountInEuro;

  // Return the result
  return twentyPercent;
}

// // get token form server side component
// export const getTokenFromServerCookie = req => {
//   if (!req.headers.cookie || '') {
//     return undefined;
//   }
//   const jwtCookie = req.headers.cookie
//     .split(';')
//     .find(c => c.trim().startsWith('jwt='));
//   if (!jwtCookie) {
//     return undefined;
//   }
//   const jwt = jwtCookie.split('=')[1];
//   return jwt;
// };
