import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import {Routing, Header, GlobalPlayer}from '../../components';
import './style.scss';
import 'react-toastify/dist/ReactToastify.min.css';


export class LayoutScreen extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="content">
                    <ToastContainer/>
                    <Routing/>
                </div>
                <GlobalPlayer/>
            </div>
        );
    }
}
