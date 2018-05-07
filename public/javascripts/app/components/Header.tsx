import * as React from 'react';
import history from "../configs/history";
import '../screens/LayoutScreen/style.scss';


export class Header extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="logo">
                    <div>
                        <a onClick={() => history.push('/')}><h1>MusicHub</h1></a>
                    </div>
                </div>
                <div className="auth-block">
                    <a onClick={() => history.push('/profile')} className="btn-main">Profile</a>
                    <a href="/logout" className="btn-main">Logout</a>
                </div>
            </div>
        );
    }
}
