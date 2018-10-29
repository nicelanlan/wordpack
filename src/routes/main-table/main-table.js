import React from 'react';

import { DataTable } from '../../components/data-table';
import { ToolsTable } from '../../components/tools-table';
import { convertTableDataToJson } from '../../components/utils/convert-data';

class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
        ['2016', 10, 11, 12, 13],
        ['2017', 20, 11, 14, 13],
        ['2018', 30, 15, 12, 13]
      ]
    };
  }

  render() {
    return (
      <div id="hot-app">
        <ToolsTable onSave={this.dataSave}/>
        <DataTable data={this.state.data} />
      </div>
    );
  }

  dataSave = () => {
    const jsonData = convertTableDataToJson(this.state.data);
    console.log(jsonData);
    // call api to write file
  };
}

export default MainTable;
