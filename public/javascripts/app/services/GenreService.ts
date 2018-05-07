import Axios from 'axios';

export function getGenres() {
    return Axios.get('/api/genres');
}

export default {
    getGenres
}
