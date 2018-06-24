import * as Loadable from 'react-loadable';
import * as React from 'react';
import Loading from '../components/Loading';


export const AlbumScreen = Loadable({
    loader: () => import(/* webpackChunkName: "AlbumScreen" */ '../screens/AlbumScreen/AlbumScreen'),
    loading: () => <Loading />,
} as any);

export const AuthorScreen = Loadable({
    loader: () => import(/* webpackChunkName: "AuthorScreen" */ '../screens/AuthorScreen/AuthorScreen'),
    loading: () => <Loading />,
} as any);

export const HomeScreen = Loadable({
    loader: () => import(/* webpackChunkName: "HomeScreen" */ '../screens/HomeScreen/HomeScreen'),
    loading: () => <Loading />,
} as any);

export const MusicScreen = Loadable({
    loader: () => import(/* webpackChunkName: "MusicScreen" */ '../screens/MusicScreen/MusicScreen'),
    loading: () => <Loading />,
} as any);

export const MusicCreateScreen = Loadable({
    loader: () => import(/* webpackChunkName: "MusicCreateScreen" */ '../screens/MusicCreateScreen/MusicCreateScreen'),
    loading: () => <Loading />,
} as any);

export const PlaylistsScreen = Loadable({
    loader: () => import(/* webpackChunkName: "PlaylistsScreen" */ '../screens/PlaylistsScreen/PlaylistsScreen'),
    loading: () => <Loading />,
} as any);

export const PlaylistDetailScreen = Loadable({
    loader: () => import(/* webpackChunkName: "PlaylistDetailScreen" */ '../screens/PlaylistDetailScreen/PlaylistDetailScreen'),
    loading: () => <Loading />,
} as any);

export const PlaylistCreateScreen = Loadable({
    loader: () => import(/* webpackChunkName: "PlaylistCreateScreen" */ '../screens/PlaylistCreateScreen/PlaylistCreateScreen'),
    loading: () => <Loading />,
} as any);

export const ProfileScreen = Loadable({
    loader: () => import(/* webpackChunkName: "ProfileScreen" */ '../screens/ProfileScreen/ProfileScreen'),
    loading: () => <Loading />,
} as any);

export const SearchResultScreen = Loadable({
    loader: () => import(/* webpackChunkName: "SearchResultScreen" */ '../screens/SearchResultScreen/SearchResultScreen'),
    loading: () => <Loading />,
} as any);

export const FavoriteMusicScreen = Loadable({
    loader: () => import(/* webpackChunkName: "FavoriteMusicScreen" */ '../screens/FavoriteMusicScreen/FavoriteMusicScreen'),
    loading: () => <div>Loading form...</div>,
} as any);
