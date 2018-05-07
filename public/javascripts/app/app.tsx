import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {LayoutScreen} from './screens';

import '../../../node_modules/toastr/toastr.scss'


class App extends React.Component {
    render() {
        return (
            <Router>
               <LayoutScreen />
            </Router>
        );
    }
}

export default App;
