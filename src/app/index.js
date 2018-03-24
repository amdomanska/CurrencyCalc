import React from 'react';
import { render } from 'react-dom';

import { CurrencyDropdown } from './components/CurrencyDropdown'

class App extends React.Component {

    render() {
        return (
            <div>
              <div>
                <h1> hello world! </h1>
              </div>
              <div>
                <CurrencyDropdown/>
              </div>
            </div>
        );
    }
}

render(<App />, window.document.getElementById("app"));
