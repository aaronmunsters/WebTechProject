import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { pageParseProps, liveUpdate, layoutParseProps } from "../defaults.json";
import NavigationRenderer from "./navigationRenderer";
import ColumnsRenderer from "./columnsRenderer";
import FooterRenderer from "./footerRenderer";
import ErrorLog from "./errorLog.jsx";
import {
  parseProps,
  getApiObject,
  requestUpdate,
  stopRequestUpdate
} from "./generalFunctions";

import setLayoutIcon from "./editIcon";

const noHomePage = {
  statement: "Could not find homepage, the server must be down",
  details: "Please consider contacting the site admin to restart the server.",
  severity: 3
};

const noFoundPage = id => ({
  statement: "Could not find page " + id,
  details: "You will be automatically redirected to our homepage",
  severity: 3
});

const noLayoutFound = id => ({
  statement: "Could not find layout " + id,
  details: "Tried to fetch " + id,
  severity: 3
});

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

    let fetchedLayout = await getApiObject("layout", layout);

    if (fetchedLayout && fetchedLayout.id) {
      parseProps(fetchedLayout, layoutParseProps);
      page.layout = fetchedLayout;
      if (fetchedLayout.customIcon) setLayoutIcon(fetchedLayout.iconId);
      this.setState({ currentPage: page, layout: fetchedLayout });
    } else {
      this.setState(noLayoutFound(layout));
    }
  };

  startMainApp = async () => {
    let currPage, pageId;
    // check if user is on known page:
    const currPath = new URL(document.URL).pathname;
    // check if URL is known
    currPage = await getApiObject("path", currPath);

    if (!currPage || !currPage.id) {
      // if URL was invalid, maybe current URL refers to known page-id
      pageId = currPath.split("/").pop(); // returns "c" from "foo.com/a/b/c"
      if (pageId) currPage = await getApiObject("page", pageId);
    }

    if (!currPage || !currPage.id) {
      if (currPath === "/") {
        // No response from server
        this.setState(noHomePage);
        setTimeout(this.startMainApp, 3000);
        return;
      }
      // User is on homepage but cant retrieve URL, try home page
      this.setState(noFoundPage(pageId));
      if (!currPage) window.location.href = new URL(document.URL).origin;
    }

    if (currPage && currPage.id) {
      this.parsePage(currPage);
    }
    return;
  };

  componentDidMount = async () => {
    await this.startMainApp();
    if (liveUpdate) requestUpdate(this, this.startMainApp);
  };

  componentWillUnmount() {
    if (liveUpdate) stopRequestUpdate(this);
  }

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
      const { navbar, footer } = layout;
      return (
        <Container fluid={true} style={this.siteStyle()}>
          {navbar ? <NavigationRenderer {...layout} /> : null}
          <ColumnsRenderer {...this.state} {...currentPage} />
          {footer ? <FooterRenderer {...layout} /> : null}
        </Container>
      );
    }
    return <ErrorLog {...this.state} />;
  }
}

export default PageRenderer;
