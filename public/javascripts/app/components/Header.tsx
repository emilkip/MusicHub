import * as React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


export const Header = (props: any) => {

    const logout = () => Axios.get('/logout').then(() => { window.location.href = '/login' });

    return (
        <header className="main-header">
            <nav className="main-nav-bar">
                <div className="logo">
                    <div>
                        <Link to="/"><h1>MusicHub</h1></Link>
                    </div>
                </div>
                <div className="auth-block">
                    <Link to="/profile" className="btn-main">Profile</Link>
                    <a onClick={logout} className="btn-main">Logout</a>
                </div>
            </nav>
            <nav className="sub-nav">
                <ul>
                    <li><Link to="/genres">Genres</Link></li>
                    <li><Link to="/playlists">Playlists</Link></li>
                    <li><Link to="/favorite">Favorite music</Link></li>
                </ul>
            </nav>
        </header>
    );
};
