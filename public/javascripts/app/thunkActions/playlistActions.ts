import {AxiosResponse} from "axios";
import toast from "../common/utils/toast";
import PlaylistService from "../services/PlaylistService";
import {pushPlaylists, setCurrentPlaylist} from "../actions/playlistActions";


export function fetchRecentPlaylists() {
    return async (dispatch: any) => {
        try {
            const playlists: AxiosResponse = await PlaylistService.getPlaylists();
            dispatch(pushPlaylists(playlists.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}

export function fetchPlaylistDetails(id: string) {
    return async (dispatch: any) => {
        try {
            const playlist: AxiosResponse = await PlaylistService.getPlaylist(id);
            dispatch(setCurrentPlaylist(playlist.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}
