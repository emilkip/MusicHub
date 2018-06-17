import {MusicService} from "../services";
import toast from "../common/utils/toast";
import {putResults} from "../actions/searchAction";
import history from "../configs/history";

export function search(query: string) {
    return async (dispatch: any) => {
        try {
            const results = await MusicService.searchAll(query);
            dispatch(putResults(results.data));
            history.push('/search_result');
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}
