import * as React from 'react';
import {IPlaylist} from "../../common/interfaces";
import toast from "../../common/utils/toast";
import {PlaylistService} from "../../services";
import {Playlists} from "../../components";
import history from '../../configs/history';
import 'styleAlias/common.scss';
import 'styleAlias/playlist.scss';


interface IProps {
    dispatch?: (action: any) => void
}

interface IState {
    playlists: IPlaylist[]
}

export class PlaylistsScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            playlists: []
        };

        this.fetchPlaylists = this.fetchPlaylists.bind(this);

        this.fetchPlaylists();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            playlists: nextProps.playlists || []
        };
    }

    async fetchPlaylists() {
        try {
            const playlists: any = await PlaylistService.getPlaylists();

            this.setState({
                playlists: playlists.data || []
            });
        } catch (err) {
            toast.error(err.response.data.message || err.response.data);
        }
    }

    render() {
        return (
            <div className="playlists">
                <div className="playlist-header">
                    <div>
                        <h3>Play lists</h3>
                        <p>Recently created playlists</p>
                    </div>
                    <div className="btn-black" onClick={() => history.push('/create_playlist')}>
                        <i className="fa fa-plus" /><span>Create playlist</span>
                    </div>
                </div>
                <Playlists playlists={this.state.playlists}/>
            </div>
        );
    }
}
