import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import {
  // defaultStartPagelayoutLocation,
  getPageLocation,
  port,
  defaultPage
} from "../defaults.json";
// import axios from "axios";
import NavigationRenderer from "./navigationRenderer";
import ColumnsRenderer from "./columnsRenderer";
import FooterRenderer from "./footerRenderer";

import examples from "./exampleObjects.js";
const { examplePage, exampleLayout } = examples;

class PageRenderer extends Component {
  /*
  The pages will be loaded in the following order:
  - Page Layout will be fetched, this will describe general layout (columns, color, ...)
  - Each column will fetch the components from top to bottom as they get loaded (improves performance)
  - Each component will fetch its own data (pictures, text, ...) and this will be loaded

  // Example object of a page object can be found in ./exampleObjects.js

  One rule this class respects: inner data types are not handled by this class but by other classes
  e.g.: The Navigation bar will transform the data from layout itself, this class will not.
  */

  state = { currentPage: false, layout: false, axiosConfig: null };

  parsePage = page => {
    document.title = page.title;
    let knownLayout = exampleLayout; // await axios.get(getPageURL);
    if (knownLayout) {
      this.setState({ currentPage: page, layout: knownLayout });
    }
  };

  componentDidMount = async () => {
    // Initialisation with user
    let userToken = await axios.post("http://localhost:3001/login", {
      email: "admin@admin.be",
      password: "password"
    });

    this.setState({
      axiosConfig: { headers: { "auth-token": userToken.data } }
    });

    // check if user is on known page:
    const { URL } = document;
    const currPage = URL.split("/").pop();
    const { hostname } = window.location;

    let getPageURL = // eg.: http://localhost:3001/page/default
      "http://" +
      hostname +
      port +
      getPageLocation +
      (currPage ? currPage : defaultPage);

    let knownPage = (await axios.get(getPageURL, this.state.axiosConfig)).data;

    // Render result
    if (knownPage) {
      this.parsePage(knownPage);
    } else {
      // redirect user to main page
      window.location.href = "http://" + hostname + port;
    }
  };

  render() {
    const { currentPage, layout } = this.state;
    const { navcontent, columnType, footcontent } = layout;
    const { compsL, compsM, compsR } = examplePage;
    if (currentPage && layout) {
      return (
        <Container fluid={true} style={{ padding: "0px" }}>
          {layout.navbar ? <NavigationRenderer content={navcontent} /> : null}
          <ColumnsRenderer
            columnType={columnType}
            compsL={compsL}
            compsM={compsM}
            compsR={compsR}
          ></ColumnsRenderer>
          {layout.footer ? (
            <FooterRenderer content={footcontent}></FooterRenderer>
          ) : null}
        </Container>
      );
    }
    // return loading sign
    return <h1>Loading ....</h1>;
  }
}

export default PageRenderer;
