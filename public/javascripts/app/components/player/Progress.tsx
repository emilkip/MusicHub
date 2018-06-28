import * as React from 'react';
import 'styleAlias/player.scss';


const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

interface IState {
    progress: number
    timer: number
    position: number
    duration: number
    loaded: number
    status: string
    elapsedTime: string
    totalTime: string
}

interface IProps {
    status: string
    duration: number
    position: number
    loaded: number
    setPosition(selectedPos: number): void
}


export class Progress extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            progress: 0,
            timer: 0,
            position: 0,
            loaded: 0,
            duration: 0,
            status: 'STOPPED',
            elapsedTime: '00:00',
            totalTime: '00:00'
        };

        this.setTimer = this.setTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
        this.handleProgressBarClick = this.handleProgressBarClick.bind(this);
    }

    handleProgressBarClick(event: any) {
        const offsetLeft: number = event.currentTarget.getBoundingClientRect().left;
        const selectedPos: number = Math.floor((event.pageX - offsetLeft) * 100 / event.currentTarget.offsetWidth);
        this.props.setPosition(selectedPos);
    }

    setTimer() {
        const timer: any = setInterval(() => {
            if (this.state.status === 'PLAYING') {
                this.setState({
                    elapsedTime: formatTime(this.state.position),
                    progress: (this.state.position / this.state.duration) * 100
                });
            }
            if (this.state.status === 'STOPPED') {
                this.setState({
                    elapsedTime: '00:00',
                    progress: 0
                });
            }
        }, 1000);

        this.setState({
            timer
        });
    }

    clearTimer() {
        clearInterval(this.state.timer);

        this.setState({
            timer: null
        });
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.status === 'PLAYING' && prevState.status !== 'PLAYING') {
            this.setTimer();
        }
        if ((this.state.status === 'PAUSED' || this.state.status === 'STOPPED') && prevState.status === 'PLAYING') {
            this.clearTimer();
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !(nextProps.duration !== this.state.duration && nextProps.position !== this.state.position);
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            ...nextProps,
            totalTime: formatTime(nextProps.duration)
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <div>
                <div>
                    <span>{this.state.elapsedTime}/{this.state.totalTime}</span>
                </div>
                <div className="custom-progress" onClick={this.handleProgressBarClick}>
                    <div className="custom-progress-bar"
                         style={{width: this.state.progress + '%'}}></div>
                    <div className="custom-progress-loaded"
                         style={{width: this.state.loaded + '%'}}></div>
                </div>
            </div>
        );
    }
}
