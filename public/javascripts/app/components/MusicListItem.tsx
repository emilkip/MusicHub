import * as React from 'react';
import {IMusic} from "../common/interfaces";
import 'styleAlias/music-list.scss';


interface IMusicListItemProps {
    onPlay?(music: IMusic): void
    music: IMusic
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

interface IMusicListItemState {
    music: IMusic
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}


export class MusicListItem extends React.Component<IMusicListItemProps, IMusicListItemState> {
    constructor(props: IMusicListItemProps) {
        super(props);
        this.state = {
            music: props.music,
            playedMusic: {
                playing: false,
                music: {} as any
            }
        };
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            playedMusic: nextProps.playedMusic || {}
        }
    }

    render() {
        return (
            <div className="music-list-item" onClick={() => this.props.onPlay(this.state.music)}>
                {
                    (this.state.music._id === this.state.playedMusic.music._id && this.state.playedMusic.playing) ?
                        <div className="play"><img src="/images/equalizer.svg" /></div> :
                        <div className="play"><span className="fa fa-play" /></div>
                }
                <div className="title">{this.state.music.title}</div>
            </div>
        );
    }
}
