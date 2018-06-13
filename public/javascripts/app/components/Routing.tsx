import * as React from 'react';
import { Router, Route } from 'react-router';
import {
    AuthorScreen,
    AlbumScreen,
    SearchResultScreen,
    PlaylistsScreen,
    PlaylistDetailScreen,
    PlaylistCreateScreen,
    MusicEditScreen,
    MusicCreateScreen,
    ProfileScreen,
    MusicScreen,
    HomeScreen,
    FavoriteMusicScreen
} from '../screens';

import history from '../configs/history';


export class Routing extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/" exact component={HomeScreen}/>
                    <Route path="/search_result" exact component={SearchResultScreen}/>
                    <Route path="/profile" exact component={ProfileScreen} />
                    {/*<Route path="/genre/:title" component={} />*/}
                    <Route path="/create_music" component={MusicCreateScreen} />
                    <Route path="/music/:id" exact component={MusicScreen} />
                    <Route path="/music/:id/edit" component={MusicEditScreen} />
                    <Route path="/album/:id" component={AlbumScreen} />
                    <Route path="/author/:id" component={AuthorScreen} />
                    <Route path="/playlists" exact component={PlaylistsScreen} />
                    <Route path="/favorite" exact component={FavoriteMusicScreen} />
                    <Route path="/playlist/:id" exact component={PlaylistDetailScreen} />
                    <Route path="/create_playlist" component={PlaylistCreateScreen} />
                    {/*<Route path="/playlist/:id/edit" component={PlaylistScreen} />*/}
                    {/*<Route path="/dashboard" component={App} />*/}
                    {/*<Route path="/dashboard/genre" component={App} />*/}
                    {/*<Route path="/dashboard/tracks" component={App} />*/}
                    {/*<Route path="/dashboard/authors" component={App} />*/}
                </div>
            </Router>
        );
    }
}
