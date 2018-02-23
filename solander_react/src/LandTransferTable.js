import React, { Component } from 'react'

//import App from "./App"

export default class LandTransferTable extends Component {


	render() {
		return (
            <div id="LandTransferTable">
              <h2>List of land available to be transferred</h2>
              <table>
                 <thead>
                  <tr>
                    <th>Property ID</th>
                    <th>Address</th>
                    <th>Market Price</th>
                    <th>Owned By</th>
                  </tr>
                 </thead>
                 <tbody>
                  <tr>
                    <td>1</td>
                    <td>13 Elm St.</td>
                    <td>40 M</td>
                    <td>Govt. Of Can.</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>1101 Bay St.</td>
                    <td>3 M</td>
                    <td>Govt. Of Can. </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2 Parliament St.</td>
                    <td>10 M</td>
                    <td>Govt. Of Can.</td>
                  </tr>
                </tbody>
              </table>
              <br/>
            </div>
		);
	}
}