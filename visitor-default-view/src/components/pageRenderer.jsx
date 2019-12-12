import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {
  defaultPage,
  visitorport,
  hostPrefix,
  hostname,
  pageParseProps
} from "../defaults.json";
import NavigationRenderer from "./navigationRenderer";
import ColumnsRenderer from "./columnsRenderer";
import FooterRenderer from "./footerRenderer";
import ErrorLog from "./errorLog.jsx";
import { parseProps, getApiObject } from "./generalFunctions";

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
    statement: "loading ...",
    details: "",
    severity: 0
  };

  parsePage = async page => {
    const { layout } = page;
    parseProps(page, pageParseProps);
    document.title = page.title;

    const knownLayout = await getApiObject("layout", layout);

    if (knownLayout) {
      page.layout = knownLayout;
      this.setState({ currentPage: page, layout: knownLayout });
    } else {
      this.setState({
        statement: "Could not find layout " + layout,
        details: "Tried to fetch " + layout,
        severity: 3
      });
    }
  };

  componentDidMount = async () => {
    // check if user is on known page:
    const currPage = document.URL.split("/").pop();
    const currPageId = currPage ? currPage : defaultPage;
    const knownPage = await getApiObject("page", currPageId);
    if (knownPage) this.parsePage(knownPage);
    else {
      // Warn user they are on an unknown page
      this.setState({
        statement: "Could not find page " + currPageId,
        details: "You will be automatically redirected",
        severity: 3
      });
      // redirect user to main page
      setTimeout(() => {
        window.location.href = hostPrefix + hostname + visitorport;
      }, 2000);
    }
  };

  siteStyle() {
    const { layout } = this.state;
    return {
      padding: "0px",
      backgroundColor: layout.backgroundColor,
      minHeight: "100vh"
    };
  }

  render() {
    const { currentPage, layout } = this.state;
    if (currentPage && layout) {
      const { navBar, footer } = layout;
      return (
        <Container fluid={true} style={this.siteStyle()}>
          {navBar ? <NavigationRenderer {...layout} /> : null}
          <ColumnsRenderer {...this.state} {...currentPage} />
          {footer ? <FooterRenderer {...layout} /> : null}
        </Container>
      );
    }
    return <ErrorLog {...this.state} />;
  }
}

export default PageRenderer;
