import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './app'
import appStore from './configs/store'


ReactDOM.render(
    <Provider store={appStore}>
        <App />
    </Provider>,
    document.getElementById('app')
);