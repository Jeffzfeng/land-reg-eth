import React, { Component } from 'react'

//import App from "./App"

  const land_header_list = ["Property ID", "Address", "Market Price", "Owned By"];
  const land_body = { 
    "1" : { 
      "PID" : "1",
      "address" : "elm st",
      "market_price" : "40 M",
      "owned_by" : "N/A"
    }, 
        "2" : { 
      "PID" : "2",
      "address" : "fern st",
      "market_price" : "40 M",
      "owned_by" : "N/A"
    },
        "3" : { 
      "PID" : "3",
      "address" : "fern st",
      "market_price" : "40 M",
      "owned_by" : "N/A"
    },
       "4" : { 
      "PID" : "4",
      "address" : "fern st",
      "market_price" : "40 M",
      "owned_by" : "N/A"
    },
       "5" : { 
      "PID" : "5",
      "address" : "fern st",
      "market_price" : "40 M",
      "owned_by" : "N/A"
    }
  }

function LandElement(props) {

  if(props.type === "header"){
    const land_header = land_header_list.map((item) => 
      <th key={item}>{item}</th>
    );

    return (
      <thead>
        <tr>
          {land_header}
        </tr>
      </thead>
    );
  }

  else if(props.type === "body"){
    const land_body_row = Object.keys(land_body).map((PID_key) => {
      return ( 
      <tr key={PID_key}>
        {
          Object.keys(land_body[PID_key]).map(column => {
            return (
            <td key={land_body[PID_key][column]}>
              {land_body[PID_key][column]}
            </td>
            );
          })
        }  
      </tr>
      );
    })
    return (
      <tbody>
        {land_body_row}
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
                <LandElement type="header" />
                <LandElement type="body" />  
              </table>
              <br/>
            </div>
		);
	}
}
