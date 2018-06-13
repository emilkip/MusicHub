import * as React from 'react';
import {INewMusic, IPlaylist} from "../../common/interfaces";
import {Playlists} from "../../components";
import history from '../../configs/history';
import 'styleAlias/common.scss';
import 'styleAlias/playlist.scss';
import {connect} from "react-redux";
import {fetchRecentPlaylists} from "../../thunkActions/playlistActions";


interface IProps {
    dispatch?: (action: any) => void
    fetchRecentPlaylists?: () => void
}

interface IState {
    playlists: IPlaylist[]
}

@(connect((state: any) => ({
    playlists: state.playlistReducer.playlists,
}), (dispatch: any) => ({
    fetchRecentPlaylists: () => dispatch(fetchRecentPlaylists())
})) as any)
export class PlaylistsScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            playlists: []
        };
    }

    componentDidMount() {
        this.props.fetchRecentPlaylists();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            playlists: nextProps.playlists || []
        };
    }

    render() {
        return (
            <div className="playlists">
                <div className="playlist-header">
                    <div>
                        <h3>Playlists</h3>
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
