import React from 'react';
import { HotTable } from '@handsontable-pro/react';
// import Handsontable from 'handsontable-pro';

class DataTable extends React.PureComponent {
  render() {
    return (
      <div id="hot-app">
        <HotTable data={this.props.data} colHeaders={true} rowHeaders={true} width="600" height="300" stretchH="all" contextMenu="true" />
      </div>
    );
  }
}

export default DataTable;
