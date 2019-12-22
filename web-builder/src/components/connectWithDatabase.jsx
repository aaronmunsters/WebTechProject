import axios from "axios";

export default class AxiosConnection {
  state = {
    userRole: "admin",
    loggedIn: false,
    user: "",
    config: {}
  };
  logOut() {
    this.state.loggedIn = false;
    this.state.config = {};
  }
  login = async (email, password) => {
    const userToken = await axios.post("http://localhost:3001/v1/api/login", {
      email: email,
      password: password
    });
    this.state.config = { headers: { "auth-token": userToken.data.token } };
    if (userToken.data.error) return false;
    else {
      this.state.loggedIn = true;
      this.state.user = userToken.data.name;
      this.state.userRole = userToken.data.role;
      return true;
    }
  };
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
  uploadPicture = async (connectType, options) => {
    const url = "http://localhost:3001/v1/api/image";
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
  ConnectWithDatabase = async (connectType, url, options) => {
    url = "http://localhost:3001/v1/api/" + url;
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
    //console.log("--- send options ---", connectType, url, options, responce);
    if (responce.data.error)
      console.log("=== BACKEND ERROR ===", responce.data.error);
    return responce.data;
  };
}
