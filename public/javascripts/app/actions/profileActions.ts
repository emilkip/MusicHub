import { IReduxAction } from "../common/interfaces/CommonInterfaces";


export function setUser(user: any): IReduxAction {
    return {
        type: 'SET_USER',
        payload: {
            user
        }
    }
}


export function getUser(): IReduxAction {
    return {
        type: 'GET_USER',
        payload: {}
    }
}


export default {
    setUser,
    getUser
}
