import * as React from 'react';
import {connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import {LayoutScreen} from './screens';
import {UserService} from './services';
import {setUser} from "./actions/profileActions";

import '../../../node_modules/toastr/toastr.scss'

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
            <BrowserRouter>
                <LayoutScreen/>
            </BrowserRouter>
        );
    }
}

export default App;
