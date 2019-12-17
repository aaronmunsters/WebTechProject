import axios from "axios";

export default class AxiosConnection {
  state = {
    loggedIn: false,
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
    console.log(userToken.data);
    this.state.config = { headers: { "auth-token": userToken.data.token } };
    if (userToken.data.error) return false;
    else {
      this.state.loggedIn = true;
      return true;
    }
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
    //console.log("--- send options ---", url, options, responce);
    if (responce.data.error)
      console.log("=== BACKEND ERROR ===", responce.data.error);
    return responce;
  };
}
