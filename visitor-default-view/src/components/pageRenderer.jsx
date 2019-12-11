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
import ErrorLog from "./errorLog.jsx";
import parseProps from "./generalFunctions";

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
    const propsToParse = ["compsL", "compsM", "compsR"];
    parseProps(page, propsToParse);
    document.title = page.title;

    let getLayoutURL = // eg.: http://localhost:3001/layout/"default"
      "http://" +
      this.hostname +
      port +
      apiLocation +
      getLayoutLocation +
      page.layout;

    let knownLayout = (await axios.get(getLayoutURL)).data;
    if (knownLayout) {
      this.setState({ currentPage: page, layout: knownLayout });
    } else {
      this.setState({
        feedbackmsg: "Could not find layout [" + page.layout + "]",
        feedbackdetails: "Tried to fetch " + getLayoutURL,
        severity: 3
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
            layout={layout}
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
      <ErrorLog
        main={this.state.feedbackmsg}
        det={this.state.feedbackdetails}
        severity={this.state.severity}
      />
    );
  }
}

export default PageRenderer;
