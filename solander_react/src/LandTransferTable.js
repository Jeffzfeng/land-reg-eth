import React, { Component } from 'react'

//import App from "./App"

const land_header_list = ["Property ID", "Address", "Market Price", "Owned By"];

function TableElement(props) {

  if(props.content === "header"){
    const header = props.dataStruct.map((item) => 
      <th key={item}>{item}</th>
    );

    return (
      <thead>
        <tr>
          {header}
        </tr>
      </thead>
    );
  }

  else if(props.content === "body" && props.type === "landTransfer"){
    const body_table = Object.keys(props.dataStruct).map((PID_key) => {
      return ( 
      <tr key={PID_key}>
        <td>{props.dataStruct[PID_key].PID}</td>
        <td>{props.dataStruct[PID_key].address}</td>
        <td>{props.dataStruct[PID_key].market_price}</td>
        <td>{props.dataStruct[PID_key].owned_by}</td>
      </tr>
        // {
        //   Object.keys(land_body[PID_key]).map(column => {
        //     return (
        //     <td key={land_body[PID_key][column]}>
        //       {land_body[PID_key][column]}
        //     </td>
        //     );
        //   })
        //}  
      );
    })
    return (
      <tbody>
        {body_table}
      </tbody>
    );
  }  
}
export default class LandTransferTable extends Component {

	render() {
		return (
      <div id="LandTransferTable">
        <h2>List of land available to be transferred</h2>
        <table>
          <TableElement content="header" dataStruct={land_header_list}/>
          <TableElement content="body" dataStruct={this.props.land_transfer_hash} type="landTransfer" />  
        </table>
        <br/>
      </div>
		);
	}
}
