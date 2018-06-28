import * as React from 'react';
import {connect} from "react-redux";
import {ToastContainer} from 'react-toastify';
import {Routing} from './components/Routing';
import {fetchUser} from './thunkActions/profileActions';
import 'react-toastify/dist/ReactToastify.min.css';
import toast from "./common/utils/toast";
import Loading from "./components/Loading";


interface IProps {
    dispatch?: (action: any) => void
    fetchUser?: () => void
}

interface IState {
    playerComponent: any
}


@(connect(
    (state: any) => ({}),
    (dispatch: any) => ({
        fetchUser: () => dispatch(fetchUser()),
        loadPlayer: () => {

        }
    })
) as any)
class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            playerComponent: null
        };

        this.loadPlayer = this.loadPlayer.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser();
        this.loadPlayer();
    }

    loadPlayer() {
        import(/* webpackChunkName: "GlobalPlayer" */ './components/player/GlobalPlayer')
            .then((component) => {
                this.setState({
                    playerComponent: component.default
                });
            })
            .catch((err) => {
                toast.error('Cannot load player');
            })
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Routing/>
                <div className="global-player-container">
                    {
                        !this.state.playerComponent ?
                            <Loading /> :
                            <this.state.playerComponent />
                    }
                </div>
            </div>
        );
    }
}

export default App;
