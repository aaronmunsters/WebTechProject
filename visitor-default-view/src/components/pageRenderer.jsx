import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import {
  getPageLocation,
  port,
  defaultPage,
  visitorport,
  apiLocation,
  getLayoutLocation
} from "../defaults.json";
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
  */

  state = {
    currentPage: false,
    layout: false,
    axiosConfig: null,
    feedbackmsg: "loading ...",
    feedbackdetails: "",
    feedbackColor: "black"
  };
  hostname = null;

  parsePage = async page => {
    const omzetter = object => {
      const mapF = key => {
        if (key !== "date") {
          object[key] = JSON.parse(object[key]);
        }
      };
      return mapF;
    };
    Object.keys(page).forEach(omzetter(page));
    document.title = page.title;

    let getLayoutURL = // eg.: http://localhost:3001/layout/"default"
      "http://" +
      this.hostname +
      port +
      apiLocation +
      getLayoutLocation +
      '"' +
      page.layout +
      '"';

    let knownLayout = (await axios.get(getLayoutURL)).data;
    if (knownLayout) {
      Object.keys(knownLayout).forEach(omzetter(knownLayout));
      this.setState({ currentPage: page, layout: knownLayout });
    } else {
      this.setState({
        feedbackmsg: "Could not find layout [" + page.layout + "]",
        feedbackdetails: "Tried to fetch " + getLayoutURL,
        feedbackColor: "red"
      });
    }
  };

  componentDidMount = async () => {
    // check if user is on known page:
    const { URL } = document;
    const currPage = URL.split("/").pop();
    const { hostname } = window.location;
    this.hostname = hostname;

    let getPageURL = // eg.: http://localhost:3001/api/layout/123456789
      "http://" +
      hostname +
      port +
      apiLocation +
      getPageLocation +
      (currPage ? currPage : defaultPage);

    let knownPage = (await axios.get(getPageURL)).data;

    // Render result
    if (knownPage) {
      this.parsePage(knownPage);
    } else {
      // redirect user to main page
      window.location.href = "http://" + hostname + visitorport;
    }
  };

  render() {
    const { currentPage, layout } = this.state;
    if (currentPage && layout) {
      const { navcontent, columnType, footcontent, brand } = layout;
      const { compsL, compsM, compsR } = currentPage;
      const style = {
        padding: "0px",
        backgroundColor: layout.backgroundColor,
        minHeight: "100vh"
      };
      return (
        <Container fluid={true} style={style}>
          {layout.navBar ? (
            <NavigationRenderer brand={brand} content={navcontent} />
          ) : null}
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
    return (
      <React.Fragment>
        <h1 style={{ color: this.state.feedbackColor }}>
          {this.state.feedbackmsg}
        </h1>
        <h3 style={{ color: this.state.feedbackColor }}>
          {this.state.feedbackdetails}
        </h3>
      </React.Fragment>
    );
  }
}

export default PageRenderer;
