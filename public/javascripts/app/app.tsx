import * as React from 'react';
import {connect} from "react-redux";
import {ToastContainer} from 'react-toastify';
import {GlobalPlayer, Routing} from './components';
import {UserService} from './services';
import {setUser} from "./actions/profileActions";


interface IProps {
    dispatch?: (action: any) => void
}


@(connect() as any)
class App extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);

        this.fetchUser = this.fetchUser.bind(this);
        this.fetchUser();
    }

    async fetchUser() {
        try {
            const user: any = await UserService.fetchUser();
            this.props.dispatch(setUser(user.data));
        } catch (err) {
            console.log(err);
        }
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
