import React, { Component } from "react";
import Navigation from "./components/navigation";
import Page from "./components/page";
import LoginModal from "./components/loginModal";
import AxiosConnection from "./components/connectWithDatabase";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setDestinationIndex = this.setDestinationIndex.bind(this);
  }
  state = {
    destinationIndex: 0,
    loggedIn: false,
    viewTotal: 0,
    tableData: {},
    axios: new AxiosConnection()
  };

  /* ------------------------------------------------------------------
  fetches the amount of page requests, this is called only once when 
  the admin logs in. This is used for display in the dashboard
  -------------------------------------------------------------------*/
  fetchViewTotal = async () => {
    const { axios } = this.state;
    const views = await axios.ConnectWithDatabase("get", "requestcounter");
    this.setState({ viewTotal: views.counter });
  };

  /* ------------------------------------------------------------------
  this is called only once when the admin is correctly loged in
  -------------------------------------------------------------------*/
  fetchAllTables() {
    const { destinations } = this.props;
    //we start at 1 because there is no data for index 0 (Dashboard)
    for (let i = 1; i < destinations.length; i++)
      this.handleRefreshTableData(i);
  }

  /* ------------------------------------------------------------------
  when a new "page" is opened this actually just means the destinationIndex
  is changed so the site knows what content has to be shown. When this
  happens we also refresh the table Data so it keeps up to date.
  -------------------------------------------------------------------*/
  setDestinationIndex = async index => {
    if (this.props.destinations[index].typeOfData !== "noData")
      await this.handleRefreshTableData(index);
    this.setState({ destinationIndex: index });
  };

  /* ------------------------------------------------------------------
  refreshes the content in a table by fetching it from the database,
  it knows what filters it has to use by getting the tableColumns
  of the given destination(content Type) and addind Id and description
  -------------------------------------------------------------------*/
  handleRefreshTableData = async index => {
    const { destinations } = this.props;
    const { axios, tableData } = this.state;
    if (destinations[index].typeOfData !== "noData") {
      let filters = [
        ...destinations[index].tableColumns.map(column => column.dataField),
        "id",
        "description"
      ];
      const newTableData = await axios.ConnectWithDatabase(
        "get",
        destinations[index].typeOfData,
        { col_filters: filters }
      );
      tableData[destinations[index].typeOfData] = newTableData;
      this.setState({ tableData: tableData });
    }
  };

  render() {
    const { axios, destinationIndex: index, tableData } = this.state;
    return (
      <React.Fragment>
        <LoginModal
          key={"loginModal"}
          onCorrectCredentials={() => {
            this.fetchViewTotal();
            this.fetchAllTables();
            this.setState({ loggedIn: true });
          }}
          axios={this.state.axios}
        />
        <Navigation
          {...this.props}
          axios={axios}
          destinationIndex={index}
          setDestinationIndex={this.setDestinationIndex}
        />
        <Page
          {...this.props}
          axios={this.state.axios}
          viewTotal={this.state.viewTotal}
          onRefreshTable={() => this.handleRefreshTableData(index)}
          tableData={tableData}
          currentPage={this.props.destinations[index]}
        />
      </React.Fragment>
    );
  }
}
