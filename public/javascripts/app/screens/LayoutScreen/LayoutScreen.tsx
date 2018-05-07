import * as React from 'react';
import {Routing, Header, GlobalPlayer}from '../../components';
import './style.scss';


export class LayoutScreen extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="content">
                    <Routing/>
                </div>
                <GlobalPlayer/>
            </div>
        );
    }
}
