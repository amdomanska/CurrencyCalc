import React from 'react';

export class CurrencyDropdown extends React.Component {
  render(){
    let currA = "ABC";
    return (
      <div>
        <h2> currencyDropdown </h2>
        <select name="currA" id="currA">
          <option value= "{ currA }" selected="selected">{ currA }</option>
        </select>
      </div>
    );
  }
}
