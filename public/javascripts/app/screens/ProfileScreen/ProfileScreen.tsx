import * as React from 'react';
import {connect} from "react-redux";
import {getUser} from "../../actions/profileActions";
import {IUser} from "../../common/interfaces";


interface IProps {
    dispatch?: (action: any) => void
    user: IUser
}

interface IState {
    user: IUser
}


@(connect((state: any) => ({
    user: state.profileReducer.user
})) as any)
export default class ProfileScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            user: {} as any
        };

        props.dispatch(getUser());
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            user: nextProps.user || {}
        }
    }

    render() {
        return (
            <div>
                <h1>Profile {this.state.user.username}</h1>
            </div>
        );
    }
}
