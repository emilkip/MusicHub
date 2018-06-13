import {AxiosResponse} from "axios";
import AuthorService from "../services/AuthorService";
import toast from "../common/utils/toast";
import {pushAuthors, setCurrentAuthor} from "../actions/authorActions";
import {pushAlbums} from "../actions/albumActions";


export function fetchAuthor(id: string) {
    return async (dispatch: any) => {
        try {
            const authorData: AxiosResponse = await AuthorService.getAlbumsForAuthor(id);
            dispatch(setCurrentAuthor(authorData.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}

export function fetchAuthors() {
    return async (dispatch: any) => {
        try {
            const authors: AxiosResponse = await AuthorService.getAuthors();
            dispatch(pushAuthors(authors.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}

export function fetchAlbumsForAuthor(authorId: string) {
    return async (dispatch: any) => {
        try {
            const response = await AuthorService.getAlbumsForAuthor(authorId);
            dispatch(pushAlbums(response.data.albums));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}
