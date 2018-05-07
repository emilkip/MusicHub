import Axios from 'axios';


export function getAlbumsForAuthor(authorId: string): Promise<any> {
    return Axios.get(`/api/author/${authorId}/albums`);
}

export function getAuthors(): Promise<any> {
    return Axios.get('/api/author');
}

export function createAuthor(author: Object): Promise<any> {
    return Axios.post('/api/author', { author });
}

export default {
    getAuthors,
    createAuthor,
    getAlbumsForAuthor
}
