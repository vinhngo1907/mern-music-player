import * as types from '../constant/action_constant';

const initialState = {
    playedPercent: undefined,
    lyric1: '',
    lyric2: '',
    per1: 0,
    per2: 0,
};

export default function (state = initialState, aciton) {
    switch (aciton.type) {
        case types.UPDATE_LYRIC:
            return aciton.lyrics;

        case types.UPDATE_LYRIC_PERCENT:
            return Object.assign({}, state, aciton.payload);

        case types.UPDATE_PLAYED_PERCENT:
            return { ...state, playedPercent: aciton.playedPercent };

        default:
            return state;
    }
}