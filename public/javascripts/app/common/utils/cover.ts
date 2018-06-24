export function buildCoverUrl(cover: string, type: string) {
    return `/cover/${(!cover ? 'music-placeholder.png' : `${cover}/${type}`)}`;
}
