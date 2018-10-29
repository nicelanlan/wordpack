import React from 'react';

class ToolsTable extends React.PureComponent {
  render() {
    return (
      <div>
        <button onClick={this.saveHandler}>Save</button>
      </div>
    );
  }
  saveHandler = () => {
    this.props.onSave();
  }
}

export default ToolsTable;
