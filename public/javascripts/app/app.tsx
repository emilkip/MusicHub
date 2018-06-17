import * as React from 'react';
import {connect} from "react-redux";
import {ToastContainer} from 'react-toastify';
import {GlobalPlayer, Routing} from './components';
import {fetchUser} from './thunkActions/profileActions';
import 'react-toastify/dist/ReactToastify.min.css';


interface IProps {
    dispatch?: (action: any) => void
    fetchUser?: () => void
}


@(connect(
    (state: any) => ({}),
    (dispatch: any) => ({
        fetchUser: () => dispatch(fetchUser())
    })
) as any)
class App extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Routing/>
                <GlobalPlayer/>
            </div>
        );
    }
}

export default App;
