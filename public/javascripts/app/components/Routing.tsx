import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import {
    AuthorScreen,
    AlbumScreen,
    SearchResultScreen,
    PlaylistScreen,
    PlaylistCreateScreen,
    MusicEditScreen,
    MusicCreateScreen,
    ProfileScreen,
    MusicScreen,
    HomeScreen
} from '../screens';

import history from '../configs/history';


export class Routing extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div className="layout-container">
                    <Route path="/" exact component={HomeScreen}/>
                    <Route path="/search_result" exact component={SearchResultScreen}/>
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/profile/:username" component={ProfileScreen} />
                    {/*<Route path="/genre/:title" component={} />*/}
                    <Route path="/music/:id/edit" component={MusicEditScreen} />
                    <Route path="/music/:id" component={MusicScreen} />
                    <Route path="/album/:id" component={AlbumScreen} />
                    <Route path="/author/:id" component={AuthorScreen} />
                    <Route path="/create_music" component={MusicCreateScreen} />
                    <Route path="/create_playlist" component={PlaylistCreateScreen} />
                    <Route path="/playlist/:id/edit" component={PlaylistScreen} />
                    {/*<Route path="/dashboard" component={App} />*/}
                    {/*<Route path="/dashboard/genre" component={App} />*/}
                    {/*<Route path="/dashboard/tracks" component={App} />*/}
                    {/*<Route path="/dashboard/authors" component={App} />*/}
                </div>
            </Router>
        );
    }
}
