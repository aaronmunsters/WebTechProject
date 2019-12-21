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

  fetchViewTotal = async () => {
    const { axios } = this.state;
    const views = await axios.ConnectWithDatabase("get", "requestcounter");
    this.setState({ viewTotal: views.counter });
  };

  fetchAllTables() {
    const { destinations } = this.props;
    for (let i = 1; i < destinations.length; i++)
      this.handleRefreshTableData(i);
  }

  setDestinationIndex = async index => {
    if (this.props.destinations[index].typeOfData !== "noData")
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
    tableData[destinations[index].typeOfData] = newTableData;
    this.setState({ tableData: tableData });
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
