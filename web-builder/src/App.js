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
    tableData: {},
    axios: new AxiosConnection()
  };

  fetchAllTables() {
    const { destinations } = this.props;
    for (let i = 1; i < destinations.length; i++)
      this.handleRefreshTableData(i);
    console.log(this.state.tableData, "tabledata");
  }

  setDestinationIndex = async index => {
    await this.handleRefreshTableData(index);
    this.setState({ destinationIndex: index });
  };

  handleRefreshTableData = async index => {
    const { destinations } = this.props;
    const { axios, tableData } = this.state;
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
    tableData[destinations[index].typeOfData] = newTableData.data;
    this.setState({ tableData: tableData });
  };

  render() {
    return (
      <React.Fragment>
        <LoginModal
          key={"loginModal"}
          onCorrectCredentials={() => {
            this.fetchAllTables();
            this.setState({ loggedIn: true });
          }}
          axios={this.state.axios}
        />
        <Navigation
          {...this.props}
          axios={this.state.axios}
          destinationIndex={this.state.destinationIndex}
          setDestinationIndex={this.setDestinationIndex}
        />
        <Page
          {...this.props}
          axios={this.state.axios}
          onRefreshTable={() =>
            this.handleRefreshTableData(this.state.destinationIndex)
          }
          tableData={this.state.tableData}
          currentPage={this.props.destinations[this.state.destinationIndex]}
        />
      </React.Fragment>
    );
  }
}
