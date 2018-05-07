import { IReduxAction } from "../common/interfaces/CommonInterfaces";

interface IResult {
    musicList: any[]
    albums: any[]
    authors: any[]
}


export function getResults(searchResult: IResult): IReduxAction {
    return {
        type: 'GET_RESULTS',
        payload: {
            musicList: searchResult.musicList,
            albums: searchResult.albums,
            authors: searchResult.authors
        }
    }
}

export function clearResults(): IReduxAction {
    return {
        type: 'CLEAR_RESULTS',
        payload: {}
    }
}


export default {
    getResults,
    clearResults
}