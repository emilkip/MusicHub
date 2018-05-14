import Axios from 'axios';


export function fetchUser(): Promise<any> {
    return Axios.get(`/api/profile/get_user`);
}



export default {
    fetchUser
}
