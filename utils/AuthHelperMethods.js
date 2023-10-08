import axios from "axios";
import decode from "jwt-decode";

const login_url = "/api/v1/access/login";
const signup_url = "/api/v1/access/signup";
const logout_url = "/api/v1/admin/logout";

export default class AuthHelperMethods {
  login = (email, password) => {
    return this.axios(login_url, { email, password }, "post")
      .then((res) => {
        //TODO check status
        const authResp = res.data.data;
        this.setToken(authResp.token);
        this.setAdmin(authResp.user);

        console.log(authResp.user);

        return res.data;
      })
      .catch((err) => {
        // console.log(err);
        return "error";
      });

    //localStorage.setItem("loggedIn", true)
  };

  signup = (data) => {
    return this.axios(signup_url, data, "post")
      .then((res) => {
        this.setToken(res.data.token);
        this.setAdmin(res.data.tenant);
        return res;
      })
      .catch((err) => {
        console.log("axios end");
        // console.log(err);
        return err;
      });
  };

  logoutAPI = () => {
    // Clear user token and profile data from localStorage
    return this.axios(logout_url, {}, "post")
      .then((res) => {
        this.logout();
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      this.logout();
      //   console.log("expired check failed!");
      return false;
    }
  };

  setAdmin = (admin) => {
    localStorage.setItem("admin", JSON.stringify(admin));
    console.log(admin);
  };

  getAdmin = () => {
    var admin = localStorage.getItem("admin");

    if (admin && admin !== "undefined") {
      console.log(JSON.parse(admin));
      return JSON.parse(admin);
    }

    return {};
  };

  setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  };

  logout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("admin");
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    let answer = decode(this.getToken());

    return answer;
  };

  axios = (url, data, method) => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":
        "https://profitable-recipe-webapp.vercel.app/",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

    if (typeof window !== "undefined") {
      //if we are on the browser then attach the token
      if (this.loggedIn()) {
        headers["Authorization"] = "Bearer " + this.getToken();
      }
    }

    return axios({
      url: url,
      method: method,
      data: method === "get" ? {} : data,
      params: method === "get" ? data : {},
      baseURL: "https://backend-theprofittable2022.koyeb.app",
      timeout: 30000,
      headers: headers,
      withCredentials: false,
    })
      .then(this._checkStatus)
      .then((response) => response)
      .catch((err) => {
        if (
          err.response.data == "Bad Request Token" ||
          err.response.data == "Expired Token"
        ) {
          this.logout();
        }
        throw new Error(err);
      });
  };

  _checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
