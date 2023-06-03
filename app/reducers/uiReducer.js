import * as types from '../constant/action_constant';

const initialState = {
	showAnalyzer: false,
	dropDown: { activeId: '', show: false, where: '' },
	showQueue: false,
	slideInRight: false,
	showModal: false,
	isLoading: false,
	isFading: false,
	downloadProgress: {
		isDownloading: false,
		id: '',
		percent: 0,
	},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case types.TOGGLE_TRACK_DROPDOWN:
			return toggleTrackDropDown(state, action);

		case types.TOGGLE_QUEUE:
			return { ...state, showQueue: !state.showQueue };

		case types.TOGGLE_MODAL:
			return { ...state, showModal: !state.showModal };
		case types.START_FADING:
			return { ...state, isFading: true };

		case types.STOP_FADING:
			return { ...state, isFading: false };
		case types.START_DOWNLOADING:
			return {
				...state,
				downloadProgress: {
					isDownloading: true,
					id: action.id,
					percent: 0,
				},
			};
		default:
			return state;
	}
}

function toggleTrackDropDown(state, action) {
	const { activeId, where } = action.dropDown;
	return {
		...state,
		dropDown: {
			where: where !== state.dropDown.where ? where : '',
			activeId: activeId !== state.dropDown.activeId ? activeId : '',
			show: activeId !== state.dropDown.activeId,
		},
	};
}