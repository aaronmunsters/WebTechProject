import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {
  defaultPage,
  visitorport,
  hostPrefix,
  hostname,
  pageParseProps,
  liveUpdate,
  updateInterval
} from "../defaults.json";
import NavigationRenderer from "./navigationRenderer";
import ColumnsRenderer from "./columnsRenderer";
import FooterRenderer from "./footerRenderer";
import ErrorLog from "./errorLog.jsx";
import { parseProps, getApiObject } from "./generalFunctions";

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

  startMainApp = async () => {
    let currPage, pageId;
    // check if user is on known page:
    const currPath = new URL(document.URL).pathname;
    // check if URL is known
    currPage = await getApiObject("path", currPath);

    if (!currPage) {
      // if URL was invalid, maybe current URL refers to known page-id
      pageId = currPath.split("/").pop(); // returns "c" from "foo.com/a/b/c"
      if (pageId) currPage = await getApiObject("page", pageId);
    }

    if (!currPage) {
      // User is on homepage but cant retrieve URL, try home page
      this.setState(noFoundPage(pageId));
      // Try first with default page
      currPage = await getApiObject("page", defaultPage);
      // if no default-page was found, navigate to website home
      if (!currPage) currPage = await getApiObject("path", "/");
      if (!currPage) {
        // No response from server
        this.setState(noHomePage);
        setTimeout(this.startMainApp, 3000);
      }
    }

    if (currPage && currPage.id) {
      this.parsePage(currPage);
    }
    return;
  };

  awaitUpdate(callback) {
    return async () => {
      if (this.prevUpdateDone) {
        this.prevUpdateDone = false;
        await callback();
        this.prevUpdateDone = true;
      }
    };
  }

  componentDidMount = async () => {
    await this.startMainApp();
    this.prevUpdateDone = true;
    if (liveUpdate)
      this.interval = setInterval(
        this.awaitUpdate(this.startMainApp),
        updateInterval
      );
  };

  componentWillUnmount() {
    if (liveUpdate) clearInterval(this.interval);
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
