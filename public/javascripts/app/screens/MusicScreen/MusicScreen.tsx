import * as React from 'react';
import toast from '../../common/utils/toast';
import {SingleMusicPlayer} from '../../components/SingleMusicPlayer';
import {IMusic} from "../../common/interfaces";
import {IReduxAction} from "../../common/interfaces/CommonInterfaces";
import {connect} from "react-redux";
import {requestMusicById, resetCurrentMusic} from "../../actions/musicActions";


interface IProps {
    dispatch?: (action: IReduxAction) => void
}

interface IState {
    music: IMusic
    musicId: string
}

@(connect((state: any) => ({
    music: state.musicReducer.currentMusic
})) as any)
export class MusicScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            music: {} as any,
            musicId: props.match.params.id
        };

        this.props.dispatch(requestMusicById(this.state.musicId));
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            music: nextProps.music
        };
    }

    componentDidCatch(error: Error) {
        toast.error(error.toString());
    }

    componentWillUnmount() {
        this.props.dispatch(resetCurrentMusic());
    }

    render() {
        return (
            <div>
                <SingleMusicPlayer music={this.state.music}/>
            </div>
        );
    }
}
