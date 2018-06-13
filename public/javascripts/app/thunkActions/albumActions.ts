import {AxiosResponse} from "axios";
import toast from "../common/utils/toast";
import AlbumService from "../services/AlbumService";
import {setCurrentAlbum} from "../actions/albumActions";


export function fetchAlbum(id: string) {
    return async (dispatch: any) => {
        try {
            const albumData: AxiosResponse = await AlbumService.getMusicForAlbum(id);
            dispatch(setCurrentAlbum(albumData.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}
