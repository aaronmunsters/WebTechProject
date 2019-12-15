import axios from "axios";

export default class AxiosConnection {
  state = {
    config: {}
  };
  login = async (email, password) => {
    const userToken = await axios.post("http://localhost:3001/v1/api/login", {
      email: "admin@admin.be",
      password: "password"
    });

    this.state.config = { headers: { "auth-token": userToken.data.token } };
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
