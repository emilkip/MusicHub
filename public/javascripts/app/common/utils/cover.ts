export function buildCoverUrl(cover: string, type: string) {
    return `/images/cover/${(!cover ? 'music-placeholder.png' : `${cover}/${type}`)}`;
}
