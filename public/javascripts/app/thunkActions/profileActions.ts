import {AxiosResponse} from "axios";
import toast from "../common/utils/toast";
import {setUser} from "../actions/profileActions";
import UserService from "../services/UserService";


export function fetchUser() {
    return async (dispatch: any) => {
        try {
            const user: AxiosResponse = await UserService.fetchUser();
            dispatch(setUser(user.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}
