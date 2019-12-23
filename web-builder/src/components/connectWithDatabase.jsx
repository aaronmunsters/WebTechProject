import axios from "axios";

/* ------------------------------------------------------------------
the connection to the database. This also stores the information about
the currently logged in user
-------------------------------------------------------------------*/
export default class AxiosConnection {
  constructor(props) {
    const development = false;
    this.origin = new URL(document.URL).origin;
    if (development) {
      this.origin = "http://localhost:3001";
    }
  }

  state = {
    userRole: "",
    loggedIn: false,
    user: "",
    config: {}
  };
  logOut() {
    this.state.loggedIn = false;
    this.state.config = {};
  }

  /* ------------------------------------------------------------------
  when a user logs in, their credentials get checked. If they are correct
  their username, and role get saved for later use. The token gets inserted
  in the headers so when we later want to ask something to the database
  this is already set.
  -------------------------------------------------------------------*/
  login = async (email, password) => {
    const userToken = await axios.post(this.origin + "/v1/api/login", {
      email: email,
      password: password
    });
    if (userToken.data.error) return false;
    else {
      this.state.config = { headers: { "auth-token": userToken.data.token } };
      this.state.loggedIn = true;
      this.state.user = userToken.data.name;
      this.state.userRole = userToken.data.role;
      return true;
    }
  };

  /* ------------------------------------------------------------------
  check whether the user has the privileges to manipulate this type of Data
  -------------------------------------------------------------------*/
  disabled(typeOfData) {
    if (this.state.userRole === "admin") return false;
    if (this.state.userRole === "editor") {
      switch (typeOfData) {
        case "user":
        case "layout":
          return true;
        default:
          return false;
      }
    }
  }

  /* ------------------------------------------------------------------
  uploads a picture to the database. The headers need to also contain
  the content-type: multipart/form-data for this to work.
  -------------------------------------------------------------------*/
  uploadPicture = async (connectType, options) => {
    const url = this.origin + "/v1/api/image";
    let config = { ...this.state.config };
    config.headers = {
      "content-type": `multipart/form-data`,
      ...config.headers
    };
    let responce = await axios.post(url, options, config);
    if (responce.data.error)
      console.log("=== BACKEND ERROR ===", responce.data.error);
    return responce.data;
  };

  /* ------------------------------------------------------------------
  performs the correct manipulation to the database
  -------------------------------------------------------------------*/
  ConnectWithDatabase = async (connectType, url, options) => {
    url = this.origin + "/v1/api/" + url;
    let { config } = this.state;
    const typeFunction = () => {
      switch (connectType) {
        case "get":
          let Config = {
            params: { filters: options ? options : {} },
            ...config
          };
          return axios.get(url, Config);
        case "put":
          return axios.put(url, options, config);
        case "post":
          return axios.post(url, options, config);
        case "delete":
          return axios.delete(url, config);
        default:
          return null;
      }
    };
    let responce = await typeFunction();
    if (responce.data.error)
      console.log("=== BACKEND ERROR ===", responce.data.error);
    return responce.data;
  };
}
