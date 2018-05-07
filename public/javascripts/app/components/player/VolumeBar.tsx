import * as React from 'react';
import 'styleAlias/player.scss';

interface IState {
    volume: number
}

interface IProps {
    volume: number
    setVolume(selectedPos: number): void
}

export class VolumeBar extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            volume: 0
        };

        this.handleBarClick = this.handleBarClick.bind(this);
    }

    handleBarClick(event: any) {
        const offsetLeft: number = event.currentTarget.getBoundingClientRect().left;
        const selectedPos: number = Math.floor((event.pageX - offsetLeft) * 100 / event.currentTarget.offsetWidth);
        this.setState({
            volume: selectedPos
        });
        this.props.setVolume(selectedPos);
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            ...nextProps,
            volume: nextProps.volume
        };
    }

    render() {
        return (
            <div className="d-flex justify-content-start align-items-center volume-bar-cont">
                <div>
                    <span className="fa fa-volume-up"></span>
                </div>
                <div className="volume-bar">
                    <div className="custom-progress" onClick={this.handleBarClick}>
                        <div className="custom-progress-bar main"
                             style={{width: this.state.volume + '%'}}
                             data-aria-valuemin={"0"}
                             data-aria-valuemax={"100"}></div>
                    </div>
                </div>
            </div>
        );
    }
}
