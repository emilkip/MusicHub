import * as React from 'react';
import Axios from 'axios';
import history from "../configs/history";
import '../screens/LayoutScreen/style.scss';


export const Header = (props: any) => {

    const logout = () => Axios.get('/logout').then(() => { window.location.href = '/login' });

    return (
        <header className="main-header">
            <nav className="main-nav-bar">
                <div className="logo">
                    <div>
                        <a onClick={() => history.push('/')}><h1>MusicHub</h1></a>
                    </div>
                </div>
                <div className="auth-block">
                    <a onClick={() => history.push('/profile')} className="btn-main">Profile</a>
                    <a onClick={logout} className="btn-main">Logout</a>
                </div>
            </nav>
            <nav className="sub-nav">
                <ul>
                    <li><a onClick={() => history.push('/genres')}>Genres</a></li>
                    <li><a onClick={() => history.push('/playlists')}>Playlists</a></li>
                    <li><a onClick={() => history.push('/favorite')}>Favorite music</a></li>
                </ul>
            </nav>
        </header>
    );
};
