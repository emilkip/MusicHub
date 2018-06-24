import * as React from 'react';
import {connect} from 'react-redux';
import toast from '../../common/utils/toast';
import {SingleMusicPlayer} from '../../components/SingleMusicPlayer';
import {IMusic} from "../../common/interfaces";
import {IReduxAction} from "../../common/interfaces/CommonInterfaces";
import {resetCurrentMusic} from "../../actions/musicActions";
import {fetchMusic} from "../../thunkActions/musicActions";


interface IProps {
    dispatch?: (action: IReduxAction) => void
    fetchMusic?: (id: string) => void
    resetCurrentMusic?: () => void
}

interface IState {
    music: IMusic
    musicId: string
}

@(connect((state: any) => ({
    music: state.musicReducer.currentMusic
}), (dispatch: any) => ({
    resetCurrentMusic: () => dispatch(resetCurrentMusic()),
    fetchMusic: (id: string) => dispatch(fetchMusic(id))
})) as any)
export default class MusicScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            music: {} as any,
            musicId: props.match.params.id
        };
    }

    componentDidMount() {
        this.props.fetchMusic(this.state.musicId);
    }

    componentDidCatch(error: Error) {
        toast.error(error.toString());
    }

    componentWillUnmount() {
        this.props.resetCurrentMusic();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            music: nextProps.music
        };
    }

    render() {
        return (
            <div>
                <SingleMusicPlayer music={this.state.music}/>
            </div>
        );
    }
}
