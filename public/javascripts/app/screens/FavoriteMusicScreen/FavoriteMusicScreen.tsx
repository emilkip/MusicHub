import * as React from 'react';
import {IMusic} from "../../common/interfaces";
import toast from "../../common/utils/toast";
import {PlaylistService} from "../../services";
import {Playlists} from "../../components/Playlists";
import history from '../../configs/history';
import 'styleAlias/common.scss';
import 'styleAlias/playlist.scss';
import {connect} from "react-redux";


interface IProps {
    dispatch?: (action: any) => void
}

interface IState {
    musicList: IMusic[]
}

@(connect((state: any) => ({
    musicList: state.musicReducer.musicList
})) as any)
export default class FavoriteMusicScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            musicList: []
        };

        this.props.dispatch({ type: 'REQUEST_FAVORITE_MUSIC' });
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            musicList: nextProps.playlists || []
        };
    }

    render() {
        return (
            <div className="playlists">
                <div className="playlist-header">
                    <div>
                        <h3>Favorite Music</h3>
                        <p>Your favorite tracks</p>
                    </div>
                </div>
            </div>
        );
    }
}
