import * as types from '../constant/action_constant';

export function updatePlayedPercent(percent){
    return {
        type: types.UPDATE_PLAYED_PERCENT,
        playedPercent: percent
    }
}

export function updateLyricPercent(...percentages){
    const payload = [];
}

export function updateLyric(lyric1, lyric2){
    return {
        type: types.UPDATE_LYRIC,
        lyrics: {lyric1, lyric2}
    }
}