import * as types from '../constant/action_constant';

export function showAnalyzer() {
    return {
        type: types.SHOW_ANALYZER,
    };
}

export function startFading() {
    return {
        type: types.START_FADING
    }
}

export function stopFading() {
    return {
        type: types.STOP_FADING
    }
}

export function startDownloading() {
    return {
        type: types.START_DOWNLOADING,
    };
}

export function finishDownloading() {
    return {
        type: types.FINISH_DOWNLOADING,
    };
}

export function startLoading() {
    return {
        type: types.START_LOADING,
    };
}
export function finishLoading() {
    return {
        type: types.FINISH_LOADING
    }
}

export function toggleModal() {

}
export function toggleTrackDropDown() {

}

export function slideInRight() {
    return {
        type: types.SLIDE_IN_RIGHT,
    };
}

export function resetSlideInRight() {
    return {
        type: types.RESET_SLIDE_IN_RIGHT,
    };
}